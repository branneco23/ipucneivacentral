"use client";

import React, { useState } from 'react';

// Si deseas que reciba props personalizadas desde afuera, define esta interfaz:
interface SopaLetrasProps {
  titulo?: string;
  descripcion?: string;
  palabras?: string[];
}

// Estructura de niveles gigantes (12x12)
const niveles = [
  {
    nivel: 1,
    titulo: "Nivel 1: Los Fundamentos de la Fe",
    descripcion: "Encuentra los conceptos esenciales para iniciar el camino.",
    palabras: ["CORAZÓN", "DIOS", "JESÚS", "BIBLIA", "AMOR", "FE", "LUZ", "PAZ"],
    grid: [
      ['C', 'O', 'R', 'A', 'Z', 'Ó', 'N', 'X', 'Y', 'Z', 'A', 'B'],
      ['B', 'I', 'B', 'L', 'I', 'A', 'F', 'E', 'A', 'B', 'C', 'D'],
      ['J', 'E', 'S', 'Ú', 'S', 'M', 'O', 'R', 'C', 'D', 'E', 'F'],
      ['A', 'M', 'O', 'R', 'P', 'Q', 'R', 'S', 'T', 'I', 'G', 'H'],
      ['D', 'E', 'S', 'T', 'I', 'N', 'O', 'U', 'V', 'O', 'I', 'J'],
      ['O', 'B', 'E', 'D', 'E', 'C', 'E', 'W', 'X', 'S', 'K', 'L'],
      ['L', 'U', 'Z', 'P', 'A', 'Z', 'Y', 'Z', 'A', 'B', 'M', 'N'],
      ['G', 'R', 'A', 'C', 'I', 'A', 'C', 'D', 'E', 'F', 'O', 'P'],
      ['V', 'I', 'D', 'A', 'H', 'I', 'J', 'O', 'G', 'H', 'Q', 'R'],
      ['E', 'S', 'P', 'E', 'R', 'A', 'N', 'Z', 'A', 'I', 'S', 'T'],
      ['M', 'I', 'L', 'A', 'G', 'R', 'O', 'J', 'K', 'L', 'U', 'V'],
      ['P', 'A', 'C', 'T', 'O', 'M', 'N', 'O', 'P', 'Q', 'W', 'X']
    ]
  },
  {
    nivel: 2,
    titulo: "Nivel 2: El Camino de la Aventura",
    descripcion: "¡Subiste de categoría! Busca los términos de crecimiento y guía.",
    palabras: ["VERDAD", "CAMINO", "VIDA", "GRACIA", "MILAGRO", "PACTO", "HIJO", "AUDACIA"],
    grid: [
      ['V', 'E', 'R', 'D', 'A', 'D', 'X', 'Y', 'Z', 'A', 'B', 'C'],
      ['C', 'A', 'M', 'I', 'N', 'O', 'F', 'E', 'A', 'B', 'C', 'D'],
      ['V', 'I', 'D', 'A', 'S', 'M', 'O', 'R', 'C', 'D', 'E', 'F'],
      ['G', 'R', 'A', 'C', 'I', 'A', 'R', 'S', 'T', 'I', 'G', 'H'],
      ['M', 'I', 'L', 'A', 'G', 'R', 'O', 'U', 'V', 'O', 'I', 'J'],
      ['P', 'A', 'C', 'T', 'O', 'C', 'E', 'W', 'X', 'S', 'K', 'L'],
      ['H', 'I', 'J', 'O', 'A', 'Z', 'Y', 'Z', 'A', 'B', 'M', 'N'],
      ['A', 'U', 'D', 'A', 'C', 'I', 'A', 'D', 'E', 'F', 'O', 'P'],
      ['B', 'E', 'N', 'D', 'I', 'C', 'I', 'O', 'N', 'H', 'Q', 'R'],
      ['F', 'I', 'D', 'E', 'L', 'I', 'D', 'A', 'D', 'I', 'S', 'T'],
      ['S', 'A', 'N', 'T', 'O', 'R', 'O', 'J', 'K', 'L', 'U', 'V'],
      ['P', 'R', 'O', 'M', 'E', 'S', 'A', 'N', 'O', 'P', 'W', 'X']
    ]
  },
  {
    nivel: 3,
    titulo: "Nivel 3: Maestro de la Gran Aventura",
    descripcion: "¡El reto definitivo! Despliega todo tu potencial bíblico.",
    palabras: ["BENDICION", "FIDELIDAD", "PROMESA", "SANTIDAD", "VICTORIA", "PROPOSITO", "ALABANZA", "TESTIGO"],
    grid: [
      ['B', 'E', 'N', 'D', 'I', 'C', 'I', 'O', 'N', 'X', 'Y', 'Z'],
      ['F', 'I', 'D', 'E', 'L', 'I', 'D', 'A', 'D', 'B', 'C', 'D'],
      ['P', 'R', 'O', 'M', 'E', 'S', 'A', 'R', 'C', 'D', 'E', 'F'],
      ['S', 'A', 'N', 'T', 'I', 'D', 'A', 'D', 'T', 'I', 'G', 'H'],
      ['V', 'I', 'C', 'T', 'O', 'R', 'I', 'A', 'V', 'O', 'I', 'J'],
      ['P', 'R', 'O', 'P', 'O', 'S', 'I', 'T', 'O', 'S', 'K', 'L'],
      ['A', 'L', 'A', 'B', 'A', 'N', 'Z', 'A', 'A', 'B', 'M', 'N'],
      ['T', 'E', 'S', 'T', 'I', 'G', 'O', 'D', 'E', 'F', 'O', 'P'],
      ['E', 'J', 'É', 'R', 'C', 'I', 'T', 'O', 'N', 'H', 'Q', 'R'],
      ['D', 'E', 'F', 'E', 'N', 'S', 'O', 'R', 'I', 'S', 'T', 'U'],
      ['U', 'N', 'I', 'D', 'A', 'D', 'P', 'J', 'K', 'L', 'U', 'V'],
      ['E', 'S', 'C', 'U', 'D', 'O', 'F', 'E', 'O', 'P', 'W', 'X']
    ]
  }
];

