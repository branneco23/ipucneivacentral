// src/app/login/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // SIMULACIÓN DE AUTENTICACIÓN
    // Aquí conectarías con tu API Route, Supabase, Firebase o NextAuth
    setTimeout(() => {
      if (email === "admin@seven.com" && password === "admin123") {
        // En producción aquí creas la cookie de sesión o JWT token
        document.cookie = "admin_token=true; path=/; max-age=86400; SameSite=Strict";
        
        // Redirige directamente al Dashboard que creamos
        router.push('/admin');
      } else {
        setIsLoading(false);
        setError('Credenciales incorrectas. Por favor, verifica el correo y la contraseña.');
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden font-sans select-none">
      
      {/* EFECTOS DE LUCES DE FONDO DEGRADADAS */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00338d]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* CONTENEDOR PRINCIPAL */}
      <div className="w-full max-w-md bg-[#090d16] border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.6)] relative z-10 transition-all">
        
        {/* BRANDING / IDENTIDAD */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white">Seven Creative</h1>
          <p className="text-xs text-white/40 mt-1.5 font-medium">
            Ingresa tus credenciales para acceder al panel de control
          </p>
        </div>

        {/* MENSAJE DE ERROR */}
        {error && (
          <div className="mb-5 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-xs text-red-400 font-medium leading-relaxed animate-shake">
            <i className="ri-error-warning-line mr-1.5 text-sm"></i>
            {error}
          </div>
        )}

        {/* FORMULARIO */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* CAMPO: CORREO ELECTRÓNICO */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-white/50 uppercase tracking-wider pl-1">
              Correo Electrónico
            </label>
            <div className="relative flex items-center">
              <Mail size={16} className="absolute left-4 text-white/30" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@seven.com"
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#00338d] transition-all"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* CAMPO: CONTRASEÑA */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-bold text-white/50 uppercase tracking-wider">
                Contraseña
              </label>
            </div>
            <div className="relative flex items-center">
              <Lock size={16} className="absolute left-4 text-white/30" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl pl-12 pr-12 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#00338d] transition-all font-sans"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-white/30 hover:text-white transition-colors p-1"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* RECUÉRDAME & RECUPERACIÓN */}
          <div className="flex items-center justify-between pt-1 px-1 text-xs text-white/40">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input 
                type="checkbox" 
                className="rounded bg-white/5 border-white/10 text-[#00338d] focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer" 
              />
              <span>Mantener sesión</span>
            </label>
          </div>

          {/* BOTÓN DE ACCESO */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00338d] hover:bg-[#002260] disabled:bg-[#00338d]/50 text-white font-bold py-3.5 rounded-xl text-sm transition-all uppercase tracking-wide shadow-lg shadow-[#00338d]/10 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Verificando Cuenta...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}