import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function AnimatedCounter({ target, prefix = '', suffix = '', duration = 1200 }) {
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
  return <>{prefix}{value.toLocaleString()}{suffix}</>
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.35, ease: 'easeOut' }
  })
}

const NIVEL_STYLE = {
  'Alta':       { badge: 'bg-red-100 text-red-800 border border-red-300',          dot: 'bg-red-500',    matrizBg: 'bg-red-50'     },
  'Media-Alta': { badge: 'bg-orange-100 text-orange-800 border border-orange-300',  dot: 'bg-orange-500', matrizBg: 'bg-orange-50'  },
  'Media':      { badge: 'bg-yellow-100 text-yellow-800 border border-yellow-300',  dot: 'bg-yellow-500', matrizBg: 'bg-yellow-50'  },
  'Baja':       { badge: 'bg-blue-100 text-blue-800 border border-blue-300',        dot: 'bg-blue-500',   matrizBg: 'bg-blue-50'    },
  'Propia':     { badge: 'bg-purple-100 text-purple-700 border border-purple-300',  dot: 'bg-purple-400', matrizBg: 'bg-purple-50'  },
  'N/A':        { badge: 'bg-gray-100 text-gray-500 border border-gray-200',        dot: 'bg-gray-400',   matrizBg: 'bg-gray-50'    },
}

/* ─── Stats ──────────────────────────────────────────────────── */
const STATS = [
  { label: 'Actores analizados',  target: 5,  prefix: '',     suffix: '',    color: 'text-amber-600' },
  { label: 'Delitos imputables',  target: 6,  prefix: '',     suffix: '',    color: 'text-red-600'   },
  { label: 'Daños directos',      target: 10, prefix: 'USD ', suffix: 'M+',  color: 'text-orange-500'},
  { label: 'Condenas firmes',     target: 0,  prefix: '',     suffix: '',    color: 'text-gray-500'  },
]

/* ─── Matriz ─────────────────────────────────────────────────── */
const ACTORES_COL = ['Atacantes', 'Banco de Chile', 'Directivos', 'SWIFT', 'CMF']
const TIPOS_FILA  = ['Penal', 'Civil', 'Administrativa']

const MATRIZ = {
  'Penal':          { 'Atacantes': 'Alta', 'Banco de Chile': 'Baja',       'Directivos': 'Baja',  'SWIFT': 'N/A',    'CMF': 'N/A' },
  'Civil':          { 'Atacantes': 'Alta', 'Banco de Chile': 'Media-Alta', 'Directivos': 'Media', 'SWIFT': 'N/A',    'CMF': 'N/A' },
  'Administrativa': { 'Atacantes': 'N/A',  'Banco de Chile': 'Alta',       'Directivos': 'Media', 'SWIFT': 'Propia', 'CMF': 'N/A' },
}

const TOOLTIP = {
  'Penal-Atacantes':                'Arts. 2, 3, 4, 6, 8, 10 — Ley 21.459',
  'Penal-Banco de Chile':           'Ley 20.393 (personas jurídicas — limitada)',
  'Penal-Directivos':               'Requiere dolo probado — no hay indicios',
  'Civil-Atacantes':                'Arts. 2314 y 2329 Código Civil',
  'Civil-Banco de Chile':           'Arts. 1547 CC + Art. 23 Ley 19.628',
  'Civil-Directivos':               'Art. 133 — Ley de Sociedades Anónimas',
  'Administrativa-Banco de Chile':  'Circular CMF N°3.506 + SWIFT CSP',
  'Administrativa-Directivos':      'Arts. 39 y ss. — Ley General de Bancos',
  'Administrativa-SWIFT':           'SWIFT CSP — auditoría propia a miembros',
}

const COL_HEADER_BG = {
  'Atacantes':     'bg-red-900',
  'Banco de Chile':'bg-blue-900',
  'Directivos':    'bg-orange-900',
  'SWIFT':         'bg-purple-900',
  'CMF':           'bg-gray-700',
}

