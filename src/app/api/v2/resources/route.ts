import { NextResponse } from 'next/server';

const PAGE_SIZE = 6;

const resources = Array.from({ length: 60 }).map((_, i) => ({
  id: i + 1,
  title: `Resource ${i + 1}`,
  description: 'Useful resource for web developers.',
  category: ['frontend', 'backend', 'devops'][i % 3],
  favorite: i % 5 === 0,
  link: 'https://developer.mozilla.org/',
  image: `https://picsum.photos/seed/resource-${i}/400/300`,
}));

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page') || 1);
  const category = searchParams.get('category');

  let data = resources;
  if (category) data = data.filter(r => r.category === category);

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  return NextResponse.json({
    data: data.slice(start, end),
    hasMore: end < data.length,
  });
}
