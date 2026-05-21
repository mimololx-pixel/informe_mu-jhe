import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Contador animado ──────────────────────────────────────────── */
function AnimatedCounter({ target, prefix = '', sufijo = '', duracion = 1200 }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let frame, start = null
    const tick = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duracion, 1)
      setVal(Math.floor(p * target))
      if (p < 1) frame = requestAnimationFrame(tick)
      else setVal(target)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duracion])
  return <>{prefix}{val}{sufijo}</>
}

/* ─── Variantes Framer Motion ──────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.35, ease: 'easeOut' }
  })
}

/* ─── Datos del diagrama de ataque ─────────────────────────────── */
const PASOS = [
  { id: 1, label: 'Infiltración',   sub: 'Phishing / vulnerabilidad', bg: 'bg-slate-700 border-slate-500' },
  { id: 2, label: 'Mov. lateral',   sub: 'Acceso a credenciales SWIFT', bg: 'bg-yellow-800 border-yellow-600' },
  { id: 3, label: 'Activación',     sub: '24 mayo — amanecer', bg: 'bg-orange-800 border-orange-500' },
]
const RAMAS = [
  { label: 'KillMBR',     sub: '~9.000 equipos destruidos', bg: 'bg-red-800 border-red-600',  icono: '⚠' },
  { label: 'SWIFT Fraud', sub: 'USD 10M transferidos',      bg: 'bg-rose-900 border-rose-700', icono: '⟶$' },
]

/* ─── Entidades clave ───────────────────────────────────────────── */
const ENTIDADES = [
  {
    logo: '/logos/banco_chile.svg',
    nombre: 'Banco de Chile',
    rol: 'Víctima principal',
    desc: 'Entidad financiera afectada. Responsable de proteger activos y datos de clientes.',
    badgeColor: 'bg-red-100 text-red-700',
    accentBorder: 'border-l-4 border-red-400',
    headerBg: 'bg-red-50',
    logoBg: 'bg-white',
  },
  {
    logo: '/logos/cmf.png',
    nombre: 'CMF',
    rol: 'Organismo regulador',
    desc: 'Comisión para el Mercado Financiero (ex-SBIF). Investigó y sancionó al banco.',
    badgeColor: 'bg-green-100 text-green-700',
    accentBorder: 'border-l-4 border-green-500',
    headerBg: 'bg-green-50',
    logoBg: 'bg-white',
  },
  {
    logo: '/logos/swift.svg',
    nombre: 'SWIFT',
    rol: 'Red comprometida',
    desc: 'Sistema global de mensajería financiera. Canal usado para las transferencias fraudulentas.',
    badgeColor: 'bg-orange-100 text-orange-700',
    accentBorder: 'border-l-4 border-orange-400',
    headerBg: 'bg-orange-50',
    logoBg: 'bg-white',
  },
]