/* ─── Actores ─────────────────────────────────────────────────── */
const ACTORES = [
  {
    id: 'atacantes',
    nombre: 'Atacantes — presuntamente Grupo Lazarus',
    icono: '⚡',
    colorBg: 'bg-red-900/20', colorBorder: 'border-red-700',
    colorText: 'text-red-300', colorBadge: 'bg-red-500',
    penal: {
      nivel: 'Alta',
      filas: [
        { tipo: 'Acceso ilícito',                  norma: 'Art. 2 Ley 21.459',  desc: 'Ingresaron sin autorización a la red del banco superando controles de seguridad' },
        { tipo: 'Interceptación ilícita',           norma: 'Art. 3 Ley 21.459',  desc: 'Capturaron credenciales SWIFT de los operadores del banco' },
        { tipo: 'Ataque a la integridad',           norma: 'Art. 4 Ley 21.459',  desc: 'Destruyeron el MBR de ~9.000 equipos con el malware KillMBR' },
        { tipo: 'Fraude informático',               norma: 'Art. 6 Ley 21.459',  desc: 'Ejecutaron transferencias SWIFT fraudulentas por USD 10M' },
        { tipo: 'Abuso de dispositivos',            norma: 'Art. 8 Ley 21.459',  desc: 'Utilizaron herramientas de hacking y malware especializado' },
        { tipo: 'Agravante — infra. crítica',       norma: 'Art. 10 Ley 21.459', desc: 'El banco forma parte del sistema financiero crítico nacional' },
      ],
      nota: 'Pena acumulada estimada: presidio mayor grado mínimo a medio (5 años 1 día — 15 años).',
    },
    civil: {
      nivel: 'Alta',
      filas: [
        { tipo: 'Responsabilidad extracontractual', norma: 'Arts. 2314 y 2329 CC', desc: 'Daños al banco y clientes: USD 10M directos + costos de recuperación e imagen' },
      ],
    },
    administrativa: {
      nivel: 'N/A',
      texto: 'No aplica — los atacantes no tienen relación regulatoria con organismos chilenos.',
    },
    obstaculos: [
      'Nunca se estableció identidad judicial de los atacantes.',
      'Operaron desde múltiples jurisdicciones extranjeras.',
      'Chile no era parte del Convenio de Budapest en 2018 — se adhirió en 2023.',
    ],
  },
  {
    id: 'banco',
    nombre: 'Banco de Chile (institución)',
    icono: '🏦',
    colorBg: 'bg-blue-900/20', colorBorder: 'border-blue-700',
    colorText: 'text-blue-300', colorBadge: 'bg-blue-500',
    penal: {
      nivel: 'Baja',
      texto: 'Las personas jurídicas no tienen responsabilidad penal directa bajo Ley 21.459. Podría aplicar Ley 20.393 solo si se probara omisión culpable de un directivo que facilitó el delito.',
    },
    civil: {
      nivel: 'Media-Alta',
      filas: [
        { tipo: 'Responsabilidad contractual',    norma: 'Art. 1547 CC',           desc: 'Incumplimiento de la obligación de custodia segura de fondos y datos de clientes' },
        { tipo: 'Tratamiento de datos',           norma: 'Art. 23 Ley 19.628',     desc: 'Responsabilidad por daños derivados del tratamiento deficiente de datos personales' },
        { tipo: 'Protección al consumidor',       norma: 'Art. 23 Ley 19.496',     desc: 'Acción disponible si clientes sufrieron fondos no disponibles o datos expuestos' },
      ],
    },
    administrativa: {
      nivel: 'Alta',
      filas: [
        { tipo: 'Gestión de riesgo tecnológico',  norma: 'Circular CMF N°3.506',   desc: 'El ataque evidenció ausencias en controles de seguridad exigidos a entidades bancarias' },
        { tipo: 'Controles SWIFT',                norma: 'SWIFT CSP',              desc: 'No tenía implementados todos los controles obligatorios del Customer Security Programme' },
        { tipo: 'Plan de respuesta a incidentes', norma: 'Normativa SBIF',         desc: 'La respuesta fue reactiva; tardó en detectar las transferencias fraudulentas' },
      ],
      nota: 'Consecuencia: multa CMF + plan de mejoras. El banco invirtió decenas de millones en modernización tecnológica.',
    },
  },
  {
    id: 'directivos',
    nombre: 'Directivos y ejecutivos del banco',
    icono: '👔',
    colorBg: 'bg-orange-900/20', colorBorder: 'border-orange-700',
    colorText: 'text-orange-300', colorBadge: 'bg-orange-500',
    penal: {
      nivel: 'Baja',
      texto: 'Requiere probar participación dolosa o complicidad en la omisión de medidas de seguridad. No hay indicios de ello en el caso Banco de Chile.',
    },
    civil: {
      nivel: 'Media',
      filas: [
        { tipo: 'Responsabilidad solidaria',      norma: 'Art. 133 LSA',           desc: 'Directores responden solidariamente ante accionistas por perjuicios causados por negligencia' },
      ],
      nota: 'La pregunta clave: ¿el directorio ignoró señales de alerta de seguridad? De probarse, constituiría negligencia grave.',
    },
    administrativa: {
      nivel: 'Media',
      filas: [
        { tipo: 'Deberes de diligencia',          norma: 'Arts. 39 y ss. LGB',     desc: 'La normativa bancaria establece deberes específicos de diligencia para directores' },
        { tipo: 'Investigación CMF',              norma: 'Ley General de Bancos',  desc: 'Ejecutivos responsables de TI y seguridad podían enfrentar investigación administrativa' },
      ],
    },
  },
  {
    id: 'swift',
    nombre: 'SWIFT — Society for Worldwide Interbank Financial Telecommunication',
    icono: '🌐',
    colorBg: 'bg-purple-900/20', colorBorder: 'border-purple-700',
    colorText: 'text-purple-300', colorBadge: 'bg-purple-500',
    penal: {
      nivel: 'N/A',
      texto: 'Sin responsabilidad penal bajo derecho chileno. SWIFT es una organización internacional con sede en Bélgica, fuera del alcance jurisdiccional de Chile.',
    },
    civil: {
      nivel: 'N/A',
      texto: 'Sin responsabilidad civil bajo derecho chileno. Su alcance se limita a la relación contractual con los bancos miembros, regida por derecho belga.',
    },
    administrativa: {
      nivel: 'Propia',
      texto: 'SWIFT reforzó sus controles post-incidente y aceleró la implementación obligatoria del CSP para todos los miembros. Los bancos son responsables de los controles; SWIFT puede auditar y suspender el acceso a quienes no cumplan.',
    },
  },
  {
    id: 'cmf',
    nombre: 'CMF — Comisión para el Mercado Financiero',
    icono: '🏛️',
    colorBg: 'bg-gray-800/40', colorBorder: 'border-gray-600',
    colorText: 'text-gray-300', colorBadge: 'bg-gray-500',
    penal: {
      nivel: 'N/A',
      texto: 'Ninguna responsabilidad penal directa. La CMF actúa como regulador, no como parte activa del incidente.',
    },
    civil: {
      nivel: 'N/A',
      texto: 'Sin responsabilidad civil directa. Se podría argumentar que la regulación era insuficiente en 2018, pero la CMF no puede ser demandada civilmente por ello.',
    },
    administrativa: {
      nivel: 'N/A',
      texto: 'El caso impulsó reformas regulatorias significativas. La CMF actuó como supervisora y sancionadora del banco, no como responsable del incidente.',
    },
  },
]

