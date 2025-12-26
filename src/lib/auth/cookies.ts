import { cookies } from 'next/headers';

const COOKIE_NAME = 'authToken';

export async function setAuthToken(token: string) {
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });
}

export async function deleteAuthToken() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
