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
  { label: 'Conclusiones del análisis', target: 5, color: 'text-teal-700' },
  { label: 'Recomendaciones de seguridad', target: 12, color: 'text-teal-600' },
  { label: 'Años de evolución normativa (2018→2026)', target: 8, color: 'text-teal-500' },
  { label: 'Leyes modernizadas desde el ataque', target: 3, color: 'text-gray-500' },
]

const CONCLUSIONES = [
  {
    num: '01',
    titulo: 'Ley 19.223 era insuficiente',
    resumen: 'Diseñada en 1993, no contemplaba la escala ni los vectores del ataque moderno.',
    detalle: 'La Ley 19.223 fue concebida en una era tecnológica completamente diferente. No contemplaba ataques a infraestructura financiera crítica, fraudes mediante redes internacionales como SWIFT ni la escala de los incidentes modernos. La normativa penal no fue el principal instrumento de respuesta; lo fue la regulación administrativa de la CMF.',
    norma: 'Ley 19.223 (1993)',
    badge: 'Superada',
    badgeColor: 'bg-red-100 text-red-800 border border-red-300',
  },
  {
    num: '02',
    titulo: 'Ley 21.459 habría sido más efectiva',
    resumen: 'Tipificación precisa, agravantes para infraestructura crítica y Convenio de Budapest.',
    detalle: 'Si el ataque ocurriera hoy, la Ley 21.459 proporcionaría tipificación precisa del fraude informático (Art. 6) y el ataque a sistemas (Art. 4), agravantes específicas para infraestructura crítica (Art. 10), base para cooperación internacional mediante el Convenio de Budapest y penas sustancialmente más severas.',
    norma: 'Ley 21.459 (2022)',
    badge: 'Vigente',
    badgeColor: 'bg-green-100 text-green-800 border border-green-300',
  },
  {
    num: '03',
    titulo: 'Brechas críticas en datos personales',
    resumen: 'Sin notificación obligatoria, sin multas efectivas, sin enforcement real.',
    detalle: 'La Ley 19.628 no exigía notificación de brechas, no contemplaba multas significativas y carecía de mecanismos de enforcement efectivos. Millones de clientes no supieron si sus datos fueron comprometidos. La reforma en curso (Ley 21.719) busca cerrar estas brechas.',
    norma: 'Ley 19.628 (1999)',
    badge: 'En reforma',
    badgeColor: 'bg-amber-100 text-amber-800 border border-amber-300',
  },
  {
    num: '04',
    titulo: 'Regulación bancaria fue el instrumento real',
    resumen: 'La CMF —no los tribunales penales— exigió cuentas al banco.',
    detalle: 'Fue la CMF —no los tribunales penales— quien exigió cuentas al banco. Esto refleja que, en ausencia de legislación penal sólida, la regulación sectorial actúa como sustituto imperfecto. El caso aceleró la modernización regulatoria del sector financiero.',
    norma: 'CMF / DFL N°3',
    badge: 'Efectiva',
    badgeColor: 'bg-blue-100 text-blue-800 border border-blue-300',
  },
  {
    num: '05',
    titulo: 'Atribución técnica: obstáculo principal',
    resumen: 'Sin capacidad forense digital, ninguna ley penal puede ser plenamente efectiva.',
    detalle: 'Sin capacidad de atribuir judicialmente el ataque, ninguna legislación penal puede ser efectiva. Chile necesita invertir en capacidades forenses digitales y en cooperación internacional para cerrar este vacío. La atribución informal al Grupo Lazarus nunca fue establecida judicialmente.',
    norma: 'Vacío procesal',
    badge: 'Pendiente',
    badgeColor: 'bg-gray-100 text-gray-600 border border-gray-300',
  },
]

const TABS = ['Alta prioridad', 'Media', 'Largo plazo']

