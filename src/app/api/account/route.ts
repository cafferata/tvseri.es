import { cookies } from 'next/headers';

import { fetchAccountDetails } from '@/lib/tmdb';
import { decryptToken } from '@/lib/token';

export async function GET() {
  const encryptedSessionId = cookies().get('sessionId')?.value;

  if (!encryptedSessionId) {
    return Response.json(null);
  }

  const decryptedSessionId = decryptToken(encryptedSessionId);
  const account = await fetchAccountDetails(decryptedSessionId);

  return Response.json(account);
}
