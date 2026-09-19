import { NextResponse } from 'next/server';
// Importa tu cliente de base de datos, por ejemplo Prisma:
// import { db } from '@/lib/db'; 

// GET: Obtener todos los blogs
export async function GET() {
  try {
    // Ejemplo con Prisma: const posts = await db.post.findMany({ orderBy: { createdAt: 'desc' } });
    
    // Simulación de respuesta de BD:
    const posts: any[] = []; 

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener los blogs' }, { status: 500 });
  }
}

// POST: Crear un nuevo blog
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, desc, image, tag, postby, date, videoUrl } = body;

    // Validación básica
    if (!title || !desc || !image) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    // Ejemplo de inserción en BD con Prisma:
    /*
    const newPost = await db.post.create({
      data: { title, desc, image, tag, postby, date, videoUrl }
    });
    */

    return NextResponse.json({ message: 'Blog creado exitosamente' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear el blog' }, { status: 500 });
  }
}