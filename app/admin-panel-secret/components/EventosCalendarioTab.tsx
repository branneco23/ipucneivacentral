"use client";

import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";

interface EventosCalendarioTabProps {
  eventosList?: any[];
  setStatusMsg: (msg: string | null) => void;
}

export default function EventosCalendarioTab({ eventosList = [], setStatusMsg }: EventosCalendarioTabProps) {
  const [editingEventoId, setEditingEventoId] = useState<string | null>(null);
  const [tituloEvento, setTituloEvento] = useState("");
  const [fechaEvento, setFechaEvento] = useState("");
  const [horaEvento, setHoraEvento] = useState("");
  const [lugarEvento, setLugarEvento] = useState("");
  const [descripcionEvento, setDescripcionEvento] = useState("");
  const [savingEvento, setSavingEvento] = useState(false);

  const handleSaveEvento = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingEvento(true);
    setStatusMsg("Guardando evento...");

    try {
      if (editingEventoId) {
        await updateDoc(doc(db, "eventosCalendario", editingEventoId), {
          titulo: tituloEvento,
          fecha: fechaEvento,
          hora: horaEvento,
          lugar: lugarEvento,
          descripcion: descripcionEvento,
          updatedAt: serverTimestamp(),
        });
        setStatusMsg("Evento actualizado con éxito.");
      } else {
        await addDoc(collection(db, "eventosCalendario"), {
          titulo: tituloEvento,
          fecha: fechaEvento,
          hora: horaEvento,
          lugar: lugarEvento,
          descripcion: descripcionEvento,
          createdAt: serverTimestamp(),
        });
        setStatusMsg("Evento creado con éxito.");
      }

      setTituloEvento("");
      setFechaEvento("");
      setHoraEvento("");
      setLugarEvento("");
      setDescripcionEvento("");
      setEditingEventoId(null);
    } catch (err) {
      console.error(err);
      setStatusMsg("Error al guardar el evento.");
    } finally {
      setSavingEvento(false);
    }
  };

  const handleStartEditEvento = (evento: any) => {
    setEditingEventoId(evento.id);
    setTituloEvento(evento.titulo || "");
    setFechaEvento(evento.fecha || "");
    setHoraEvento(evento.hora || "");
    setLugarEvento(evento.lugar || "");
    setDescripcionEvento(evento.descripcion || "");
    setStatusMsg(`Editando evento: ${evento.titulo}`);
  };

  const handleDeleteEvento = async (id: string) => {
    if (confirm("¿Deseas eliminar este evento del calendario?")) {
      await deleteDoc(doc(db, "eventosCalendario", id));
      setStatusMsg("Evento eliminado.");
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-6 text-slate-100">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{editingEventoId ? "Editar Evento del Calendario" : "Gestión de Eventos y Calendario"}</h2>
        {editingEventoId && (
          <button
            type="button"
            onClick={() => {
              setEditingEventoId(null);
              setTituloEvento("");
              setFechaEvento("");
              setHoraEvento("");
              setLugarEvento("");
              setDescripcionEvento("");
            }}
            className="text-xs text-yellow-400 bg-yellow-500/10 px-3 py-1.5 rounded-xl border border-yellow-500/20 cursor-pointer"
          >
            Cancelar Edición
          </button>
        )}
      </div>

      <form onSubmit={handleSaveEvento} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs mb-1">Título del Evento</label>
            <input type="text" required value={tituloEvento} onChange={(e) => setTituloEvento(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" placeholder="Ej: Congreso de Jóvenes" />
          </div>
          <div>
            <label className="block text-xs mb-1">Lugar / Ubicación</label>
            <input type="text" value={lugarEvento} onChange={(e) => setLugarEvento(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" placeholder="Ej: Auditorio Principal" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs mb-1">Fecha</label>
            <input type="text" required value={fechaEvento} onChange={(e) => setFechaEvento(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" placeholder="Ej: 15 de Noviembre, 2026" />
          </div>
          <div>
            <label className="block text-xs mb-1">Hora</label>
            <input type="text" required value={horaEvento} onChange={(e) => setHoraEvento(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" placeholder="Ej: 6:30 PM" />
          </div>
        </div>

        <div>
          <label className="block text-xs mb-1">Descripción del Evento</label>
          <textarea rows={3} value={descripcionEvento} onChange={(e) => setDescripcionEvento(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white" placeholder="Detalles adicionales del evento..."></textarea>
        </div>

        <button type="submit" disabled={savingEvento} className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-3 rounded-xl text-sm transition cursor-pointer">
          {savingEvento ? "Guardando..." : (editingEventoId ? "Actualizar Evento" : "Agregar Evento al Calendario")}
        </button>
      </form>

      <div className="border-t border-slate-800 pt-6 space-y-4">
        <h3 className="font-bold text-sm">Eventos Registrados ({eventosList.length})</h3>
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {eventosList.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700">
              <div>
                <h4 className="font-bold text-sm text-white">{item.titulo}</h4>
                <p className="text-xs text-slate-400">📅 {item.fecha} - ⏰ {item.hora} {item.lugar ? `• 📍 ${item.lugar}` : ""}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleStartEditEvento(item)} className="bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-lg text-xs hover:bg-yellow-500/20 cursor-pointer">Editar</button>
                <button onClick={() => handleDeleteEvento(item.id)} className="bg-red-500/10 text-red-400 px-3 py-1 rounded-lg text-xs hover:bg-red-500/20 cursor-pointer">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}