import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { serialize } from "v8";

export async function POST(req, res) {
  const { myToken } = req.cookies;

  if (!myToken) {
    return res.status(401).json({ msg: 'No hay token' });
  }

  try {
    verify(myToken, 'secret');
    const serializedToken = serialize('myToken', null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    })

    const cookieStore = await cookies();
    cookieStore.set('token', serializedToken, { secure: true })

    return NextResponse.json({ msg: 'Logout exitoso', status: 200 });
  } catch (error) {
    return res.status(401).json({ msg: 'Token inválido', error });
  }
}