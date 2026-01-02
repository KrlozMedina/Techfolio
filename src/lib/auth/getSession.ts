import { cookies } from 'next/headers';
import { verifyToken } from './verifyToken';

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;
  if (!token) return null;

  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}


// import { cookies } from 'next/headers';
// import { verifyToken, SessionPayload } from './verifyToken';

// export function getSession(): SessionPayload | null {
//   const token = cookies().get('authToken')?.value;
//   if (!token) return null;

//   try {
//     return verifyToken(token);
//   } catch {
//     return null;
//   }
// }
