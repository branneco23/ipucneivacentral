import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const envUser = process.env.ADMIN_USER;
    const envPass = process.env.ADMIN_PASSWORD;

    if (username === envUser && password === envPass) {
      // Retornamos éxito y el token secreto para autorizar peticiones posteriores
      return NextResponse.json({ 
        success: true, 
        token: process.env.ADMIN_SECRET_KEY 
      });
    }

    return NextResponse.json(
      { error: "Usuario o contraseña incorrectos." }, 
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error en el servidor al autenticar." }, 
      { status: 500 }
    );
  }
}