import { useEffect, useRef, useState } from 'react';
import { handleApiError } from '@/utils/handleApiError';

export interface MetaResponse {
  title: string;
  description: string;
  image: string;
  siteName: string;
  hostname: string;
  from: 'static' | 'dynamic';
}

const isValid = (m: MetaResponse | null) => m && m.title && m.image;

const previewApi = '/api/hooks?url='; // 서버 라우트와 일치시켜 주세요

export const useLinkPreview = (
  url: string,
  fetcher?: (u: string) => Promise<MetaResponse | null>,
) => {
  const [data, setData] = useState<MetaResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    setLoading(true);

    const reqUrl = previewApi + encodeURIComponent(url);

    const fn = fetcher
      ? fetcher
      : (u: string) =>
          fetch(u)
            .then(r => (r.ok ? r.json() : Promise.reject(r)))
            .catch(err => {
              throw err;
            });

    fn(reqUrl)
      .then(res => {
        if (!mounted.current) return;
        setData(isValid(res) ? res : null);
        setLoading(false);
      })
      .catch(err => {
        if (!mounted.current) return;
        setError(handleApiError(err));
        setData(null);
        setLoading(false);
      });

    return () => {
      mounted.current = false;
    };
  }, [url, fetcher]);

  return { metadata: data, loading, error };
};
