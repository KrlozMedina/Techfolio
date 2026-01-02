import { CLIENTS_MOCK } from '@/mocks/mockClients';
import { NextRequest, NextResponse } from 'next/server';
// import { CLIENTS_MOCK } from '@/lib/mockClients';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get('lang') || 'es';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '5', 10);

  const start = (page - 1) * limit;
  const end = start + limit;

  const clients = CLIENTS_MOCK.slice(start, end).map(c => ({
    ...c,
    displayName: c.name[lang as 'es' | 'en'],
    displayDescription: c.description[lang as 'es' | 'en'],
  }));

  return NextResponse.json({
    data: clients,
    page,
    hasMore: end < CLIENTS_MOCK.length,
  });
}
