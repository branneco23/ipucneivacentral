import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Ejemplo con Prisma: 
    // const post = await db.post.findUnique({ where: { id } });
    const post = null; // Reemplaza con tu consulta real

    if (!post) {
      return NextResponse.json({ error: 'Post no encontrado' }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener el blog' }, { status: 500 });
  }
}