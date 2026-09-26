import React, { useState } from "react";
import RichTextEditor from "./RichTextEditor"; // Ajusta la ruta según donde lo hayas guardado
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function FaqsTab({ 
  faqsList, 
  setFaqsList, 
  setStatusMsg 
}: { 
  faqsList: any[]; 
  setFaqsList: React.Dispatch<React.SetStateAction<any[]>>; 
  setStatusMsg: (msg: string | null) => void 
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState("");

  const handleSaveAnswer = async (id: string) => {
    try {
      const docRef = doc(db, "faqs_consultas", id);
      await updateDoc(docRef, {
        answer: answerText, // Guarda el texto con etiquetas HTML (<b>, <ul>, etc.)
        respondido: true,
      });
      
      // Actualiza el estado local para reflejar el cambio al instante
      setFaqsList(prevList =>
        prevList.map(faq => (faq.id === id ? { ...faq, answer: answerText, respondido: true } : faq))
      );

      setStatusMsg("¡Respuesta guardada y publicada con éxito!");
      setEditingId(null);
    } catch (error) {
      console.error("Error al actualizar la respuesta:", error);
      setStatusMsg("Hubo un error al guardar la respuesta.");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta pregunta de la base de datos?")) {
      try {
        const docRef = doc(db, "faqs_consultas", id);
        await deleteDoc(docRef);

        // Elimina el elemento de la lista local en tiempo real
        setFaqsList(prevList => prevList.filter(faq => faq.id !== id));
        setStatusMsg("Pregunta eliminada correctamente.");
      } catch (error) {
        console.error("Error al eliminar la pregunta:", error);
        setStatusMsg("Hubo un error al intentar eliminar la pregunta.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Centro de Ayuda - Preguntas Recibidas</h2>
      </div>
      
      {faqsList.length === 0 ? (
        <p className="text-slate-400 italic">No hay preguntas registradas por el momento.</p>
      ) : (
        faqsList.map((faq) => (
          <div key={faq.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="text-xs text-indigo-400 font-bold uppercase">Pregunta del usuario:</span>
                <p className="text-lg text-white font-medium mt-1">{faq.question}</p>
              </div>

              {/* Botón de Borrar */}
              <button
                type="button"
                onClick={() => handleDelete(faq.id)}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer shrink-0"
                title="Borrar pregunta"
              >
                🗑️ Borrar
              </button>
            </div>

            {editingId === faq.id ? (
              <div className="space-y-4 pt-2">
                <label className="text-xs text-slate-400 font-bold uppercase">Escribir Respuesta con Formato:</label>
                {/* Editor de texto enriquecido */}
                <RichTextEditor content={answerText} onChange={setAnswerText} />
                
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-sm cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSaveAnswer(faq.id)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold cursor-pointer"
                  >
                    Guardar y Publicar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                <div className="text-slate-400 text-sm italic">
                  {faq.respondido ? "✔ Respondido y público" : "⏳ Pendiente de respuesta"}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(faq.id);
                    setAnswerText(faq.answer || "");
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-400 rounded-xl text-sm font-medium cursor-pointer"
                >
                  {faq.respondido ? "Editar Respuesta" : "Responder Pregunta"}
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}