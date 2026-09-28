// utils/imageUtils.ts

export const convertirImagenABase64WebP = (file: File, calidad = 0.75): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        const maxWidth = 800;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/webp", calidad);
        resolve(dataUrl);
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

export async function subirArchivoACloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  
  // REEMPLAZA CON TUS DATOS DE CLOUDINARY
  formData.append("upload_preset", "TU_UPLOAD_PRESET"); 
  const cloudName = "TU_CLOUD_NAME"; 

  const resourceType = file.type.startsWith("video") ? "video" : "image";

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error?.message || "Error al subir el archivo a Cloudinary");
  }

  return data.secure_url;
}