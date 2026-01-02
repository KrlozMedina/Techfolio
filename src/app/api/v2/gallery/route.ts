import { NextResponse } from 'next/server';

const PAGE_SIZE = 9;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page') ?? 1);
  const category = searchParams.get('category');

  const allImages = Array.from({ length: 60 }).map((_, i) => ({
    id: i + 1,
    src: `https://picsum.photos/seed/${i + 1}/600/400`,
    alt: `Gallery image ${i + 1}`,
    category: ['project', 'event', 'achievement'][i % 3],
  }));

  const filtered = category
    ? allImages.filter(img => img.category === category)
    : allImages;

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  return NextResponse.json({
    data: filtered.slice(start, end),
    hasMore: end < filtered.length,
  });
}
