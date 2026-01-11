import { cookies } from 'next/headers';
import { verifyToken, SessionPayload } from './token';

// ⚠️ Ejecutar en Node para que jwt funcione
export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get('authToken')?.value;

  if (!token) return null;

  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}
