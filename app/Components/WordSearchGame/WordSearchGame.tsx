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

// ==========================================
// CONFIGURACIÓN DE CRUCIGRAMAS POR NIVEL (FIGURAS Y CANTIDADES ÚNICAS)
// ==========================================
const CROSSWORDS_CONFIG = {
  facil: {
    gridSize: 8, // Cuadrícula 8x8 (Figura compacta, 4 palabras cruzadas)
    // Función para definir qué celdas son activas (blancas) y sus números indicadores
    isActiveCell: (r: number, c: number) => {
      // Cruz sencilla: Vertical en col 3 (de r:1 a r:6 -> DANIEL) y Horizontal en r:3 (de c:1 a c:6 -> DAVID)
      // Más otra horizontal abajo (OSEAS en r:6, c:2 a c:6) y vertical corta (NOE en r:4 a r:6, col 6)
      return (
        (c === 3 && r >= 1 && r <= 6) || // 1. DANIEL (Vertical)
        (r === 3 && c >= 1 && c <= 6) || // 2. DAVID (Horizontal)
        (r === 6 && c >= 2 && c <= 6) || // 3. OSEAS (Horizontal)
        (c === 6 && r >= 4 && r <= 6)    // 4. NOE (Vertical)
      );
    },
    getCellNum: (r: number, c: number) => {
      if (r === 1 && c === 3) return "1";
      if (r === 3 && c === 1) return "2";
      if (r === 6 && c === 2) return "3";
      if (r === 4 && c === 6) return "4";
      return null;
    },
    clues: {
      horizontales: [
        { id: 2, text: "2. Rey de Israel que venció a Goliat (5 letras)" },
        { id: 3, text: "3. Profeta del Antiguo Testamento (5 letras)" }
      ],
      verticales: [
        { id: 1, text: "1. Profeta arrojado al foso de los leones (6 letras)" },
        { id: 4, text: "4. Constructor del Arca en el diluvio (3 letras)" }
      ]
    }
  },
  medio: {
    gridSize: 10, // Cuadrícula 10x10 (Figura mediana en bloque, 6 palabras cruzadas)
    isActiveCell: (r: number, c: number) => {
      return (
        (c === 4 && r >= 1 && r <= 7) || // ESTER (Vertical)
        (r === 2 && c >= 2 && c <= 8) || // SAMUEL (Horizontal)
        (r === 5 && c >= 1 && c <= 6) || // JONAS (Horizontal)
        (c === 2 && r >= 5 && r <= 9) || // RUT (Vertical)
        (r === 7 && c >= 4 && c <= 9) || // GEDEON (Horizontal)
        (c === 7 && r >= 2 && r <= 7)    // MATEO (Vertical)
      );
    },
    getCellNum: (r: number, c: number) => {
      if (r === 1 && c === 4) return "1";
      if (r === 2 && c === 2) return "2";
      if (r === 5 && c === 1) return "3";
      if (r === 5 && c === 2) return "4";
      if (r === 7 && c === 4) return "5";
      if (r === 2 && c === 7) return "6";
      return null;
    },
    clues: {
      horizontales: [
        { id: 2, text: "2. Profeta ungidor de reyes (6 letras)" },
        { id: 3, text: "3. Profeta tragado por un gran pez (5 letras)" },
        { id: 5, text: "5. Juez de Israel con 300 hombres (6 letras)" }
      ],
      verticales: [
        { id: 1, text: "1. Reina judía que salvó a su pueblo (5 letras)" },
        { id: 4, text: "4. Joven moabita fiel antecesora de David (3 letras)" },
        { id: 6, text: "6. Apóstol y evangelista primer nombre (5 letras)" }
      ]
    }
  },
  dificil: {
    gridSize: 11, // Cuadrícula 11x11 (Figura compleja en forma de cruz entrelazada grande, 8 palabras avanzadas)
    isActiveCell: (r: number, c: number) => {
      return (
        (c === 5 && r >= 0 && r <= 10) || // NABUCODONOSOR / MELQUISEDEC (Vertical grande)
        (r === 3 && c >= 1 && c <= 9)  || // APOCALIPSIS (Horizontal larga)
        (r === 7 && c >= 0 && c <= 10) || // MATUSALEN (Horizontal larga)
        (c === 2 && r >= 2 && r <= 8)  || // EZEQUIAS (Vertical)
        (c === 8 && r >= 2 && r <= 8)  || // JOSAFAT (Vertical)
        (r === 1 && c >= 3 && c <= 7)  || // AGEO (Horizontal corta)
        (r === 9 && c >= 3 && c <= 7)     // NAHUM (Horizontal corta)
      );
    },
    getCellNum: (r: number, c: number) => {
      if (r === 0 && c === 5) return "1";
      if (r === 3 && c === 1) return "2";
      if (r === 7 && c === 0) return "3";
      if (r === 2 && c === 2) return "4";
      if (r === 2 && c === 8) return "5";
      if (r === 1 && c === 3) return "6";
      if (r === 9 && c === 3) return "7";
      return null;
    },
    clues: {
      horizontales: [
        { id: 2, text: "2. Último libro profético del Nuevo Testamento (11 letras)" },
        { id: 3, text: "3. Personaje bíblico considerado el más anciano (9 letras)" },
        { id: 6, text: "6. Profeta menor autor de breve libro (4 letras)" },
        { id: 7, text: "7. Profeta del Antiguo Testamento de Elkosh (5 letras)" }
      ],
      verticales: [
        { id: 1, text: "1. Rey babilonio o Sacerdote rey de Salem (11/13 letras)" },
        { id: 4, text: "4. Piadoso rey de Judá reformador (8 letras)" },
        { id: 5, text: "5. Rey de Judá hijo de Asa (7 letras)" }
      ]
    }
  }
};

