import { NextRequest, NextResponse } from 'next/server';
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

export const runtime = 'nodejs';
export const preferredRegion = 'home';

type Meta = {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  hostname?: string;
  from: 'static' | 'dynamic';
};

const isValid = (m: Partial<Meta>) => !!m.title && !!m.image;

const scrapeStatic = async (target: string): Promise<Partial<Meta>> => {
  const html = await fetch(target, { cache: 'no-store' }).then(r => r.text());
  const rx = (key: string) =>
    html.match(
      new RegExp(
        `<meta[^>]*(?:property|name)=["']${key}["'][^>]*content=["']([^"']+)`,
        'i',
      ),
    )?.[1] || '';
  console.log(rx('og:title'));
  console.log(html.match(/<title[^>]*>(.*?)<\/title>/i)?.[1]);
  console.log(rx('og:description'));
  console.log(rx('og:image'));
  console.log(rx('og:site_name'));
  console.log(new URL(target).hostname);
  return {
    title: rx('og:title') || html.match(/<title[^>]*>(.*?)<\/title>/i)?.[1],
    description: rx('og:description'),
    image: rx('og:image'),
    siteName: rx('og:site_name'),
    hostname: new URL(target).hostname,
  };
};

const scrapeDynamic = async (target: string): Promise<Partial<Meta>> => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: (chromium as any).headless,
  });
  const page = await browser.newPage();
  await page.goto(target, { waitUntil: 'networkidle2', timeout: 13_000 });

  const data = await page.evaluate(() => {
    const pick = (sel: string) =>
      document.querySelector<HTMLMetaElement>(sel)?.content || '';
    return {
      title: pick('meta[property="og:title"], meta[name="og:title"]') || document.title,
      description: pick('meta[property="og:description"], meta[name="og:description"]'),
      image: pick('meta[property="og:image"], meta[name="og:image"]'),
      siteName: pick('meta[property="og:site_name"], meta[name="og:site_name"]'),
      hostname: location.hostname,
    };
  });

  await browser.close();
  return data;
};

export async function GET(req: NextRequest) {
  const target = req.nextUrl.searchParams.get('url');
  if (!target) {
    return NextResponse.json({ error: 'url query required' }, { status: 400 });
  }

  let meta = await scrapeStatic(target);
  let from: Meta['from'] = 'static';

  if (!isValid(meta)) {
    meta = await scrapeDynamic(target);
    from = 'dynamic';
  }

  const res = NextResponse.json({ ...meta, from } satisfies Meta);
  res.headers.set('Access-Control-Allow-Origin', '*'); // 동일 도메인이면 사실 불필요
  res.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate');
  return res;
}
