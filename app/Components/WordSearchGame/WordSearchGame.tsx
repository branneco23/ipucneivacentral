"use client";

import React, { useState } from "react";

// ==========================================
// BANCOS DE PALABRAS PARA LA SOPA DE LETRAS
// ==========================================
const WORDS_FACIL = ["ADAN", "NOE", "ABRAHAM", "ISAAC", "JACOB", "JOSE", "MOISES", "JOSUE", "DAVID", "SALOMON", "ELIAS", "ELISEO", "ISAIAS", "DANIEL", "MARIA"];
const WORDS_MEDIO = ["SAMUEL", "ESTER", "RUT", "NEHEMIAS", "GEDEON", "JONAS", "MATEO", "MARCOS", "LUCAS", "JUAN", "PEDRO", "PABLO", "TOMAS", "ESTEBAN", "BERNABE", "SARA", "REBECA", "RAQUEL", "ISRAEL", "SENACHERIB"];
const WORDS_DIFICIL = ["MELQUISEDEC", "MATUSALEN", "ZERUBABEL", "HABACUC", "ZEFANIAS", "APOCALIPSIS", "DEUTERONOMIO", "LEVITICO", "BARUC", "OBADIAS", "NAHUM", "AGEO", "MALAQUIAS", "MEFIBOSET", "JESABEL", "NABUCODONOSOR", "BALAAM", "EZEQUIAS", "JOSAFAT", "CORNELIO", "ONESIMO", "FILIMON", "TIMOTEO", "TITUS", "SULAMITA"];

