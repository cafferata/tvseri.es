import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';

import {
  fetchAccountDetails,
  fetchFavorites,
  fetchWatchlist,
} from '@/lib/tmdb';
import { decryptToken } from '@/lib/token';

export async function GET(
  request: NextRequest,
  { params }: { params: { list: 'watchlist' | 'favorites' } },
) {
  const encryptedSessionId = cookies().get('sessionId')?.value;

  if (!encryptedSessionId) {
    return Response.json(null);
  }

  const decryptedSessionId = decryptToken(encryptedSessionId);
  const { id: accountId } = await fetchAccountDetails(decryptedSessionId);

  const searchParams = request.nextUrl.searchParams;
  const pageFromSearchParams = searchParams.get('page');
  const page = pageFromSearchParams ? parseInt(pageFromSearchParams, 10) : 1;

  let response;
  if (params.list === 'favorites') {
    response = await fetchFavorites({
      accountId,
      sessionId: decryptedSessionId,
      page,
    });
  } else if (params.list === 'watchlist') {
    response = await fetchWatchlist({
      accountId,
      sessionId: decryptedSessionId,
      page,
    });
  }

  return Response.json(response?.items ?? []);
}