const RESUMEN = [
  { actor: 'Atacantes (Lazarus)',  penal: 'Alta',       civil: 'Alta',       adm: 'N/A'    },
  { actor: 'Banco de Chile',       penal: 'Baja',       civil: 'Media-Alta', adm: 'Alta'   },
  { actor: 'Directivos del banco', penal: 'Baja',       civil: 'Media',      adm: 'Media'  },
  { actor: 'SWIFT',                penal: 'N/A',        civil: 'N/A',        adm: 'Propia' },
  { actor: 'CMF',                  penal: 'N/A',        civil: 'N/A',        adm: 'N/A'    },
]

function NivelBadge({ nivel }) {
  const st = NIVEL_STYLE[nivel]
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${st.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${st.dot}`} />
      {nivel}
    </span>
  )
}

function TablaDetail({ filas }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700">
      <table className="w-full text-xs border-collapse min-w-[400px]">
        <thead>
          <tr>
            <th className="text-left p-2.5 bg-gray-800 text-gray-200 rounded-tl-lg w-36">Tipo</th>
            <th className="text-left p-2.5 bg-gray-800 text-gray-200 w-40">Norma</th>
            <th className="text-left p-2.5 bg-gray-800 text-gray-200 rounded-tr-lg">Descripción</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {filas.map((f, i) => (
            <tr key={i} className="bg-gray-900/50">
              <td className="p-2.5 text-white font-medium">{f.tipo}</td>
              <td className="p-2.5 text-amber-300 font-mono text-xs">{f.norma}</td>
              <td className="p-2.5 text-gray-300">{f.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════ */
export default function Responsabilidades() {
  const [actorAbierto, setActorAbierto] = useState(null)
  const [notaAbierta,  setNotaAbierta]  = useState(false)
  const [hoveredCell,  setHoveredCell]  = useState(null)

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── Banner amber ── */}
      <div className="relative bg-gradient-to-br from-amber-950 via-amber-900 to-gray-900 rounded-2xl overflow-hidden mb-10 p-7 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-widest text-amber-300 mb-1">Sección 05 · Criterio 2.1.4</p>
          <h1 className="text-3xl font-bold mb-1">Responsabilidades Legales</h1>
          <p className="text-amber-200">Actores identificados — responsabilidades penales, civiles y administrativas según derecho chileno</p>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm"
          >
            <p className={`text-2xl font-bold ${s.color}`}>
              <AnimatedCounter target={s.target} prefix={s.prefix} suffix={s.suffix} />
            </p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* ── Matriz ── */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-700 mb-1">Matriz de responsabilidades</h2>
        <p className="text-sm text-gray-500 mb-5">Hover sobre cada celda para ver la norma aplicable</p>

        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm border-collapse min-w-[580px]">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-800 text-white rounded-tl-xl w-32">Tipo</th>
                {ACTORES_COL.map((actor, i) => (
                  <th
                    key={actor}
                    className={`p-3 text-white text-center text-xs font-semibold ${COL_HEADER_BG[actor]} ${i === ACTORES_COL.length - 1 ? 'rounded-tr-xl' : ''}`}
                  >
                    {actor}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {TIPOS_FILA.map((tipo) => (
                <tr key={tipo}>
                  <td className="p-3 font-semibold text-gray-700 bg-gray-50 text-sm">{tipo}</td>
                  {ACTORES_COL.map((actor) => {
                    const nivel = MATRIZ[tipo][actor]
                    const st    = NIVEL_STYLE[nivel]
                    const key   = `${tipo}-${actor}`
                    const tip   = TOOLTIP[key]
                    return (
                      <td
                        key={actor}
                        className={`p-2 text-center relative ${st.matrizBg}`}
                        onMouseEnter={() => setHoveredCell(key)}
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold cursor-default ${st.badge}`}>
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${st.dot}`} />
                          {nivel}
                        </span>
                        <AnimatePresence>
                          {hoveredCell === key && tip && (
                            <motion.div
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 4 }}
                              transition={{ duration: 0.15 }}
                              className="absolute z-20 left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl pointer-events-none"
                            >
                              <p className="text-gray-300 leading-snug">{tip}</p>
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Leyenda */}
        <div className="flex flex-wrap gap-2 mt-3">
          {Object.entries(NIVEL_STYLE).map(([nivel, st]) => (
            <span key={nivel} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${st.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
              {nivel}
            </span>
          ))}
        </div>
      </section>

      {/* ── Actor cards ── */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-700 mb-1">Análisis por actor</h2>
        <p className="text-sm text-gray-500 mb-5">Selecciona un actor para ver el detalle de sus responsabilidades</p>

        <div className="space-y-3">
          {ACTORES.map((actor, i) => {
            const abierto = actorAbierto === actor.id
            return (
              <motion.div
                key={actor.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className={`border rounded-xl overflow-hidden ${actor.colorBorder} ${actor.colorBg}`}
              >
                {/* Header */}
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                  onClick={() => setActorAbierto(abierto ? null : actor.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-9 h-9 rounded-full ${actor.colorBadge} flex items-center justify-center text-white text-base shrink-0`}>
                      {actor.icono}
                    </span>
                    <div>
                      <p className="font-semibold text-white text-sm leading-tight">{actor.nombre}</p>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {[
                          { label: 'Penal',  nivel: actor.penal.nivel  },
                          { label: 'Civil',  nivel: actor.civil.nivel  },
                          { label: 'Adm.',   nivel: actor.administrativa.nivel },
                        ].map(({ label, nivel }) => (
                          <span key={label} className={`text-xs px-1.5 py-0.5 rounded border ${NIVEL_STYLE[nivel].badge}`}>
                            {label}: {nivel}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <motion.span
                    animate={{ rotate: abierto ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`text-lg shrink-0 ml-4 ${actor.colorText}`}
                  >
                    ▾
                  </motion.span>
                </button>

                {/* Contenido expandible */}
                <AnimatePresence initial={false}>
                  {abierto && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 space-y-5 bg-gray-950/40">

                        {/* Obstáculos prácticos — solo atacantes */}
                        {actor.obstaculos && (
                          <div className="bg-amber-900/30 border border-amber-700 rounded-xl p-4">
                            <p className="text-xs uppercase tracking-widest text-amber-300 mb-2.5 font-semibold">⚠ Obstáculos prácticos</p>
                            <ul className="space-y-2">
                              {actor.obstaculos.map((o, oi) => (
                                <li key={oi} className="flex gap-2 text-sm text-amber-100">
                                  <span className="text-amber-400 shrink-0 mt-0.5">·</span>{o}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Penal */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Responsabilidad penal</p>
                            <NivelBadge nivel={actor.penal.nivel} />
                          </div>
                          {actor.penal.filas
                            ? <TablaDetail filas={actor.penal.filas} />
                            : <p className="text-sm text-gray-300 bg-gray-900/50 rounded-lg px-4 py-3">{actor.penal.texto}</p>
                          }
                          {actor.penal.nota && (
                            <p className="text-xs text-amber-300 mt-2 italic">{actor.penal.nota}</p>
                          )}
                        </div>

                        {/* Civil */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Responsabilidad civil</p>
                            <NivelBadge nivel={actor.civil.nivel} />
                          </div>
                          {actor.civil.filas
                            ? <TablaDetail filas={actor.civil.filas} />
                            : <p className="text-sm text-gray-300 bg-gray-900/50 rounded-lg px-4 py-3">{actor.civil.texto}</p>
                          }
                          {actor.civil.nota && (
                            <p className="text-xs text-amber-300 mt-2 italic">{actor.civil.nota}</p>
                          )}
                        </div>

                        {/* Administrativa */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Responsabilidad administrativa</p>
                            <NivelBadge nivel={actor.administrativa.nivel} />
                          </div>
                          {actor.administrativa.filas
                            ? <TablaDetail filas={actor.administrativa.filas} />
                            : <p className="text-sm text-gray-300 bg-gray-900/50 rounded-lg px-4 py-3">{actor.administrativa.texto}</p>
                          }
                          {actor.administrativa.nota && (
                            <p className="text-xs text-amber-300 mt-2 italic">{actor.administrativa.nota}</p>
                          )}
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ── Tabla resumen ── */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Resumen de responsabilidades</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm border-collapse min-w-[500px]">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-800 text-white rounded-tl-xl">Actor</th>
                <th className="p-3 bg-red-900 text-white text-center">Penal</th>
                <th className="p-3 bg-blue-900 text-white text-center">Civil</th>
                <th className="p-3 bg-amber-900 text-white text-center rounded-tr-xl">Administrativa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {RESUMEN.map((fila, i) => (
                <motion.tr
                  key={i}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="hover:bg-gray-50"
                >
                  <td className="p-3 font-medium text-gray-700 bg-gray-50">{fila.actor}</td>
                  {[fila.penal, fila.civil, fila.adm].map((nivel, ni) => (
                    <td key={ni} className="p-3 text-center">
                      <NivelBadge nivel={nivel} />
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Nota legal colapsable ── */}
      <section>
        <button
          className="w-full flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-left hover:bg-amber-100 transition-colors"
          onClick={() => setNotaAbierta(!notaAbierta)}
        >
          <p className="text-amber-700 font-semibold text-sm">
            Nota legal — Ley 20.393: responsabilidad penal de personas jurídicas
          </p>
          <motion.span
            animate={{ rotate: notaAbierta ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-amber-600 shrink-0 ml-4"
          >
            ▾
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {notaAbierta && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="bg-amber-50 border border-t-0 border-amber-200 rounded-b-xl px-5 py-4">
                <p className="text-sm text-amber-900 leading-relaxed">
                  La <strong>Ley 20.393</strong> establece la responsabilidad penal de personas jurídicas respecto de ciertos delitos. En el caso del Banco de Chile, podría aplicar si se probara una <em>omisión culpable de un directivo</em> que facilitó el delito — por ejemplo, ignorar advertencias de seguridad reiteradas. Sin embargo, la carga de la prueba es alta y no existen indicios públicos de tal conducta. En la práctica, la vía administrativa (CMF) resultó más efectiva y ágil que la persecución penal.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

    </motion.div>
  )
}