export default function GameHub() {
  const [activeTab, setActiveTab] = useState<"sopa" | "crucigrama">("sopa");
  const [difficulty, setDifficulty] = useState<"facil" | "medio" | "dificil">("facil");
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<{r: number, c: number}[]>([]);
  const [message, setMessage] = useState("Selecciona las letras en orden para hallar las palabras.");
  const [effectType, setEffectType] = useState<"success" | "error" | null>(null);

  // Estados para el crucigrama dinámico
  const [crosswordGrid, setCrosswordGrid] = useState<{[key: string]: string}>({});

  const currentWords = difficulty === "facil" ? WORDS_FACIL : difficulty === "medio" ? WORDS_MEDIO : WORDS_DIFICIL;
  const currentGrid = GRIDS_SOPA[difficulty];
  const currentCrossword = CROSSWORDS_CONFIG[difficulty];

  // Manejo Sopa de Letras
  const handleCellClick = (r: number, c: number) => {
    const newSelected = [...selectedCells, {r, c}];
    setSelectedCells(newSelected);
    const formedWord = newSelected.map(cell => currentGrid[cell.r][cell.c]).join("");

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
        <div className={`p-4 mb-6 rounded-2xl text-center font-bold text-sm transition-all duration-300 ${
          effectType === "success" ? "bg-green-100 text-green-700 scale-102 border-2 border-green-300 shadow-md" :
          effectType === "error" ? "bg-red-100 text-red-700 border-2 border-red-300 shadow-md" :
          "bg-blue-50 text-[#00338d] border border-blue-100"
        }`}>
          {message}
        </div>
      )}

      {/* Selector de Dificultad */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 bg-slate-50 p-4 rounded-2xl">
        <div>
          <h2 className="text-xl font-black text-slate-800">
            {activeTab === "sopa" ? "Sopa de Letras" : "Crucigrama Estructurado"} - Nivel <span className="uppercase text-[#00338d]">{difficulty}</span>
          </h2>
          <p className="text-xs text-slate-500">
            {difficulty === "facil" && "Figura compacta cruzada de nivel inicial."}
            {difficulty === "medio" && "Figura de bloques medianos con mayor cantidad de cruces."}
            {difficulty === "dificil" && "Figura geométrica avanzada con múltiples interconexiones complejas."}
          </p>
        </div>
        
        <div className="flex gap-1 bg-white p-1.5 rounded-xl shadow-sm border border-slate-200 text-xs font-bold">
          <button 
            onClick={() => { setDifficulty("facil"); setFoundWords([]); setSelectedCells([]); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${difficulty === "facil" ? "bg-[#00338d] text-white" : "text-slate-600"}`}
          >
            Fácil
          </button>
          <button 
            onClick={() => { setDifficulty("medio"); setFoundWords([]); setSelectedCells([]); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${difficulty === "medio" ? "bg-[#00338d] text-white" : "text-slate-600"}`}
          >
            Medio
          </button>
          <button 
            onClick={() => { setDifficulty("dificil"); setFoundWords([]); setSelectedCells([]); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${difficulty === "dificil" ? "bg-amber-600 text-white" : "text-slate-600"}`}
          >
            Difícil ↗️
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
                  const isSelected = selectedCells.some(cell => cell.r === rIndex && cell.c === cIndex);
                  return (
                    <button
                      key={`${rIndex}-${cIndex}`}
                      onClick={() => handleCellClick(rIndex, cIndex)}
                      className={`w-8 h-8 md:w-9 md:h-9 rounded-lg font-black text-xs md:text-sm flex items-center justify-center transition-all ${
                        isSelected ? "bg-amber-400 text-slate-900 scale-110 shadow-lg" : "bg-slate-800 text-white hover:bg-slate-700"
                      }`}
                    >
                      {letter}
                    </button>
                  );
                })
              )}
            </div>
            <button onClick={() => setSelectedCells([])} className="mt-4 text-xs font-bold text-slate-400 hover:text-white underline">
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
                  <span key={word} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${isFound ? "bg-green-500 text-white line-through shadow-sm" : "bg-white text-slate-700 border border-slate-200"}`}>
                    {word} {isFound && "✨"}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VISTA 2: CRUCIGRAMA DINÁMICO CON FIGURAS DIFERENCIADAS */}
      {activeTab === "crucigrama" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* TABLERO CON LA FIGURA GEOMÉTRICA DEL NIVEL */}
          <div className="lg:col-span-2 bg-slate-900 p-6 rounded-3xl flex flex-col items-center justify-center overflow-x-auto shadow-inner">
            <p className="text-xs text-amber-400 font-bold mb-4 uppercase tracking-wider">
              ✨ Figura de Crucigrama: Nivel {difficulty}
            </p>
            
            <div 
              className="grid gap-1 bg-slate-800 p-3 rounded-2xl"
              style={{ gridTemplateColumns: `repeat(${currentCrossword.gridSize}, minmax(0, 1fr))` }}
            >
              {Array.from({ length: currentCrossword.gridSize }).map((_, r) =>
                Array.from({ length: currentCrossword.gridSize }).map((_, c) => {
                  const isActive = currentCrossword.isActiveCell(r, c);

                  if (!isActive) {
                    return <div key={`empty-${r}-${c}`} className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-900 rounded-md opacity-25" />;
                  }

                  const cellKey = `${r}-${c}`;
                  const numLabel = currentCrossword.getCellNum(r, c);

                  return (
                    <div key={cellKey} className="relative">
                      {numLabel && (
                        <span className="absolute top-0.5 left-1 text-[8px] sm:text-[9px] font-black text-amber-400 z-10">{numLabel}</span>
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
            <span className="text-[10px] text-slate-400 mt-3 text-center">Las casillas negras bloquean espacios; rellena los bloques blancos interconectados.</span>
          </div>

          {/* LISTADO DE PISTAS POR NIVEL */}
          <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider">
              Pistas - Nivel <span className="text-[#00338d]">{difficulty}</span>
            </h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <h4 className="font-black text-[#00338d] mb-1.5 uppercase tracking-wide">Horizontales</h4>
                {currentCrossword.clues.horizontales.map((item, idx) => (
                  <div key={idx} className="p-2.5 mb-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm text-slate-700">
                    {item.text}
                  </div>
                ))}
              </div>

              <div>
                <h4 className="font-black text-[#00338d] mb-1.5 uppercase tracking-wide">Verticales</h4>
                {currentCrossword.clues.verticales.map((item, idx) => (
                  <div key={idx} className="p-2.5 mb-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm text-slate-700">
                    {item.text}
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