import { auth, db } from "./firebase";
import { signInAnonymously } from "firebase/auth";
import { ref, get, set, push, serverTimestamp, increment, update } from "firebase/database";

/**
 * Registra un usuario con un nombre único y sin espacios.
 */
export const registerLiveUser = async (rawName: string): Promise<string> => {
  // 1. Limpieza de nombre (todo pegado y minúsculas para la clave)
  const cleanName = rawName.trim().replace(/\s+/g, '').toLowerCase();
  const displayName = rawName.trim().replace(/\s+/g, ''); // Sin espacios pero respeta mayúsculas

  if (cleanName.length < 3) throw new Error("El nombre debe tener al menos 3 caracteres.");

  try {
    // 2. Autenticación anónima si no existe sesión
    if (!auth.currentUser) {
      await signInAnonymously(auth);
    }

    const uid = auth.currentUser!.uid;

    // 3. Verificación de nombre único
    const nameRef = ref(db, `occupied_names/${cleanName}`);
    const snapshot = await get(nameRef);

    if (snapshot.exists() && snapshot.val() !== uid) {
      throw new Error("Este nombre ya está en uso por otro usuario.");
    }

    // 4. Actualización Atómica: Guardamos nombre ocupado y perfil de usuario a la vez
    const updates: Record<string, any> = {};
    updates[`occupied_names/${cleanName}`] = uid;
    updates[`users/${uid}`] = { 
      username: displayName, 
      uid: uid, 
      lastLogin: serverTimestamp() 
    };

    await update(ref(db), updates);
    return displayName;

  } catch (error: any) {
    console.error("Error en LiveService:", error.message);
    throw error;
  }
};

/**
 * Envía una reacción y actualiza el contador global.
 */
export const sendReaction = async (emojiType: string) => {
  
  const user = auth.currentUser;
  if (!user) return;

  //Guardamos en live_events/reactions/ID_DEL_USUARIO
  //Eso grantiza que un usuario solo tenga una reacción activa
  await set(ref(db, `live_events/reactions/${user.uid}`), {
    type: type,
    username: localStorage.getItem('live_user') || 'Anónimo',
    ts: Date.now()
  });

  if (!auth.currentUser) return;

  const uid = auth.currentUser.uid;
  const reactionId = push(ref(db, 'live_events/reactions')).key;

  const updates: Record<string, any> = {};
  // Incrementa el contador total de ese emoji
  updates[`stats/reactions/${emojiType}`] = increment(1);
  // Crea el evento para la animación en tiempo real
  updates[`live_events/reactions/${reactionId}`] = {
    type: emojiType,
    ts: serverTimestamp(),
    userId: uid
  };

  return update(ref(db), updates);
};