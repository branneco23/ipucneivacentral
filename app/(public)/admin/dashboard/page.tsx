'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface Anuncio { id: string; titulo: string; urlImagen: string; fecha: string; }
interface Devocional { id: string; titulo: string; urlEnlace: string; fecha: string; }

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  // Estados para En Vivo
  const [liveId, setLiveId] = useState('');
  const [liveLoading, setLiveLoading] = useState(false);

  // Estados para Anuncios
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [nuevoAnuncioTitulo, setNuevoAnuncioTitulo] = useState('');
  const [nuevoAnuncioImagen, setNuevoAnuncioImagen] = useState('');

  // Estados para Devocionales
  const [devocionales, setDevocionales] = useState<Devocional[]>([]);
  const [nuevoDevocionalTitulo, setNuevoDevocionalTitulo] = useState('');
  const [nuevoDevocionalEnlace, setNuevoDevocionalEnlace] = useState('');

  // Verificar autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/admin');
      } else {
        setLoading(false);
        cargarDatosIniciales();
      }
    });
    return () => unsubscribe();
  }, [router]);

  const cargarDatosIniciales = async () => {
    // 1. Obtener ID de En Vivo
    const liveDoc = await getDoc(doc(db, 'configuracion', 'transmision'));
    if (liveDoc.exists()) setLiveId(liveDoc.data().youtubeId || '');

    // 2. Obtener Anuncios
    const anunciosSnap = await getDocs(collection(db, 'anuncios'));
    const listaAnuncios = anunciosSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Anuncio));
    setAnuncios(listaAnuncios);

    // 3. Obtener Devocionales
    const devocionalesSnap = await getDocs(collection(db, 'devocionales'));
    const listaDevocionales = devocionalesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Devocional));
    setDevocionales(listaDevocionales);
  };

  // --- CRUD TRANSMISIÓN EN VIVO ---
  const guardarTransmision = async (e: React.FormEvent) => {
    e.preventDefault();
    setLiveLoading(true);
    try {
      await setDoc(doc(db, 'configuracion', 'transmision'), { youtubeId: liveId });
      alert('Transmisión actualizada correctamente.');
    } catch (err) {
      alert('Error al actualizar.');
    }
    setLiveLoading(false);
  };

  // --- CRUD ANUNCIOS ---
  const crearAnuncio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoAnuncioTitulo || !nuevoAnuncioImagen) return;
    const nuevo = { titulo: nuevoAnuncioTitulo, urlImagen: nuevoAnuncioImagen, fecha: new Date().toLocaleDateString() };
    const docRef = await addDoc(collection(db, 'anuncios'), nuevo);
    setAnuncios([...anuncios, { id: docRef.id, ...nuevo }]);
    setNuevoAnuncioTitulo(''); setNuevoAnuncioImagen('');
  };

  const eliminarAnuncio = async (id: string) => {
    if (!confirm('¿Deseas eliminar este anuncio?')) return;
    await deleteDoc(doc(db, 'anuncios', id));
    setAnuncios(anuncios.filter(item => item.id !== id));
  };

  // --- CRUD DEVOCIONALES ---
  const crearDevocional = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoDevocionalTitulo || !nuevoDevocionalEnlace) return;
    const nuevo = { titulo: nuevoDevocionalTitulo, urlEnlace: nuevoDevocionalEnlace, fecha: new Date().toLocaleDateString() };
    const docRef = await addDoc(collection(db, 'devocionales'), nuevo);
    setDevocionales([...devocionales, { id: docRef.id, ...nuevo }]);
    setNuevoDevocionalTitulo(''); setNuevoDevocionalEnlace('');
  };

  const eliminarDevocional = async (id: string) => {
    if (!confirm('¿Deseas eliminar este enlace de devocional?')) return;
    await deleteDoc(doc(db, 'devocionales', id));
    setDevocionales(devocionales.filter(item => item.id !== id));
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 text-white">
      <div className="flex justify-between items-center border-b border-white/5 pb-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold">Panel Central de Gestión</h1>
          <p className="text-sm text-white/40 mt-1">Administración de contenidos en tiempo real</p>
        </div>
        <button onClick={handleLogout} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2 rounded-xl text-sm transition-colors font-medium">
          Cerrar Sesión
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA 1: TRANSMISIÓN EN VIVO */}
        <div className="bg-[#090d16] border border-white/5 p-6 rounded-2xl h-fit">
          <h2 className="text-lg font-bold border-b border-white/5 pb-3 mb-4 text-red-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Transmisión en Vivo
          </h2>
          <form onSubmit={guardarTransmision} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-2">ID de Video de YouTube</label>
              <input
                type="text"
                value={liveId}
                onChange={(e) => setLiveId(e.target.value)}
                placeholder="Ejemplo: dQw4w9WgXcQ"
                className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 text-white"
                required
              />
            </div>
            <button type="submit" disabled={liveLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium text-sm transition-colors">
              {liveLoading ? 'Guardando...' : 'Actualizar Transmisión'}
            </button>
          </form>
        </div>

        {/* COLUMNA 2: GESTIÓN DE ANUNCIOS */}
        <div className="bg-[#090d16] border border-white/5 p-6 rounded-2xl">
          <h2 className="text-lg font-bold border-b border-white/5 pb-3 mb-4 text-blue-400">Anuncios de la Semana</h2>
          <form onSubmit={crearAnuncio} className="space-y-3 mb-6">
            <input
              type="text"
              value={nuevoAnuncioTitulo}
              onChange={(e) => setNuevoAnuncioTitulo(e.target.value)}
              placeholder="Título del anuncio"
              className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 text-white"
              required
            />
            <input
              type="text"
              value={nuevoAnuncioImagen}
              onChange={(e) => setNuevoAnuncioImagen(e.target.value)}
              placeholder="URL de la imagen del anuncio"
              className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 text-white"
              required
            />
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-medium text-sm transition-colors">
              Agregar Anuncio
            </button>
          </form>

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            {anuncios.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-[#020617] p-3 rounded-xl border border-white/5">
                <div className="truncate pr-2">
                  <p className="text-sm font-medium truncate">{item.titulo}</p>
                  <p className="text-[10px] text-white/40">{item.fecha}</p>
                </div>
                <button onClick={() => eliminarAnuncio(item.id)} className="text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 px-2.5 py-1 rounded-lg border border-red-500/10 transition-colors">
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* COLUMNA 3: GESTIÓN DE DEVOCIONALES */}
        <div className="bg-[#090d16] border border-white/5 p-6 rounded-2xl">
          <h2 className="text-lg font-bold border-b border-white/5 pb-3 mb-4 text-purple-400">Enlaces de Devocionales</h2>
          <form onSubmit={crearDevocional} className="space-y-3 mb-6">
            <input
              type="text"
              value={nuevoDevocionalTitulo}
              onChange={(e) => setNuevoDevocionalTitulo(e.target.value)}
              placeholder="Título del devocional"
              className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 text-white"
              required
            />
            <input
              type="text"
              value={nuevoDevocionalEnlace}
              onChange={(e) => setNuevoDevocionalEnlace(e.target.value)}
              placeholder="Enlace (URL) del devocional"
              className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 text-white"
              required
            />
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-medium text-sm transition-colors">
              Agregar Devocional
            </button>
          </form>

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            {devocionales.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-[#020617] p-3 rounded-xl border border-white/5">
                <div className="truncate pr-2">
                  <p className="text-sm font-medium truncate">{item.titulo}</p>
                  <p className="text-[10px] text-white/40">{item.fecha}</p>
                </div>
                <button onClick={() => eliminarDevocional(item.id)} className="text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 px-2.5 py-1 rounded-lg border border-red-500/10 transition-colors">
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}