import { cookies } from 'next/headers';
import { AUTH_CONFIG } from './config';

const COOKIE_NAME = 'authToken';

export async function setAuthToken(token: string) {
  const store = await cookies();
  // store.set(COOKIE_NAME, token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === 'production',
  //   sameSite: 'strict',
  //   path: '/',
  // });
  store.set(COOKIE_NAME, token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/',
  maxAge: AUTH_CONFIG.TOKEN_EXPIRATION,
});

}

export async function deleteAuthToken() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