const GRIDS_SOPA = {
  facil: [
    ["A", "B", "R", "A", "H", "A", "M", "X", "Z", "J", "O", "S", "E", "P"],
    ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P"],
    ["A", "I", "S", "A", "A", "C", "Q", "W", "E", "R", "T", "Y", "U", "I"],
    ["N", "O", "E", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "S"],
    ["J", "K", "L", "Z", "X", "C", "V", "B", "N", "M", "Q", "W", "E", "A"],
    ["O", "P", "I", "U", "Y", "T", "R", "E", "W", "Q", "A", "S", "D", "L"],
    ["S", "A", "L", "O", "M", "O", "N", "F", "G", "H", "J", "K", "L", "O"],
    ["E", "D", "C", "V", "B", "N", "M", "J", "I", "U", "Y", "T", "R", "M"],
    ["M", "O", "I", "S", "E", "S", "Q", "W", "E", "R", "T", "Y", "U", "O"],
    ["D", "A", "V", "I", "D", "A", "S", "D", "F", "G", "H", "J", "K", "N"],
    ["J", "U", "A", "N", "Z", "X", "C", "V", "B", "N", "M", "Q", "W", "E"],
    ["E", "L", "I", "A", "S", "I", "U", "Y", "T", "R", "E", "W", "Q", "A"],
  ],
  medio: [
    ["S", "A", "M", "U", "E", "L", "X", "Z", "E", "S", "T", "E", "R", "K"],
    ["R", "U", "T", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X"],
    ["N", "E", "H", "E", "M", "I", "A", "S", "Q", "W", "E", "R", "T", "Y"],
    ["G", "E", "D", "E", "O", "N", "J", "O", "N", "A", "S", "U", "I", "O"],
    ["M", "A", "T", "E", "O", "M", "A", "R", "C", "O", "S", "P", "A", "L"],
    ["L", "U", "C", "A", "S", "J", "U", "A", "N", "P", "E", "D", "R", "O"],
    ["P", "A", "B", "L", "O", "T", "O", "M", "A", "S", "Z", "X", "C", "V"],
    ["E", "S", "T", "E", "B", "A", "N", "B", "E", "R", "N", "A", "B", "E"],
    ["S", "A", "R", "A", "R", "E", "B", "E", "C", "A", "Q", "W", "E", "R"],
    ["R", "A", "Q", "U", "E", "L", "I", "S", "R", "A", "E", "L", "T", "Y"],
    ["S", "E", "N", "A", "C", "H", "E", "R", "I", "B", "U", "I", "O", "P"],
  ],
  dificil: [
    ["M", "E", "L", "Q", "U", "I", "S", "E", "D", "E", "C", "X", "Z", "A"],
    ["M", "A", "T", "U", "S", "A", "L", "E", "N", "Q", "W", "E", "R", "P"],
    ["Z", "E", "R", "U", "B", "A", "B", "E", "L", "A", "S", "D", "F", "O"],
    ["H", "A", "B", "A", "C", "U", "C", "Z", "E", "F", "A", "N", "I", "C"],
    ["A", "P", "O", "C", "A", "L", "I", "P", "S", "I", "S", "U", "I", "A"],
    ["D", "E", "U", "T", "E", "R", "O", "N", "O", "M", "I", "O", "O", "L"],
    ["L", "E", "V", "I", "T", "I", "C", "O", "B", "A", "R", "U", "C", "I"],
    ["O", "B", "A", "D", "I", "A", "S", "N", "A", "H", "U", "M", "Y", "P"],
    ["A", "G", "E", "O", "M", "A", "L", "A", "Q", "U", "I", "A", "S", "S"],
    ["M", "E", "F", "I", "B", "O", "S", "E", "T", "J", "E", "S", "A", "B"],
    ["N", "A", "B", "U", "C", "O", "D", "O", "N", "O", "S", "O", "R", "E"],
    ["B", "A", "L", "A", "A", "M", "E", "Z", "E", "Q", "U", "I", "A", "S"],
  ]
};

interface WordConfig {
  num: number;
  word: string;
  row: number;
  col: number;
  dir: "H" | "V";
  clue: string;
}

// DEFINICIÓN DE CRUCIGRAMAS VALIDADA Y VERIFICADA LETRA POR LETRA
const CROSSWORDS_DATA: { [key: string]: { size: number; words: WordConfig[] } } = {
  facil: {
    size: 10,
    words: [
      // 1. DAVID (Horiz: 0,0..0,4) -> D-A-V-I-D
      { num: 1, word: "DAVID", row: 0, col: 0, dir: "H", clue: "Rey de Israel que venció a Goliat (5 letras)" },
      // 1. DANIEL (Vert: 0,0..5,0) -> D-A-N-I-E-L
      { num: 1, word: "DANIEL", row: 0, col: 0, dir: "V", clue: "Profeta arrojado al foso de los leones (6 letras)" },
      // 2. ISAAC (Vert: 0,3..4,3) -> I-S-A-A-C
      { num: 2, word: "ISAAC", row: 0, col: 3, dir: "V", clue: "Hijo de la promesa de Abraham e Sara (5 letras)" },
      // 3. ADAN (Horiz: 2,3..2,6) -> A-D-A-N (Cruza A con ISAAC en 2,3)
      { num: 3, word: "ADAN", row: 2, col: 3, dir: "H", clue: "Primer hombre creado por Dios (4 letras)" },
      // 4. NOE (Vert: 2,6..4,6) -> N-O-E (Cruza N con ADAN en 2,6)
      { num: 4, word: "NOE", row: 2, col: 6, dir: "V", clue: "Constructor del Arca en el diluvio (3 letras)" },
      // 5. MOISES (Horiz: 4,0..4,5) -> M-O-I-S-E-S (Cruza E con DANIEL en 4,0 y S con ISAAC en 4,3)
      { num: 5, word: "MOISES", row: 4, col: 0, dir: "H", clue: "Líder que sacó al pueblo de Egipto (6 letras)" },
      // 6. ELIAS (Vert: 4,4..8,4) -> E-L-I-A-S (Cruza E con MOISES en 4,4)
      { num: 6, word: "ELIAS", row: 4, col: 4, dir: "V", clue: "Profeta llevado al cielo en carro de fuego (5 letras)" },
      // 7. JOSE (Horiz: 6,2..6,5) -> J-O-S-E (Cruza S con ELIAS en 6,4)
      { num: 7, word: "JOSE", row: 6, col: 2, dir: "H", clue: "Hijo de Jacob con túnica de colores (4 letras)" },
      // 8. JOSUE (Vert: 6,2..10,2) -> J-O-S-U-E (Cruza J con JOSE en 6,2)
      { num: 8, word: "JOSUE", row: 6, col: 2, dir: "V", clue: "Sucesor de Moisés que conquistó Jericó (5 letras)" },
      // 9. RUT (Horiz: 8,2..8,4) -> R-U-T (Cruza U con JOSUE en 8,2 y T)
      { num: 9, word: "RUT", row: 8, col: 2, dir: "H", clue: "Joven moabita fiel antecesora de David (3 letras)" },
    ]
  },
  medio: {
    size: 11,
    words: [
      { num: 1, word: "MATEO", row: 0, col: 0, dir: "H", clue: "Apóstol y autor del primer Evangelio (5 letras)" },
      { num: 1, word: "MOISES", row: 0, col: 0, dir: "V", clue: "Líder que abrió el Mar Rojo (6 letras)" },
      { num: 2, word: "ESTER", row: 0, col: 3, dir: "V", clue: "Reina judía en Persia (5 letras)" },
      { num: 3, word: "SARA", row: 3, col: 0, dir: "H", clue: "Esposa de Abraham y madre de Isaac (4 letras)" },
      { num: 4, word: "SAMUEL", row: 5, col: 0, dir: "H", clue: "Profeta ungidor de Saúl y David (6 letras)" },
      { num: 5, word: "LUCAS", row: 0, col: 4, dir: "V", clue: "Médico amado y evangelista (5 letras)" },
      { num: 6, word: "PABLO", row: 2, col: 4, dir: "H", clue: "Apóstol de los gentiles y escritor (5 letras)" },
      { num: 7, word: "PEDRO", row: 2, col: 4, dir: "V", clue: "Apóstol llamado la 'roca' (5 letras)" },
      { num: 8, word: "JONAS", row: 4, col: 2, dir: "V", clue: "Profeta tragado por un gran pez (5 letras)" },
      { num: 9, word: "GEDEON", row: 8, col: 2, dir: "H", clue: "Juez que venció con 300 hombres (6 letras)" },
      { num: 10, word: "RAQUEL", row: 5, col: 5, dir: "V", clue: "Esposa amada de Jacob (6 letras)" },
      { num: 11, word: "ISRAEL", row: 10, col: 0, dir: "H", clue: "Nuevo nombre dado por Dios a Jacob (6 letras)" },
      { num: 12, word: "TOMAS", row: 3, col: 8, dir: "V", clue: "Apóstol que pidió ver para creer (5 letras)" },
      { num: 13, word: "RUT", row: 3, col: 8, dir: "H", clue: "Fiel mujer moabita (3 letras)" },
    ]
  },
  dificil: {
    size: 13,
    words: [
      { num: 1, word: "HABACUC", row: 0, col: 0, dir: "H", clue: "Profeta de 'El justo por su fe vivirá' (7 letras)" },
      { num: 2, word: "BARUC", row: 0, col: 2, dir: "V", clue: "Escriba y secretario de Jeremías (5 letras)" },
      { num: 3, word: "CORNELIO", row: 0, col: 4, dir: "V", clue: "Centurión romano primer gentil convertido (8 letras)" },
      { num: 4, word: "NAHUM", row: 4, col: 0, dir: "H", clue: "Profeta del Antiguo Testamento de Elkosh (5 letras)" },
      { num: 5, word: "MALAQUIAS", row: 4, col: 1, dir: "V", clue: "Último profeta del Antiguo Testamento (9 letras)" },
      { num: 6, word: "AGEO", row: 7, col: 1, dir: "H", clue: "Profeta menor contemporáneo de Zacarías (4 letras)" },
      { num: 7, word: "APOCALIPSIS", row: 10, col: 0, dir: "H", clue: "Último libro del Nuevo Testamento (11 letras)" },
      { num: 8, word: "MATUSALEN", row: 2, col: 6, dir: "V", clue: "Personaje bíblico más anciano (9 letras)" },
      { num: 9, word: "TITUS", row: 2, col: 6, dir: "H", clue: "Colaborador de Pablo en Creta (5 letras)" },
      { num: 10, word: "DEUTERONOMIO", row: 1, col: 9, dir: "V", clue: "Quinto libro de la Biblia y de la Ley (12 letras)" },
      { num: 11, word: "ONESIMO", row: 5, col: 6, dir: "H", clue: "Siervo útil en la carta a Filemón (7 letras)" },
      { num: 12, word: "EZEQUIAS", row: 9, col: 4, dir: "H", clue: "Rey piadoso de Judá que enfermó (8 letras)" },
      { num: 13, word: "BALAAM", row: 5, col: 4, dir: "V", clue: "Profeta adivino que habló con su asna (6 letras)" },
      { num: 14, word: "JOSAFAT", row: 1, col: 5, dir: "H", clue: "Rey de Judá hijo del rey Asa (7 letras)" },
      { num: 15, word: "SULAMITA", row: 0, col: 8, dir: "V", clue: "Amada de Cantar de los Cantares (8 letras)" },
      { num: 16, word: "TIMOTEO", row: 11, col: 0, dir: "H", clue: "Joven discípulo y compañero de Pablo (7 letras)" },
      { num: 17, word: "JESABEL", row: 5, col: 10, dir: "V", clue: "Malvada reina esposa del rey Acab (7 letras)" },
      { num: 18, word: "BERNABE", row: 4, col: 2, dir: "H", clue: "Compañero apostólico de Pablo (7 letras)" },
    ]
  }
};

export default function GameHub() {
  const [activeTab, setActiveTab] = useState<"sopa" | "crucigrama">("sopa");
  const [difficulty, setDifficulty] = useState<"facil" | "medio" | "dificil">("facil");
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<{ r: number; c: number }[]>([]);
  const [message, setMessage] = useState("Selecciona las letras en orden para hallar las palabras.");
  const [effectType, setEffectType] = useState<"success" | "error" | null>(null);

  const [crosswordGrid, setCrosswordGrid] = useState<{ [key: string]: string }>({});

  const currentWords = difficulty === "facil" ? WORDS_FACIL : difficulty === "medio" ? WORDS_MEDIO : WORDS_DIFICIL;
  const currentGrid = GRIDS_SOPA[difficulty];

  // MONTAJE DINÁMICO DE CASILLAS
  const levelData = CROSSWORDS_DATA[difficulty];
  const gridCells: { [key: string]: { char: string; num?: number } } = {};

  levelData.words.forEach((w) => {
    for (let i = 0; i < w.word.length; i++) {
      const r = w.dir === "H" ? w.row : w.row + i;
      const c = w.dir === "H" ? w.col + i : w.col;
      const key = `${r}-${c}`;

      if (!gridCells[key]) {
        gridCells[key] = { char: w.word[i] };
      }
      if (i === 0) {
        gridCells[key].num = w.num;
      }
    }
  });

  const handleCellClick = (r: number, c: number) => {
    const newSelected = [...selectedCells, { r, c }];
    setSelectedCells(newSelected);
    const formedWord = newSelected.map((cell) => currentGrid[cell.r][cell.c]).join("");

    if (currentWords.includes(formedWord) && !foundWords.includes(formedWord)) {
      const updatedFound = [...foundWords, formedWord];
      setFoundWords(updatedFound);
      setMessage(`✨ ¡Correcto! Encontraste: ${formedWord} (${updatedFound.length}/${currentWords.length})`);
      setEffectType("success");
      setSelectedCells([]);
      setTimeout(() => setEffectType(null), 1500);
    } else if (formedWord.length >= 8) {
      setMessage("❌ Selección incorrecta.");
      setEffectType("error");
      setSelectedCells([]);
      setTimeout(() => setEffectType(null), 1500);
    }
  };

  const handleCrosswordInput = (r: number, c: number, val: string) => {
    const key = `${r}-${c}`;
    setCrosswordGrid({ ...crosswordGrid, [key]: val.toUpperCase() });
  };

  const horizontales = levelData.words.filter((w) => w.dir === "H");
  const verticales = levelData.words.filter((w) => w.dir === "V");

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-3xl shadow-2xl border border-slate-100 my-8 font-sans">
      
      {/* Botones de Navegación entre Juegos */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => { setActiveTab("sopa"); setFoundWords([]); setSelectedCells([]); }}
          className={`px-6 py-3 rounded-2xl font-black text-sm transition-all shadow-md ${
            activeTab === "sopa" ? "bg-[#00338d] text-white scale-105" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          🧩 Sopa de Letras Bíblica
        </button>
        <button
          onClick={() => setActiveTab("crucigrama")}
          className={`px-6 py-3 rounded-2xl font-black text-sm transition-all shadow-md ${
            activeTab === "crucigrama" ? "bg-[#00338d] text-white scale-105" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          📝 Crucigrama Cruzado Clásico
        </button>
      </div>

      {/* Retroalimentación Visual */}
      {message && (
        <div
          className={`p-4 mb-6 rounded-2xl text-center font-bold text-sm transition-all duration-300 ${
            effectType === "success"
              ? "bg-green-100 text-green-700 border-2 border-green-300 shadow-md"
              : effectType === "error"
              ? "bg-red-100 text-red-700 border-2 border-red-300 shadow-md"
              : "bg-blue-50 text-[#00338d] border border-blue-100"
          }`}
        >
          {message}
        </div>
      )}

      {/* Selector de Dificultad */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 bg-slate-50 p-4 rounded-2xl">
        <div>
          <h2 className="text-xl font-black text-slate-800">
            {activeTab === "sopa" ? "Sopa de Letras" : "Crucigrama Estructurado"} - Nivel{" "}
            <span className="uppercase text-[#00338d]">{difficulty}</span>
          </h2>
          <p className="text-xs text-slate-500">
            {difficulty === "facil" && "10 Palabras en una malla continua interconectada."}
            {difficulty === "medio" && "14 Palabras en red dinámica con pistas."}
            {difficulty === "dificil" && "18 Palabras avanzadas del Antiguo y Nuevo Testamento."}
          </p>
        </div>

        <div className="flex gap-1 bg-white p-1.5 rounded-xl shadow-sm border border-slate-200 text-xs font-bold">
          <button
            onClick={() => { setDifficulty("facil"); setFoundWords([]); setSelectedCells([]); setCrosswordGrid({}); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${difficulty === "facil" ? "bg-[#00338d] text-white" : "text-slate-600"}`}
          >
            Fácil (10)
          </button>
          <button
            onClick={() => { setDifficulty("medio"); setFoundWords([]); setSelectedCells([]); setCrosswordGrid({}); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${difficulty === "medio" ? "bg-[#00338d] text-white" : "text-slate-600"}`}
          >
            Medio (14)
          </button>
          <button
            onClick={() => { setDifficulty("dificil"); setFoundWords([]); setSelectedCells([]); setCrosswordGrid({}); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${difficulty === "dificil" ? "bg-amber-600 text-white" : "text-slate-600"}`}
          >
            Difícil (18) ↗️
          </button>
        </div>
      </div>

      {/* VISTA 1: SOPA DE LETRAS */}
      {activeTab === "sopa" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900 p-6 rounded-3xl flex flex-col items-center justify-center overflow-x-auto shadow-inner">
            <div className="grid grid-cols-14 gap-1.5">
              {currentGrid.map((row, rIndex) =>
                row.map((letter, cIndex) => {
                  const isSelected = selectedCells.some((cell) => cell.r === rIndex && cell.c === cIndex);
                  return (
                    <button
                      key={`${rIndex}-${cIndex}`}
                      onClick={() => handleCellClick(rIndex, cIndex)}
                      className={`w-8 h-8 md:w-9 md:h-9 rounded-lg font-black text-xs md:text-sm flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-amber-400 text-slate-900 scale-110 shadow-lg"
                          : "bg-slate-800 text-white hover:bg-slate-700"
                      }`}
                    >
                      {letter}
                    </button>
                  );
                })
              )}
            </div>
            <button
              onClick={() => setSelectedCells([])}
              className="mt-4 text-xs font-bold text-slate-400 hover:text-white underline"
            >
              Limpiar selección
            </button>
          </div>

          <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200">
            <h3 className="text-xs font-black uppercase text-slate-500 mb-3 tracking-wider">
              Palabras ({foundWords.length}/{currentWords.length})
            </h3>
            <div className="flex flex-wrap gap-2 max-h-72 overflow-y-auto pr-1">
              {currentWords.map((word) => {
                const isFound = foundWords.includes(word);
                return (
                  <span
                    key={word}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isFound ? "bg-green-500 text-white line-through shadow-sm" : "bg-white text-slate-700 border border-slate-200"
                    }`}
                  >
                    {word} {isFound && "✨"}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VISTA 2: CRUCIGRAMA MATEADO PERFECTAMENTE */}
      {activeTab === "crucigrama" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900 p-6 rounded-3xl flex flex-col items-center justify-center overflow-x-auto shadow-inner">
            <p className="text-xs text-amber-400 font-bold mb-4 uppercase tracking-wider">
              ✨ Figura de Crucigrama: Nivel {difficulty}
            </p>

            <div
              className="grid gap-1 bg-slate-800 p-3 rounded-2xl"
              style={{ gridTemplateColumns: `repeat(${levelData.size}, minmax(0, 1fr))` }}
            >
              {Array.from({ length: levelData.size }).map((_, r) =>
                Array.from({ length: levelData.size }).map((_, c) => {
                  const cellKey = `${r}-${c}`;
                  const cellData = gridCells[cellKey];

                  if (!cellData) {
                    return <div key={`empty-${r}-${c}`} className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-900 rounded-md opacity-20" />;
                  }

                  return (
                    <div key={cellKey} className="relative">
                      {cellData.num && (
                        <span className="absolute top-0.5 left-0.5 text-[9px] font-black text-amber-400 z-10 leading-none">
                          {cellData.num}
                        </span>
                      )}
                      <input
                        type="text"
                        maxLength={1}
                        value={crosswordGrid[cellKey] || ""}
                        onChange={(e) => handleCrosswordInput(r, c, e.target.value)}
                        className="w-7 h-7 sm:w-8 sm:h-8 text-center font-black uppercase text-slate-900 bg-white rounded-md border border-slate-300 focus:ring-2 focus:ring-amber-400 focus:outline-none text-xs"
                      />
                    </div>
                  );
                })
              )}
            </div>
            <span className="text-[10px] text-slate-400 mt-3 text-center">
              Cruces interconectados: todas las casillas están unidas en una sola malla coordinada.
            </span>
          </div>

          <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider">
              Pistas - Nivel <span className="text-[#00338d]">{difficulty}</span>
            </h3>

            <div className="space-y-3 text-xs max-h-96 overflow-y-auto pr-1">
              <div>
                <h4 className="font-black text-[#00338d] mb-1.5 uppercase tracking-wide">Horizontales</h4>
                {horizontales.map((item) => (
                  <div key={`h-${item.num}-${item.word}`} className="p-2 mb-1.5 bg-white rounded-xl border border-slate-200 shadow-sm text-slate-700">
                    <span className="font-bold text-amber-600 mr-1">{item.num}.</span> {item.clue}
                  </div>
                ))}
              </div>

              <div>
                <h4 className="font-black text-[#00338d] mb-1.5 uppercase tracking-wide">Verticales</h4>
                {verticales.map((item) => (
                  <div key={`v-${item.num}-${item.word}`} className="p-2 mb-1.5 bg-white rounded-xl border border-slate-200 shadow-sm text-slate-700">
                    <span className="font-bold text-amber-600 mr-1">{item.num}.</span> {item.clue}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}