const RECOMENDACIONES = {
  'Alta prioridad': [
    { rec: 'Segmentación de redes SWIFT', just: 'Aislar la red SWIFT de la red corporativa elimina el vector principal del ataque. La comunicación entre ambas redes fue el camino que los atacantes recorrieron para llegar al sistema de transferencias internacionales.' },
    { rec: 'Autenticación multifactor para SWIFT', just: 'Impide el uso de credenciales robadas para ejecutar transferencias. Sin MFA, obtener un usuario y contraseña es suficiente para ordenar pagos millonarios desde cualquier equipo comprometido.' },
    { rec: 'Monitoreo de comportamiento anómalo en transacciones', just: 'Detecta patrones inusuales en tiempo real antes de que los fondos salgan. Un sistema de alertas habría identificado la cantidad y los destinos inusuales de las transferencias SWIFT antes de su confirmación.' },
    { rec: 'Plan de respuesta a incidentes documentado y ensayado', just: 'La respuesta lenta del banco amplificó el daño; un runbook reduce el tiempo de reacción. Las horas perdidas coordinando sin protocolo definido permitieron que más fondos salieran hacia Hong Kong y Madrid.' },
    { rec: 'Backups offline e inmutables del MBR y datos críticos', just: 'Limita el impacto de ataques KillMBR al permitir recuperación rápida. Sin backups accesibles, los ~9.000 equipos inutilizados requirieron reinstalación manual, inmovilizando la operación del banco por días.' },
  ],
  'Media': [
    { rec: 'Programa de concientización en phishing', just: 'El acceso inicial probablemente ocurrió por ingeniería social. Los atacantes del Grupo Lazarus son conocidos por spear-phishing altamente dirigido a empleados bancarios con acceso a sistemas críticos.' },
    { rec: 'Gestión de vulnerabilidades con parches prioritizados', just: 'Los atacantes explotan vulnerabilidades conocidas sin parchear. El movimiento lateral aprovechó sistemas sin actualizar, lo que habría sido mitigable con un programa sistemático de patch management.' },
    { rec: 'Auditorías regulares de acceso privilegiado', just: 'Detiene la escalada de privilegios que permitió la instalación del malware. Cuentas con más permisos de los necesarios (principio de mínimo privilegio) fueron el mecanismo que permitió desplegar KillMBR a escala.' },
    { rec: 'Cumplimiento integral del SWIFT Customer Security Programme', just: 'Los controles obligatorios del CSP habrían dificultado el ataque. El SWIFT CSP define controles técnicos específicos para proteger los entornos de mensajería; el banco no los tenía todos implementados al momento del ataque.' },
  ],
  'Largo plazo': [
    { rec: 'Adoptar un marco Zero Trust', just: 'Asume que cualquier red interna puede estar comprometida. En un modelo Zero Trust, el movimiento lateral dentro de la red bancaria habría requerido autenticación continua en cada segmento, dificultando la propagación del malware.' },
    { rec: 'Seguro de ciberseguridad', just: 'Transfiere parte del riesgo financiero residual. Los USD 10 millones robados y los costos de recuperación (estimados en ~USD 6M) podrían haber sido parcialmente cubiertos por un ciberseguro adaptado al perfil del banco.' },
    { rec: 'Participación en grupos ISAC financiero', just: 'Compartir inteligencia de amenazas con otros bancos habría permitido detectar indicadores de compromiso del Grupo Lazarus antes del ataque. El ISAC bancario latinoamericano ya difundía alertas sobre este grupo.' },
  ],
}

const REFLEXION = [
  'Los ejecutivos no priorizan la ciberseguridad como riesgo estratégico',
  'La regulación no exige estándares mínimos efectivos',
  'Los equipos de respuesta no están entrenados y coordinados',
]

