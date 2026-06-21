import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { fetchNews } from '@/lib/news';
import { getCachedNews, setCachedNews } from '@/lib/news-cache';

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const forceRefresh = req.nextUrl.searchParams.get('refresh') === '1';

  if (!forceRefresh) {
    const cached = getCachedNews();
    if (cached) return NextResponse.json({ news: cached });
  }

  const news = await fetchNews();
  setCachedNews(news);
  return NextResponse.json({ news });
}
