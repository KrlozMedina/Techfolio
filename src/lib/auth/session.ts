import { cookies } from 'next/headers';
import { verifyToken, SessionPayload } from './token';

// ⚠️ Ejecutar en Node para que jwt funcione
export const runtime = 'nodejs';

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get('authToken')?.value;

  if (!token) return null;

  try {
    return verifyToken(token);
  } catch (e) {
    console.log('Session error:', e);
    return null;
  }
}


// import { cookies } from 'next/headers';
// import { verifyToken, SessionPayload } from './token';

// export async function getSession(): Promise<SessionPayload | null> {
//   const store = await cookies();
//   const token = store.get('authToken')?.value;

//   if (!token) return null;

//   try {
//     // console.log('verifyToken', verifyToken(token))
//     return verifyToken(token);
//   } catch (e) {
//     // console.log('error', e)
//     return null;
//   }
// }