export default function Conclusiones() {
  const [hovConcl, setHovConcl] = useState(null)
  const [tabActiva, setTabActiva] = useState('Alta prioridad')
  const [hovRec, setHovRec] = useState(null)

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
        style={{ background: 'linear-gradient(135deg, #134e4a 0%, #0f766e 60%, #14b8a6 100%)' }}
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
            Sección 07 · Conclusiones y Recomendaciones
          </span>
          <h2 className="text-3xl font-bold mb-2">Conclusiones y Recomendaciones</h2>
          <p className="text-teal-100 text-base max-w-2xl">
            Síntesis del análisis legal del caso Banco de Chile (2018): brechas normativas, lecciones
            aprendidas y recomendaciones de seguridad priorizadas para infraestructura financiera crítica.
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
            <div className="text-xs text-gray-500 leading-tight">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* ── Síntesis del análisis ──────────────────────────────── */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-gray-800 mb-1">Síntesis del análisis legal</h3>
        <p className="text-sm text-gray-500 mb-5">
          Cinco conclusiones derivadas del análisis de los marcos normativos aplicables al caso.
          Pasa el mouse sobre una conclusión para ver el análisis completo.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {CONCLUSIONES.map((c, i) => (
            <motion.div
              key={c.num}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              onMouseEnter={() => setHovConcl(i)}
              onMouseLeave={() => setHovConcl(null)}
              className={`bg-white rounded-xl border-2 shadow-sm p-5 cursor-default transition-all ${
                hovConcl === i ? 'border-teal-400 shadow-teal-100' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start gap-3 mb-2">
                <span className="text-2xl font-black text-teal-200 shrink-0 leading-none">{c.num}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-semibold text-gray-800 text-sm">{c.titulo}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.badgeColor}`}>
                      {c.badge}
                    </span>
                  </div>
                  <span className="text-xs text-teal-600 font-mono">{c.norma}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{c.resumen}</p>
            </motion.div>
          ))}
        </div>

        {/* Panel de detalle al hover */}
        <AnimatePresence>
          {hovConcl !== null && (
            <motion.div
              key={hovConcl}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              style={{ overflow: 'hidden' }}
              className="mt-3 border border-teal-200 rounded-xl bg-teal-50 px-6 py-4"
            >
              <p className="text-xs font-semibold text-teal-700 mb-1">
                Conclusión {CONCLUSIONES[hovConcl].num} — {CONCLUSIONES[hovConcl].titulo}
              </p>
              <p className="text-sm text-teal-900 leading-relaxed">{CONCLUSIONES[hovConcl].detalle}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Recomendaciones ────────────────────────────────────── */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-gray-800 mb-1">Recomendaciones de seguridad</h3>
        <p className="text-sm text-gray-500 mb-4">
          12 recomendaciones organizadas por nivel de prioridad. Pasa el mouse sobre una fila para ver la justificación técnica.
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => { setTabActiva(tab); setHovRec(null) }}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                tabActiva === tab
                  ? 'bg-teal-700 text-white border-teal-700'
                  : 'bg-white text-teal-700 border-teal-300 hover:border-teal-500'
              }`}
            >
              {tab}
              <span className="ml-2 text-xs opacity-70">({RECOMENDACIONES[tab].length})</span>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={tabActiva}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-teal-700 text-white">
                    <th className="px-5 py-3 text-left font-semibold w-12">#</th>
                    <th className="px-5 py-3 text-left font-semibold">Recomendación</th>
                  </tr>
                </thead>
                <tbody>
                  {RECOMENDACIONES[tabActiva].map((r, i) => {
                    const sel = hovRec === i
                    return (
                      <tr
                        key={i}
                        onMouseEnter={() => setHovRec(i)}
                        onMouseLeave={() => setHovRec(null)}
                        className={`cursor-default transition-colors ${
                          sel ? 'bg-teal-50' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'
                        }`}
                      >
                        <td className="px-5 py-3 text-teal-600 font-mono text-xs font-bold border-b border-gray-100">
                          {String(i + 1).padStart(2, '0')}
                        </td>
                        <td className="px-5 py-3 text-gray-700 font-medium border-b border-gray-100">
                          <span className="flex items-center gap-1">
                            {sel && <span className="text-teal-500 text-xs">▶</span>}
                            {r.rec}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </motion.div>
          </AnimatePresence>

          {/* Panel de justificación */}
          <AnimatePresence>
            {hovRec !== null && RECOMENDACIONES[tabActiva][hovRec] && (
              <motion.div
                key={`${tabActiva}-${hovRec}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22 }}
                style={{ overflow: 'hidden' }}
                className="border-t border-teal-200 bg-teal-50 px-5 py-4"
              >
                <p className="text-xs font-semibold text-teal-700 mb-1">
                  Justificación — {RECOMENDACIONES[tabActiva][hovRec].rec}
                </p>
                <p className="text-xs text-teal-900 leading-relaxed">
                  {RECOMENDACIONES[tabActiva][hovRec].just}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Reflexión final ─────────────────────────────────────── */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Reflexión final</h3>
        <div className="bg-white rounded-xl border border-teal-200 shadow-sm overflow-hidden">
          <div
            className="px-6 py-4 text-white text-sm font-semibold"
            style={{ background: 'linear-gradient(90deg, #134e4a, #0f766e)' }}
          >
            El caso Banco de Chile enseña que la ciberseguridad no es solo un problema técnico
          </div>
          <div className="px-6 py-5">
            <p className="text-sm text-gray-600 mb-4">
              Un banco puede tener la mejor tecnología del mercado y aun así ser vulnerado si:
            </p>
            <div className="space-y-3 mb-5">
              {REFLEXION.map((punto, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-xl px-4 py-3"
                >
                  <span className="text-teal-500 font-bold text-sm shrink-0">✗</span>
                  <span className="text-sm text-teal-900">{punto}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              La evolución del marco normativo chileno desde 2018 —
              <span className="font-semibold text-teal-700"> Ley 21.459</span>,
              <span className="font-semibold text-teal-700"> Ley Marco de Ciberseguridad 21.663</span>,
              <span className="font-semibold text-teal-700"> adhesión al Convenio de Budapest</span> —
              muestra que los incidentes de alto impacto sí generan cambios legislativos. El desafío
              es que la ley no llegue siempre tarde al siguiente ataque.
            </p>
          </div>
        </div>
      </div>

      {/* ── Cierre ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.35 }}
        className="rounded-xl border border-teal-300 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)' }}
      >
        <div
          className="px-6 py-3 text-white text-sm font-semibold"
          style={{ background: 'linear-gradient(90deg, #134e4a, #0f766e)' }}
        >
          Síntesis — Sección 07
        </div>
        <div className="px-6 py-5 text-sm text-teal-900 leading-relaxed">
          El caso del Banco de Chile en 2018 fue un punto de inflexión para la ciberseguridad y el
          derecho informático en Chile. Evidenció simultáneamente las limitaciones de la Ley 19.223,
          las brechas de la Ley 19.628 y la ausencia de un marco moderno de ciberseguridad nacional.
          Ocho años después, los tres vacíos han sido parcialmente abordados. La pregunta pendiente no
          es si el marco legal evolucionó, sino si lo hizo con suficiente profundidad para responder
          al siguiente ataque de escala equivalente o mayor.
        </div>
      </motion.div>
    </motion.div>
  )
}
