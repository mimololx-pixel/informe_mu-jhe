import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function AnimatedCounter({ target, duration = 1200 }) {
  const [value, setValue] = useState(0)
  const rafRef = useRef(null)
  useEffect(() => {
    const start = performance.now()
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])
  return <>{value.toLocaleString()}</>
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.35, ease: 'easeOut' },
  }),
}

const STATS = [
  { label: 'Fases completadas',               target: 8,  color: 'text-gray-700',  sub: null },
  { label: 'Fases sin corrección',             target: 6,  color: 'text-green-600', sub: 'de 8 fases' },
  { label: 'Herramienta utilizada',            target: 1,  color: 'text-gray-500',  sub: 'Claude Code' },
  { label: 'Palabras, prompt más extenso (F1)',target: 64, color: 'text-gray-400',  sub: 'palabras' },
]

const FASES = [
  {
    num: 'F1',
    titulo: 'Resumen ejecutivo',
    prompt: 'Redacta el resumen ejecutivo del caso Banco de Chile de mayo de 2018, donde atacantes usaron el malware KillMBR para inutilizar ~9.000 equipos y simultáneamente ejecutaron transferencias SWIFT fraudulentas por USD 10 millones. Incluye: fecha exacta, actores involucrados (banco, atacantes, CMF, SWIFT, bancos corresponsales), secuencia del ataque paso a paso, e impacto en dimensiones financiera, operacional, reputacional, regulatoria y de datos personales.',
    aceptado: 'La estructura completa: ficha del caso, descripción narrativa, tabla de impactos, línea de tiempo y tabla de actores.',
    corregido: 'Se precisó que la atribución al Grupo Lazarus es informal y nunca fue establecida judicialmente.',
    reflexion: 'Mencionar el nombre del malware (KillMBR), el monto exacto (USD 10M) y los destinos (Hong Kong, Madrid) permitió obtener un análisis concreto, no genérico.',
    conCorreccion: true,
  },
  {
    num: 'F2',
    titulo: 'Marco normativo',
    prompt: 'Redacta el marco normativo nacional e internacional aplicable al caso Banco de Chile 2018. Incluye: Ley 19.223 (vigente al momento), Ley 21.459 (análisis retroactivo con artículos clave), Ley 19.628, Ley General de Bancos, normativa CMF, Convenio de Budapest, SWIFT CSP, Basilea III, ISO 27001 y GDPR como referencia comparativa. Para cada norma indica ámbito, relevancia específica al caso y artículos aplicables.',
    aceptado: 'La estructura completa: cards numeradas para normas nacionales e internacionales, artículos destacados en color y tabla resumen final.',
    corregido: 'Se aclaró que el GDPR se incluye como referencia comparativa hipotética, no como norma directamente aplicable al caso.',
    reflexion: 'Especificar los artículos concretos de cada ley (no solo el nombre de la norma) permitió obtener un análisis jurídico preciso y citable, en lugar de una descripción genérica.',
    conCorreccion: true,
  },
  {
    num: 'F3',
    titulo: 'Tipificación de delitos informáticos',
    prompt: 'Ejecutemos la fase 3, pero intentemos mejorar con algunas interacciones bonitas en la página de Vercel para que sea bien interactivo.',
    aceptado: 'La estructura completa: stats row con 4 métricas clave, filtros de categoría por pills, cards expandibles con acordeón (texto legal, conexión con el ataque, fundamento jurídico, barra de severidad visual), tabla resumen y panel colapsable de escenario hipotético en tribunales chilenos.',
    corregido: null,
    reflexion: 'Pedir interactividad explícita (acordeón, filtros, barra de pena) antes de la implementación produjo un componente con 3 estados useState bien definidos desde el diseño, sin deuda técnica posterior.',
    conCorreccion: false,
  },
  {
    num: 'F4',
    titulo: 'Comparación de marcos regulatorios',
    prompt: 'ejecuta la fase 4, y agrega colores a las 4 fases que llevamos y la barra lateral derecha que despliega los modulos hazla mas bonita y dale una buena ubicacion. dame sugerencias y preguntas si lo concideras necesario.',
    aceptado: 'La estructura completa: banner emerald, tres ejes de comparación (industria/jurisdicción/temporal), barras de multa proporcionales, comparativa 2018 vs 2026 y bloque de síntesis. Además: colores por sección, sidebar rediseñado con barra de progreso y drawer móvil animado.',
    corregido: null,
    reflexion: 'Combinar múltiples solicitudes (fase nueva + mejoras visuales + UI) en un solo prompt requirió planificación explícita en modo /plan antes de ejecutar. Separar el análisis del diseño evitó ambigüedades en la implementación.',
    conCorreccion: false,
  },
  {
    num: 'F5',
    titulo: 'Responsabilidades legales de los actores',
    prompt: 'ejecutemos la fase 5, pero necesito que la mejores visualmente si es necesario utiliza de ejemplo alguna pagina de confianza de la web. Hazme sugerencias o preguntas si es optimo.',
    aceptado: 'La estructura completa: banner amber, stats row con 4 KPIs animados, matriz de responsabilidades tipo heatmap legal (3 tipos × 5 actores) con panel de norma al hover, cards expandibles por actor y tabla resumen con chips de norma al hover de fila.',
    corregido: null,
    reflexion: 'La combinación de matriz heatmap + acordeón elegida mediante pregunta previa al usuario permitió obtener un componente con dos niveles de lectura: vista rápida (matriz) y análisis detallado (acordeón). Preguntar el layout antes de implementar evitó iterar sobre el diseño.',
    conCorreccion: false,
  },
  {
    num: 'F6',
    titulo: 'Datos personales y Ley 19.628',
    prompt: 'lee el .md y ejecuta la fase que corresponda',
    aceptado: 'La estructura completa: banner purple con dot-grid, stats row con 4 KPIs, obligaciones legales expandibles con toggle Ley 21.719, derechos ARCO expandibles, tabla comparativa Ley 19.628 vs GDPR con panel de impacto al hover de fila, y grid de la Reforma Ley 21.719.',
    corregido: null,
    reflexion: 'Delegar la lectura del .md directamente al asistente funcionó de forma óptima porque el contexto de memoria ya contenía la ruta del archivo y el patrón visual establecido. Un prompt mínimo produjo un componente completo gracias a la memoria acumulada de las fases anteriores.',
    conCorreccion: false,
  },
  {
    num: 'F7',
    titulo: 'Conclusiones y Recomendaciones',
    prompt: 'ejecutemos la fase 7, pero me percate que hay parrafos donde las palabras se separan mucho ( hola         hola) algo asi',
    aceptado: 'La estructura completa: banner teal con dot-grid, stats row con 4 KPIs, 5 conclusiones con hover → panel de análisis, tabs Alta/Media/Largo plazo con tabla interactiva y panel de justificación técnica al hover de fila, reflexión final con stagger y bloque de cierre. Además: fix del bug text-align: justify (text-align-last: left + hyphens: auto + lang="es").',
    corregido: 'Bug visual detectado por el usuario: palabras excesivamente separadas en párrafos justificados. Se corrigió como parte del mismo commit.',
    reflexion: 'Combinar una corrección de bug con la implementación de una nueva fase en un único prompt fue eficiente: el contexto de la sesión ya tenía el patrón visual completo, por lo que el asistente pudo aplicar el fix y construir el componente en la misma pasada sin iteraciones adicionales.',
    conCorreccion: true,
  },
  {
    num: 'F8',
    titulo: 'Bitácora de Uso de IA',
    prompt: 'ejecutas la fase 8, sugiere mejoras si lo concideras optimo y hazme preguntas.',
    aceptado: 'La estructura completa: banner gray con dot-grid, stats row con 4 KPIs (8 fases / 6 sin corrección / 1 herramienta / 64 palabras en el prompt más extenso), acordeón de 8 entradas con header compacto (badge de fase, título, badge estado) y body expandible (blockquote del prompt, qué se aceptó, corrección si hubo, reflexión con borde izquierdo gris).',
    corregido: null,
    reflexion: 'El usuario solicitó sugerencias explícitas antes de ejecutar la fase. Esto permitió acordar el layout (acordeón) y la sección de stats antes de implementar, evitando iteraciones de diseño posteriores. La bitácora se beneficia de ser la última fase: tiene acceso a todos los prompts anteriores como datos completos.',
    conCorreccion: false,
  },
]

