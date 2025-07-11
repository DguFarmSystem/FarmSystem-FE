import { NextRequest, NextResponse } from 'next/server';
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

export const runtime = 'nodejs';
export const preferredRegion = 'home';

const extractHead = (html: string) =>
  html.match(/<head[^>]*>[\s\S]*?<\/head>/i)?.[0] ?? '';

export async function GET(req: NextRequest) {
  const target = req.nextUrl.searchParams.get('url');
  if (!target)
    return NextResponse.json({ error: 'url query required' }, { status: 400 });

  /* 1단계: 정적 HTML 요청 */
  let headHtml = extractHead(
    await fetch(target, { cache: 'no-store' }).then(r => r.text())
  );

  /* 2단계: 동적 렌더링 필요? */
  if (!headHtml) {
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: (chromium as any).headless,
    });
    const page = await browser.newPage();
    await page.goto(target, { waitUntil: 'networkidle2', timeout: 13_000 });
    headHtml = await page.evaluate(() => document.head.outerHTML);
    await browser.close();
  }

  /* 결과 반환 */
  return new NextResponse(headHtml, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 's-maxage=300, stale-while-revalidate',
    },
  });
}
