import { NextResponse } from "next/server";
import articles from '@/mocks/articles.json';

type Lang = 'es' | 'en';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const lang: Lang = url.searchParams.get('lang') === 'en' ? 'en' : 'es';

    const mappedArticles = articles.map(article => ({
      id: article.id,
      title: article.title[lang],
      description: article.description[lang],
      image: article.image,
      tags: article.tags,
      link: article.link,
      date: article.date
    }));

    return NextResponse.json({ data: mappedArticles }, { status: 200 });
  } catch (error) {
    console.error('GET /api/v2/blog error:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}