const coloresCelebracion = [
  "bg-emerald-500 text-white border-emerald-500 shadow-emerald-500/30",
  "bg-fuchsia-500 text-white border-fuchsia-500 shadow-fuchsia-500/30",
  "bg-amber-500 text-white border-amber-500 shadow-amber-500/30",
  "bg-violet-500 text-white border-violet-500 shadow-violet-500/30",
  "bg-cyan-500 text-white border-cyan-500 shadow-cyan-500/30",
  "bg-rose-500 text-white border-rose-500 shadow-rose-500/30",
  "bg-indigo-500 text-white border-indigo-500 shadow-indigo-500/30",
  "bg-teal-500 text-white border-teal-500 shadow-teal-500/30",
];

export default function WordSearchGame({ titulo, descripcion }: SopaLetrasProps) {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<string[]>([]);
  const [lastFoundEffect, setLastFoundEffect] = useState<string | null>(null);

  const nivelActual = niveles[currentLevelIndex];

  // Si mandan un título personalizado lo usamos, si no, usamos el del nivel
  const tituloMostrado = titulo || nivelActual.titulo;
  const descripcionMostrada = descripcion || nivelActual.descripcion;

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const cellId = `${rowIndex}-${colIndex}`;
    setSelectedCells(prev => 
      prev.includes(cellId) ? prev.filter(id => id !== cellId) : [...prev, cellId]
    );
  };

  const toggleWordFound = (word: string) => {
    let newFoundWords: string[];
    if (foundWords.includes(word)) {
      newFoundWords = foundWords.filter(w => w !== word);
    } else {
      newFoundWords = [...foundWords, word];
      setLastFoundEffect(word);
      setTimeout(() => setLastFoundEffect(null), 1000);
    }
    setFoundWords(newFoundWords);

    if (newFoundWords.length === nivelActual.palabras.length) {
      setTimeout(() => {
        if (currentLevelIndex < niveles.length - 1) {
          setCurrentLevelIndex(prev => prev + 1);
          setFoundWords([]);
          setSelectedCells([]);
        }
      }, 1000);
    }
  };

  const reiniciarNivel = () => {
    setFoundWords([]);
    setSelectedCells([]);
  };

  const esCompleto = foundWords.length === nivelActual.palabras.length;

  return (
    <div className="bg-slate-50 border border-slate-200 p-6 md:p-12 rounded-[2.5rem] shadow-sm my-10 max-w-5xl mx-auto transition-all duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-200">
        <div>
          <span className="bg-orange-100 text-orange-600 text-xs font-black uppercase px-4 py-1.5 rounded-full tracking-widest">
            Sopa de Letras Gigante • Modo Aventura
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase mt-2">
            {tituloMostrado}
          </h3>
          <p className="text-slate-600 text-sm mt-1">{descripcionMostrada}</p>
        </div>

        <div className="flex gap-3">
          {niveles.map((n, idx) => (
            <div
              key={n.nivel}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm transition-all shadow-sm ${
                idx === currentLevelIndex
                  ? 'bg-blue-600 text-white shadow-blue-600/30 scale-110 ring-4 ring-blue-100'
                  : idx < currentLevelIndex
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-200 text-slate-400'
              }`}
            >
              0{n.nivel}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mb-8 overflow-x-auto p-2">
        <div className="grid grid-cols-12 gap-1.5 md:gap-2 bg-white p-6 rounded-3xl shadow-inner border border-slate-100">
          {nivelActual.grid.map((row, rowIndex) =>
            row.map((letter, colIndex) => {
              const cellId = `${rowIndex}-${colIndex}`;
              const isSelected = selectedCells.includes(cellId);
              return (
                <button
                  key={cellId}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl font-black text-xs sm:text-sm md:text-base flex items-center justify-center transition-all duration-300 select-none ${
                    isSelected
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-105'
                      : 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {letter}
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="text-center">
        {esCompleto ? (
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-3xl mb-6 shadow-xl shadow-emerald-500/20 animate-bounce">
            <h4 className="text-xl font-black uppercase">¡Nivel Superado con Éxito! 🎉</h4>
            <p className="text-xs font-semibold mt-1 uppercase tracking-wider">
              {currentLevelIndex < niveles.length - 1 ? "Cargando siguiente nivel..." : "¡Increíble! ¡Completaste toda la aventura!"}
            </p>
          </div>
        ) : (
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
            Haz clic en las palabras encontradas para marcarlas ({foundWords.length}/{nivelActual.palabras.length}):
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {nivelActual.palabras.map((word, index) => {
            const isFound = foundWords.includes(word);
            const colorClass = coloresCelebracion[index % coloresCelebracion.length];
            const isJustFound = lastFoundEffect === word;

            return (
              <span
                key={index}
                onClick={() => toggleWordFound(word)}
                className={`cursor-pointer px-5 py-2.5 rounded-2xl text-xs font-black tracking-widest uppercase transition-all duration-300 border shadow-sm ${
                  isFound
                    ? `${colorClass} line-through scale-95 shadow-md ${isJustFound ? 'animate-ping scale-110' : ''}`
                    : 'bg-white text-slate-700 border-slate-200 hover:border-orange-500 hover:text-orange-600'
                }`}
              >
                {word} {isFound && '✨'}
              </span>
            );
          })}
        </div>

        <button
          onClick={reiniciarNivel}
          className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest underline transition-colors"
        >
          Reiniciar este nivel
        </button>
      </div>
    </div>
  );
}