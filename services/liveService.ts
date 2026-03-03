import { auth, db } from "./firebase";
import { signInAnonymously } from "firebase/auth";
import { ref, get, set, push, serverTimestamp, increment, update } from "firebase/database";

/**
 * Registra un usuario con un nombre único y sin espacios.
 */
export const registerLiveUser = async (rawName: string): Promise<string> => {
  // Limpieza de nombre: minúsculas para la validación y sin espacios para mostrar
  const cleanName = rawName.trim().replace(/\s+/g, '').toLowerCase();
  const displayName = rawName.trim().replace(/\s+/g, ''); 

  if (cleanName.length < 3) throw new Error("El nombre debe tener al menos 3 caracteres.");

  try {
    // Autenticación anónima
    if (!auth.currentUser) {
      await signInAnonymously(auth);
    }

    const uid = auth.currentUser!.uid;

    // Verificación de nombre único en la base de datos
    const nameRef = ref(db, `occupied_names/${cleanName}`);
    const snapshot = await get(nameRef);

    if (snapshot.exists() && snapshot.val() !== uid) {
      throw new Error("Este nombre ya está en uso por otro usuario.");
    }

    // Actualización atómica de perfil y nombre ocupado
    const updates: Record<string, any> = {};
    updates[`occupied_names/${cleanName}`] = uid;
    updates[`users/${uid}`] = { 
      username: displayName, 
      uid: uid, 
      lastLogin: serverTimestamp() 
    };

    await update(ref(db), updates);
    
    // Guardamos en localStorage para usarlo en chat y reacciones
    localStorage.setItem('live_user', displayName);
    
    return displayName;

  } catch (error: any) {
    console.error("Error en LiveService (Register):", error.message);
    throw error;
  }
};

/**
 * Envía una reacción vinculada al ID de la transmisión actual.
 * Al cambiar el liveId, las reacciones se "reinician" visualmente.
 */
export const sendReaction = async (emojiType: string, liveId: string) => {
  const user = auth.currentUser;
  // Si no hay liveId o usuario, no hacemos nada para evitar llenar basura en la DB
  if (!user || !liveId || liveId.trim() === "") return;

  try {
    const uid = user.uid;
    const username = localStorage.getItem('live_user') || 'Anónimo';
    
    // Generamos un ID único para este evento de reacción dentro del nodo del video actual
    const reactionEventRef = push(ref(db, `live_events/${liveId}/reactions`));
    const reactionId = reactionEventRef.key;

    const updates: Record<string, any> = {};

    // 1. Incrementa el contador de estadísticas específico de ESTE video
    updates[`stats/${liveId}/reactions/${emojiType}`] = increment(1);

    // 2. Crea el evento de animación específico para ESTE video
    updates[`live_events/${liveId}/reactions/${reactionId}`] = {
      type: emojiType,
      username: username,
      ts: serverTimestamp(),
      userId: uid
    };

    return await update(ref(db), updates);
  } catch (error: any) {
    console.error("Error al enviar reacción:", error.message);
  }
};

/**
 * Envía un mensaje al chat vinculado al ID de la transmisión actual.
 * Esto garantiza que cada video tenga su propio historial de chat.
 */
export const sendChatMessage = async (message: string, liveId: string) => {
  const user = auth.currentUser;
  if (!user || !liveId || liveId.trim() === "") return;

  try {
    const username = localStorage.getItem('live_user') || 'Anónimo';
    
    // El chat se guarda bajo la ruta del liveId actual
    const chatRef = push(ref(db, `live_events/${liveId}/chat`));
    
    await set(chatRef, {
      text: message,
      username: username,
      userId: user.uid,
      ts: serverTimestamp()
    });
  } catch (error: any) {
    console.error("Error al enviar mensaje de chat:", error.message);
  }
};