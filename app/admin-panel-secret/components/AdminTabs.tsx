"use client";

import React from "react";

interface AdminTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AdminTabs({ activeTab, setActiveTab }: AdminTabsProps) {
  const tabs = [
    { id: "anuncios", label: "Anuncios" },
    { id: "envivos", label: "En Vivos" },
    { id: "devocionales", label: "Devocionales" },
    { id: "eventos", label: "Eventos Calendario" },
    { id: "comites", label: "Páginas Comités" },
    { id: "blogs", label: "Blogs" },
  ];

  return (
    <nav className="flex flex-wrap gap-2 bg-slate-900/60 p-2 rounded-2xl border border-slate-800 shadow-md">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
            activeTab === tab.id
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
              : "text-slate-400 hover:text-white hover:bg-slate-800/50"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}