import { NextResponse } from "next/server";
import { getStorage } from "firebase-admin/storage";
import { initializeApp, getApps, cert } from "firebase-admin/app";

// Inicializar Firebase Admin de forma segura
if (!getApps().length) {
  // Asegúrate de tener tus variables de entorno configuradas en .env.local
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Reemplaza saltos de línea si usas la llave privada en variable de entorno
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

export async function POST(request: Request) {
  try {
    const { fileBase64, path } = await request.json();

    if (!fileBase64 || !path) {
      return NextResponse.json({ error: "Faltan datos (fileBase64 o path)" }, { status: 400 });
    }

    // Extraer los datos base64 reales removiendo el prefijo (ej: data:image/webp;base64,)
    const base64Data = fileBase64.split(";base64,").pop();
    const buffer = Buffer.from(base64Data, "base64");

    const bucket = getStorage().bucket();
    const file = bucket.file(path);

    await file.save(buffer, {
      metadata: {
        contentType: "image/webp",
      },
      public: true, // Hace que la imagen sea accesible públicamente mediante URL
    });

    // Construir la URL pública de descarga
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${path}`;

    return NextResponse.json({ url: publicUrl }, { status: 200 });
  } catch (error: any) {
    console.error("Error en API /api/upload:", error);
    return NextResponse.json({ error: error.message || "Error interno al subir archivo" }, { status: 500 });
  }
}