/* ─── Íconos de impacto (px absolutos — evita rem scaling) ──────── */
const ICONOS_IMPACTO = {
  'Financiero': (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"
      style={{ width: '20px', height: '20px', flexShrink: 0, marginTop: '2px' }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  'Operacional': (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"
      style={{ width: '20px', height: '20px', flexShrink: 0, marginTop: '2px' }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  'Reputacional': (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"
      style={{ width: '20px', height: '20px', flexShrink: 0, marginTop: '2px' }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  'Regulatorio': (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"
      style={{ width: '20px', height: '20px', flexShrink: 0, marginTop: '2px' }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  ),
  'Datos personales': (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"
      style={{ width: '20px', height: '20px', flexShrink: 0, marginTop: '2px' }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
}

/* ─── Datos KPIs ────────────────────────────────────────────────── */
const KPIS = [
  { target: 10, prefix: 'USD $', sufijo: 'M', label: 'Pérdida total', sub: 'monto transferido fraudulentamente', bg: 'bg-red-900', light: 'text-red-300' },
  { target: 6,  prefix: 'USD $', sufijo: 'M', label: 'Sin recuperar', sub: 'fondos no restituidos al banco',      bg: 'bg-red-700', light: 'text-red-200' },
  { target: 9000, prefix: '~', sufijo: '', label: 'Equipos', sub: 'destruidos por KillMBR',                      bg: 'bg-orange-800', light: 'text-orange-200' },
  { target: 2, prefix: '', sufijo: '', label: 'Vectores',  sub: 'KillMBR y SWIFT simultáneos',                   bg: 'bg-blue-900',   light: 'text-blue-200' },
]

/* ─── Datos extendidos para timeline ────────────────────────────── */
const TIMELINE = [
  {
    date: 'Semanas antes',
    event: 'Infiltración inicial a la red interna del banco (posiblemente via phishing o vulnerabilidad).',
    sistema: 'Active Directory / servidores internos',
    tecnica: 'Spear-phishing o explotación de vulnerabilidad; establecimiento de acceso persistente (APT).',
    consecuencia: 'Los atacantes obtuvieron un punto de apoyo silencioso desde el cual mapear la red y recopilar credenciales SWIFT.',
  },
  {
    date: '24 mayo 2018 — Mañana',
    event: 'Activación simultánea del malware KillMBR en ~9.000 equipos. Colapso operativo masivo.',
    sistema: '~9.000 estaciones de trabajo del banco',
    tecnica: 'KillMBR sobrescribe el Master Boot Record; los equipos quedan completamente inoperativos al reiniciar.',
    consecuencia: 'Colapso operativo masivo. El banco destina todos sus recursos humanos y técnicos a responder al incidente visible, lo que es exactamente lo que los atacantes buscaban.',
  },
  {
    date: '24 mayo — Durante la crisis',
    event: 'Ejecución de transferencias SWIFT fraudulentas hacia cuentas en Hong Kong y Madrid.',
    sistema: 'Plataforma SWIFT del banco',
    tecnica: 'Uso de credenciales SWIFT legítimas robadas previamente. Los mensajes SWIFT enviados eran técnicamente auténticos.',
    consecuencia: 'USD 10 millones transferidos. El caos del KillMBR impidió la detección oportuna.',
  },
  {
    date: '24–25 mayo 2018',
    event: 'Banco detecta las transferencias. Coordinación con bancos corresponsales para bloquear fondos.',
    sistema: 'Sistemas de monitoreo y comunicación interbancaria',
    tecnica: 'Análisis forense de urgencia e intercepción coordinada con corresponsales en el exterior.',
    consecuencia: 'Recuperación parcial estimada en ~USD 4M. Aproximadamente USD 6M no fueron restituidos.',
  },
  {
    date: 'Semanas siguientes',
    event: 'CMF inicia investigación formal. Empresas de ciberseguridad analizan el malware.',
    sistema: 'Organismos regulatorios y firmas forenses',
    tecnica: 'Análisis de muestra del malware KillMBR, revisión de logs y vectores de entrada.',
    consecuencia: 'Atribución informal al Grupo Lazarus (Corea del Norte). Ninguna acusación formal fue presentada.',
  },
  {
    date: '2018–2019',
    event: 'CMF impone multas y exige mejoras en controles de ciberseguridad. Atribución informal al Grupo Lazarus.',
    sistema: 'Proceso regulatorio CMF',
    tecnica: 'Auditoría de cumplimiento SWIFT CSP y Circular CMF N°3.506.',
    consecuencia: 'El banco invirtió decenas de millones en modernización tecnológica. El caso impulsó reformas regulatorias en ciberseguridad financiera en Chile.',
  },
]

/* ─── Datos extendidos para impactos (tabs) ─────────────────────── */
const IMPACTOS = [
  {
    tipo: 'Financiero',
    desc: 'USD 10 millones transferidos fraudulentamente (~USD 6M no recuperados)',
    color: 'bg-red-100 border-red-400 text-red-800',
    tabColor: 'bg-red-700 text-white',
    tabInactivo: 'bg-white text-red-700 border border-red-300 hover:bg-red-50',
    detalle: [
      'USD 10M transferidos vía SWIFT hacia cuentas en Hong Kong y Madrid.',
      '~USD 6M no fueron recuperados ni restituidos al banco.',
      'Costos adicionales: recuperación tecnológica, consultores forenses, honorarios legales y comunicaciones de crisis.',
      'Impacto en el precio de la acción en bolsa chilena.',
    ],
  },
  {
    tipo: 'Operacional',
    desc: '~9.000 equipos inutilizados; suspensión parcial de servicios por días',
    color: 'bg-orange-100 border-orange-400 text-orange-800',
    tabColor: 'bg-orange-600 text-white',
    tabInactivo: 'bg-white text-orange-700 border border-orange-300 hover:bg-orange-50',
    detalle: [
      '~9.000 estaciones de trabajo destruidas por el malware KillMBR.',
      'Reinstalación o reemplazo masivo de hardware y software en todas las sucursales afectadas.',
      'Servicios bancarios básicos degradados durante días; algunos servicios digitales suspendidos temporalmente.',
      'Operación completa con personal reducido mientras se recuperaba la infraestructura.',
    ],
  },
  {
    tipo: 'Reputacional',
    desc: 'Cobertura mediática masiva; desconfianza de clientes y accionistas',
    color: 'bg-yellow-100 border-yellow-400 text-yellow-800',
    tabColor: 'bg-yellow-600 text-white',
    tabInactivo: 'bg-white text-yellow-700 border border-yellow-300 hover:bg-yellow-50',
    detalle: [
      'Cobertura mediática masiva en Chile, Latinoamérica y medios financieros internacionales.',
      'Desconfianza de clientes, particularmente corporativos e institucionales, respecto a la seguridad del banco.',
      'Comunicaciones públicas de crisis por parte de la gerencia y el directorio.',
      'Atribución informal a Grupo Lazarus elevó el perfil internacional del incidente, amplificando el daño reputacional.',
    ],
  },
  {
    tipo: 'Regulatorio',
    desc: 'Investigación y multa de la CMF; exigencia de mejoras en ciberseguridad',
    color: 'bg-blue-100 border-blue-400 text-blue-800',
    tabColor: 'bg-blue-700 text-white',
    tabInactivo: 'bg-white text-blue-700 border border-blue-300 hover:bg-blue-50',
    detalle: [
      'Investigación formal y multa impuesta por la CMF (ex-SBIF).',
      'Exigencia de cumplimiento total del Customer Security Programme (CSP) de SWIFT.',
      'Plan obligatorio de mejoras en controles de ciberseguridad bajo Circular CMF N°3.506.',
      'El caso fue uno de los detonantes del proceso de actualización del marco regulatorio de ciberseguridad financiera en Chile.',
    ],
  },
  {
    tipo: 'Datos personales',
    desc: 'Posible exposición de datos de clientes en sistemas comprometidos',
    color: 'bg-purple-100 border-purple-400 text-purple-800',
    tabColor: 'bg-purple-700 text-white',
    tabInactivo: 'bg-white text-purple-700 border border-purple-300 hover:bg-purple-50',
    detalle: [
      'Datos de empleados del banco comprometidos vía Active Directory (RUT, cargos, credenciales).',
      'Datos de clientes en estaciones de trabajo del área bancaria potencialmente expuestos.',
      'Datos de transferencias internacionales SWIFT accedidos por los atacantes.',
      'La Ley 19.628 no exigía notificación a los titulares en 2018; la mayoría de clientes no supo si sus datos fueron comprometidos.',
    ],
  },
]

/* ─── Datos extendidos para actores ─────────────────────────────── */
const ACTORES_TABLE = [
  {
    actor: 'Atacantes (Grupo Lazarus)',
    rol: 'Autores del ataque; ejecutaron el KillMBR y las transferencias SWIFT',
    detalle: 'Presuntamente vinculados al gobierno de Corea del Norte. Nunca identificados judicialmente. Usaron técnicas APT avanzadas: spear-phishing, movimiento lateral, uso de credenciales legítimas. La atribución al Grupo Lazarus fue realizada por firmas privadas (Trend Micro, BAE Systems) pero no fue establecida formalmente por ningún organismo judicial.',
  },
  {
    actor: 'Banco de Chile',
    rol: 'Víctima principal; responsable de proteger activos y datos de clientes',
    detalle: 'Entidad financiera más grande de Chile al momento del ataque. Tenía implementados controles de seguridad básicos pero no cumplía plenamente con el SWIFT CSP. El ataque evidenció deficiencias en la detección de amenazas persistentes avanzadas (APT) y en la segmentación de redes internas.',
  },
  {
    actor: 'Red SWIFT',
    rol: 'Canal financiero internacional utilizado para las transferencias fraudulentas',
    detalle: 'SWIFT no fue hackeada directamente; los atacantes usaron credenciales legítimas del banco para enviar mensajes SWIFT auténticos. Post-incidente, SWIFT aceleró la implementación obligatoria del CSP para todos los miembros y reforzó sus controles de monitoreo.',
  },
  {
    actor: 'Bancos corresponsales',
    rol: 'Receptores intermediarios en Hong Kong y Madrid',
    detalle: 'Los fondos fueron transferidos a cuentas en instituciones de Hong Kong y Madrid. La coordinación internacional permitió bloquear parte de los fondos. Los corresponsales actuaron de buena fe al recibir mensajes SWIFT que parecían legítimos.',
  },
  {
    actor: 'CMF (ex-SBIF)',
    rol: 'Organismo regulador; investigó y sancionó al banco',
    detalle: 'La Comisión para el Mercado Financiero (que sucedió a la SBIF) inició una investigación formal, impuso multas al banco y exigió un plan obligatorio de mejoras en ciberseguridad. El caso fue determinante para la posterior actualización de la Circular N°3.506 sobre riesgo tecnológico en entidades financieras.',
  },
]

/* ═══════════════════════════════════════════════════════════════ */
export default function Resumen() {
  const [pasoAbierto, setPasoAbierto]   = useState(null)
  const [tabImpacto, setTabImpacto]     = useState('Financiero')
  const [actorAbierto, setActorAbierto] = useState(null)

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── Banner oscuro de portada ── */}
      <div className="relative bg-gradient-to-br from-gray-900 via-blue-950 to-gray-800 rounded-2xl overflow-hidden mb-10 p-8 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-widest text-blue-300 mb-2">TI3034 · Evaluación Sumativa N°2 · INACAP Valparaíso</p>
          <h1 className="text-4xl font-bold mb-1">Banco de Chile</h1>
          <p className="text-xl text-blue-200 mb-6">Ataque SWIFT + KillMBR — Mayo 2018</p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-red-500/30 border border-red-400/50 text-red-200 text-sm px-3 py-1 rounded-full">USD ~6M robados</span>
            <span className="bg-orange-500/30 border border-orange-400/50 text-orange-200 text-sm px-3 py-1 rounded-full">~9.000 equipos</span>
            <span className="bg-purple-500/30 border border-purple-400/50 text-purple-200 text-sm px-3 py-1 rounded-full">Grupo Lazarus</span>
            <span className="bg-blue-500/30 border border-blue-400/50 text-blue-200 text-sm px-3 py-1 rounded-full">24 mayo 2018</span>
          </div>
        </div>
      </div>

      {/* ── KPIs animados ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {KPIS.map((k, i) => (
          <motion.div
            key={k.label}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -4, boxShadow: '0 12px 28px rgba(0,0,0,0.25)' }}
            className={`${k.bg} text-white rounded-xl p-5 cursor-default`}
          >
            <p className={`text-3xl font-bold mb-1 ${k.light}`}>
              <AnimatedCounter target={k.target} prefix={k.prefix} sufijo={k.sufijo} duracion={1200} />
            </p>
            <p className="text-sm font-semibold">{k.label}</p>
            <p className={`text-xs mt-0.5 ${k.light} opacity-80`}>{k.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* ── Diagrama vector de ataque ── */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Vector de ataque</h2>
        <div className="bg-gray-900 rounded-2xl p-6 text-white overflow-x-auto">

          {/* Cadena principal (3 pasos) */}
          <div className="flex items-center gap-2 mb-4 min-w-max">
            {PASOS.map((paso, i) => (
              <div key={paso.id} className="flex items-center gap-2">
                <motion.div
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className={`border ${paso.bg} rounded-lg px-4 py-3 min-w-[130px]`}
                >
                  <p className="text-xs text-gray-400 mb-0.5">Paso {paso.id}</p>
                  <p className="font-semibold text-sm">{paso.label}</p>
                  <p className="text-xs text-gray-300 mt-0.5">{paso.sub}</p>
                </motion.div>
                {i < PASOS.length - 1 && (
                  <span className="text-gray-500 text-xl font-light shrink-0">→</span>
                )}
              </div>
            ))}

            {/* Conector hacia las ramas */}
            <span className="text-gray-500 text-xl font-light shrink-0">→</span>

            {/* Bifurcación */}
            <div className="flex flex-col gap-2">
              {RAMAS.map((rama, i) => (
                <motion.div
                  key={rama.label}
                  custom={i + 3}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className={`border ${rama.bg} rounded-lg px-4 py-3 min-w-[160px]`}
                >
                  <p className="text-sm font-bold">{rama.label}</p>
                  <p className="text-xs text-gray-300 mt-0.5">{rama.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <p className="text-xs text-gray-500">
            El KillMBR actuó como distractor: mientras el personal respondía al colapso operativo,
            las transferencias SWIFT fraudulentas se ejecutaron sin ser detectadas a tiempo.
          </p>
        </div>
      </section>

      {/* ── Entidades clave con logos ── */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Entidades clave</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ENTIDADES.map((e, i) => (
            <motion.div
              key={e.nombre}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -3, boxShadow: '0 8px 20px rgba(0,0,0,0.10)' }}
              className={`bg-white rounded-xl overflow-hidden ${e.accentBorder} shadow-sm cursor-default`}
            >
              <div className={`${e.headerBg} px-4 py-4 flex items-center justify-center`} style={{ minHeight: '80px' }}>
                <div className={`${e.logoBg} rounded-lg shadow-sm px-3 py-2 flex items-center justify-center`} style={{ maxWidth: '160px' }}>
                  <img
                    src={e.logo}
                    alt={e.nombre}
                    style={{ maxHeight: '44px', maxWidth: '140px', objectFit: 'contain', display: 'block' }}
                  />
                </div>
              </div>
              <div className="px-4 py-3">
                <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${e.badgeColor}`}>
                  {e.rol}
                </span>
                <p className="text-sm text-gray-600">{e.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── ¿Qué ocurrió? ── */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">¿Qué ocurrió?</h2>
        <p className="text-gray-600 leading-relaxed">
          En mayo de 2018, el Banco de Chile sufrió uno de los ciberataques más sofisticados registrados
          en el sistema financiero latinoamericano. El ataque combinó dos vectores simultáneos: la
          destrucción masiva de infraestructura interna mediante el malware <strong>KillMBR</strong>
          (que sobrescribía el Master Boot Record dejando los equipos inoperativos) y la ejecución de{' '}
          <strong>transferencias fraudulentas por la red SWIFT</strong> hacia cuentas en Hong Kong y Madrid,
          totalizando aproximadamente USD 10 millones.
        </p>
        <p className="text-gray-600 leading-relaxed mt-3">
          Las investigaciones de firmas de ciberseguridad apuntaron al <strong>Grupo Lazarus</strong>,
          vinculado al gobierno de Corea del Norte, aunque nunca se estableció responsabilidad penal
          formal. Los atacantes explotaron el caos operativo generado por el KillMBR para ejecutar las
          transferencias sin ser detectados a tiempo.
        </p>
      </section>

      {/* ── Impactos (tabs) ── */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Impacto del incidente</h2>
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {IMPACTOS.map((imp) => (
            <button
              key={imp.tipo}
              onClick={() => setTabImpacto(imp.tipo)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                tabImpacto === imp.tipo ? imp.tabColor : imp.tabInactivo
              }`}
            >
              {ICONOS_IMPACTO[imp.tipo]}
              {imp.tipo}
            </button>
          ))}
        </div>
        {/* Contenido de la tab activa */}
        <AnimatePresence mode="wait">
          {IMPACTOS.filter((i) => i.tipo === tabImpacto).map((imp) => (
            <motion.div
              key={imp.tipo}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className={`border-l-4 rounded-r-xl p-5 ${imp.color}`}
            >
              <p className="font-semibold mb-3">{imp.tipo}: {imp.desc}</p>
              <ul className="space-y-2">
                {imp.detalle.map((d, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <span className="shrink-0 mt-0.5">·</span>
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      {/* ── Línea de tiempo (acordeón) ── */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-1">Línea de tiempo</h2>
        <p className="text-sm text-gray-500 mb-4">Haz click en cada evento para ver el sistema afectado, la técnica y la consecuencia.</p>
        <div className="relative border-l-2 border-gray-300 pl-6 space-y-3">
          {TIMELINE.map((item, idx) => {
            const abierto = pasoAbierto === idx
            return (
              <motion.div
                key={idx}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="relative"
              >
                <div className={`absolute -left-[31px] top-3 w-4 h-4 rounded-full border-2 border-white transition-colors ${abierto ? 'bg-blue-700' : 'bg-blue-400'}`} />
                <button
                  onClick={() => setPasoAbierto(abierto ? null : idx)}
                  className={`w-full text-left rounded-xl px-4 py-3 transition-colors ${abierto ? 'bg-blue-50 border border-blue-200' : 'bg-white border border-gray-200 hover:bg-gray-50'}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{item.date}</p>
                      <p className="text-gray-700 mt-0.5 text-sm">{item.event}</p>
                    </div>
                    <motion.span
                      animate={{ rotate: abierto ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-400 text-xs shrink-0"
                    >▼</motion.span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {abierto && (
                    <motion.div
                      key="timeline-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="bg-blue-50 border border-t-0 border-blue-200 rounded-b-xl px-4 py-3 grid sm:grid-cols-3 gap-3">
                        <div>
                          <p className="text-xs font-semibold text-blue-600 uppercase mb-1">Sistema afectado</p>
                          <p className="text-xs text-gray-700">{item.sistema}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-blue-600 uppercase mb-1">Técnica usada</p>
                          <p className="text-xs text-gray-700">{item.tecnica}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-blue-600 uppercase mb-1">Consecuencia</p>
                          <p className="text-xs text-gray-700">{item.consecuencia}</p>
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

      {/* ── Actores (cards expandibles) ── */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-1">Actores involucrados</h2>
        <p className="text-sm text-gray-500 mb-4">Haz click para ver el detalle del rol de cada actor en el incidente.</p>
        <div className="space-y-2">
          {ACTORES_TABLE.map((item, i) => {
            const abierto = actorAbierto === i
            return (
              <motion.div
                key={item.actor}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setActorAbierto(abierto ? null : i)}
                  className="w-full text-left px-4 py-3 flex items-center justify-between gap-3 hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{item.actor}</p>
                    <p className="text-xs text-gray-500">{item.rol}</p>
                  </div>
                  <motion.span
                    animate={{ rotate: abierto ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-400 text-xs shrink-0"
                  >▼</motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {abierto && (
                    <motion.div
                      key="actor-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-gray-50">
                        <p className="text-sm text-gray-600">{item.detalle}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </section>
    </motion.div>
  )
}
