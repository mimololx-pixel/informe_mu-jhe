import { useState } from 'react'
import Resumen from './components/Resumen'
import Marco from './components/Marco'
import Delitos from './components/Delitos'

const secciones = [
  { id: 'resumen', label: '01 · Resumen ejecutivo', componente: Resumen },
  { id: 'marco', label: '02 · Marco normativo', componente: Marco },
  { id: 'delitos', label: '03 · Delitos informáticos', componente: Delitos },
  { id: 'comparacion', label: '04 · Comparación marcos', componente: null },
  { id: 'responsabilidades', label: '05 · Responsabilidades', componente: null },
  { id: 'datos', label: '06 · Datos personales', componente: null },
  { id: 'conclusiones', label: '07 · Conclusiones', componente: null },
  { id: 'prompts', label: '08 · Bitácora IA', componente: null },
]

function Placeholder({ id }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="inline-block bg-gray-100 rounded-full px-4 py-1 text-sm text-gray-500 mb-4">En construcción</div>
      <h2 className="text-2xl font-semibold text-gray-700">Sección "{id}" próximamente</h2>
      <p className="text-gray-500 mt-2">Este componente se agregará en la siguiente fase del proyecto.</p>
    </div>
  )
}

function App() {
  const [activa, setActiva] = useState('resumen')
  const [menuAbierto, setMenuAbierto] = useState(false)

  const seccionActual = secciones.find((s) => s.id === activa)
  const Componente = seccionActual?.componente

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-900 text-white shrink-0">
        <div className="px-6 py-5 border-b border-gray-700">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">TI3034 · Eval. Sumativa N°2</p>
          <h1 className="text-base font-bold leading-tight">Banco de Chile<br /><span className="font-normal text-gray-300">Análisis legal 2018</span></h1>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          {secciones.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiva(s.id)}
              className={`w-full text-left px-6 py-3 text-sm transition-colors ${
                activa === s.id
                  ? 'bg-gray-700 text-white font-medium border-l-4 border-blue-400'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white border-l-4 border-transparent'
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>
        <div className="px-6 py-4 border-t border-gray-700 text-xs text-gray-500">
          INACAP Valparaíso · Otoño 2026
        </div>
      </aside>

      {/* Wrapper móvil + contenido */}
      <div className="flex-1 flex flex-col min-h-screen relative">

        {/* Barra móvil — flujo normal, no fixed */}
        <div className="md:hidden bg-gray-900 text-white px-4 py-3 flex items-center justify-between shrink-0">
          <h1 className="text-sm font-bold">Banco de Chile — Análisis legal</h1>
          <button onClick={() => setMenuAbierto(!menuAbierto)} className="text-gray-300 hover:text-white">
            {menuAbierto ? '✕' : '☰'}
          </button>
        </div>
        {menuAbierto && (
          <div className="md:hidden absolute top-[48px] left-0 right-0 z-40 bg-gray-900 border-t border-gray-700">
            {secciones.map((s) => (
              <button
                key={s.id}
                onClick={() => { setActiva(s.id); setMenuAbierto(false) }}
                className={`w-full text-left px-6 py-3 text-sm ${
                  activa === s.id ? 'bg-gray-700 text-white font-medium' : 'text-gray-400'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        {/* Contenido principal */}
        <main className="flex-1 overflow-y-auto">
          {Componente ? <Componente /> : <Placeholder id={seccionActual?.label} />}
        </main>

      </div>
    </div>
  )
}

export default App