export default function Prompts() {
  const [abierta, setAbierta] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto px-4 py-8"
    >
      {/* ── Banner ─────────────────────────────────────────────── */}
      <div
        className="relative rounded-2xl overflow-hidden mb-8 text-white"
        style={{ background: 'linear-gradient(135deg, #1f2937 0%, #374151 60%, #6b7280 100%)' }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0, opacity: 0.12,
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative px-8 py-10">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-white/20 rounded-full px-3 py-1 mb-4">
            Sección 08 · Bitácora de Uso de IA
          </span>
          <h2 className="text-3xl font-bold mb-2">Bitácora de Uso de Inteligencia Artificial</h2>
          <p className="text-gray-300 text-base max-w-2xl">
            Registro completo de los prompts utilizados en las 8 fases del informe.
            Herramienta: <strong className="text-white">Claude Code (claude-sonnet-4-6)</strong> — CLI de Anthropic,
            integrado directamente en el entorno de desarrollo.
          </p>
        </div>
      </div>

      {/* ── Stats row ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 text-center"
          >
            <div className={`text-3xl font-bold mb-1 ${s.color}`}>
              <AnimatedCounter target={s.target} />
            </div>
            {s.sub && (
              <div className="text-xs text-gray-400 font-medium mb-0.5">{s.sub}</div>
            )}
            <div className="text-xs text-gray-500 leading-tight">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* ── Acordeón ───────────────────────────────────────────── */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-1">Registro de prompts por fase</h3>
        <p className="text-sm text-gray-500 mb-5">
          Haz clic en una fase para ver el prompt completo, qué se aceptó y la reflexión sobre el uso de IA.
        </p>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {FASES.map((f, i) => {
            const expandida = abierta === i
            return (
              <motion.div
                key={f.num}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className={`border-b border-gray-100 last:border-b-0 ${expandida ? 'bg-gray-50' : ''}`}
              >
                {/* Header */}
                <button
                  onClick={() => setAbierta(expandida ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors"
                >
                  <span className="shrink-0 text-xs font-bold px-2 py-1 rounded bg-gray-800 text-gray-100 font-mono">
                    {f.num}
                  </span>
                  <span className="flex-1 font-semibold text-gray-800 text-sm">{f.titulo}</span>
                  <span
                    className={`shrink-0 text-xs px-2.5 py-1 rounded-full font-medium border ${
                      f.conCorreccion
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : 'bg-green-100 text-green-800 border-green-300'
                    }`}
                  >
                    {f.conCorreccion ? '↺ Con ajuste' : '✓ Sin corrección'}
                  </span>
                  <span className="shrink-0 text-gray-400 text-xs ml-1">{expandida ? '▲' : '▼'}</span>
                </button>

                {/* Body acordeón */}
                <AnimatePresence initial={false}>
                  {expandida && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="px-5 pb-5 border-t border-gray-200 pt-4 space-y-4">
                        {/* Prompt */}
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Prompt utilizado</p>
                          <blockquote className="bg-gray-50 border-l-4 border-gray-400 px-4 py-3 text-sm text-gray-700 italic rounded-r-lg leading-relaxed">
                            "{f.prompt}"
                          </blockquote>
                        </div>

                        {/* Qué se aceptó */}
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Qué se aceptó</p>
                          <p className="text-sm text-gray-700 leading-relaxed">{f.aceptado}</p>
                        </div>

                        {/* Corrección (solo si hubo) */}
                        {f.corregido && (
                          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                            <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">Qué se corrigió</p>
                            <p className="text-sm text-amber-900 leading-relaxed">{f.corregido}</p>
                          </div>
                        )}

                        {/* Reflexión */}
                        <div className="border-l-4 border-gray-300 pl-4">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Reflexión</p>
                          <p className="text-sm text-gray-600 italic leading-relaxed">{f.reflexion}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ── Reflexión final: agente vs chatbot ─────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.35 }}
        className="rounded-xl border border-gray-300 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)' }}
      >
        <div
          className="px-6 py-3 text-white text-sm font-semibold"
          style={{ background: 'linear-gradient(90deg, #1f2937, #374151)' }}
        >
          Reflexión final — Agente vs chatbot
        </div>
        <div className="px-6 py-5 space-y-5 text-sm text-gray-700">
          <p className="leading-relaxed">
            Durante el desarrollo de este informe se utilizó <strong>Claude Code</strong> en modalidad
            de <strong>agente</strong> (CLI integrado en el entorno de desarrollo), lo que es
            cualitativamente distinto al uso de un <strong>chatbot convencional</strong> como
            Claude.ai o ChatGPT en el navegador.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900 text-gray-100 rounded-xl p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-white mb-3">Agente — Claude Code CLI</p>
              <ul className="space-y-2 text-xs text-gray-300 leading-relaxed">
                <li>• Acceso directo al proyecto: lee y escribe archivos sin intervención manual</li>
                <li>• Ejecuta comandos de terminal autónomamente (build, commit, push)</li>
                <li>• Mantiene memoria persistente entre sesiones</li>
                <li className="text-green-400 font-medium">→ Ideal para implementación multi-archivo</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Chatbot — Claude.ai / ChatGPT</p>
              <ul className="space-y-2 text-xs text-gray-500 leading-relaxed">
                <li>• Sin acceso al proyecto ni a los archivos</li>
                <li>• El usuario copia y pega las respuestas manualmente</li>
                <li>• Sin memoria entre conversaciones</li>
                <li className="text-blue-500 font-medium">→ Útil para dudas conceptuales puntuales</li>
              </ul>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2.5 text-left text-gray-600 font-semibold border-b border-gray-200">Dimensión</th>
                  <th className="px-4 py-2.5 text-center text-gray-600 font-semibold border-b border-gray-200">Agente (Claude Code)</th>
                  <th className="px-4 py-2.5 text-center text-gray-600 font-semibold border-b border-gray-200">Chatbot (navegador)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Acceso al proyecto', 'Directo (lee y escribe archivos)', 'No tiene'],
                  ['Ejecución de comandos', 'Autónoma', 'No aplica'],
                  ['Memoria entre sesiones', 'Sí (archivos persistentes)', 'No'],
                  ['Tipo de tarea ideal', 'Implementación multi-archivo', 'Consultas puntuales'],
                  ['Uso en este informe', 'Fases 1–8 completas', 'No se utilizó'],
                ].map(([dim, agente, chat], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}>
                    <td className="px-4 py-2.5 font-medium text-gray-700 border-b border-gray-100">{dim}</td>
                    <td className="px-4 py-2.5 text-center border-b border-gray-100">
                      <span className="inline-block bg-green-50 text-green-800 border border-green-200 px-2 py-0.5 rounded">{agente}</span>
                    </td>
                    <td className="px-4 py-2.5 text-center border-b border-gray-100">
                      <span className="inline-block bg-gray-50 text-gray-500 border border-gray-200 px-2 py-0.5 rounded">{chat}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="leading-relaxed text-gray-600">
            El uso del agente fue determinante para la coherencia del resultado: la consistencia visual
            entre las 8 secciones, la aplicación uniforme de patrones de código y la ausencia de errores
            en cada fase se explican por la capacidad del agente de leer el estado actual del proyecto
            antes de cada cambio, no solo por la calidad del prompt en aislamiento.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
