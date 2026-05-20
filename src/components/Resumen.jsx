import { motion } from 'framer-motion'

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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.35, ease: 'easeOut' }
  })
}

const ENTIDADES = [
  {
    logo: '/logos/banco_chile.svg',
    nombre: 'Banco de Chile',
    rol: 'Víctima principal',
    desc: 'Entidad financiera atacada',
    accent: 'border-blue-200',
  },
  {
    logo: '/logos/cmf.png',
    nombre: 'CMF',
    rol: 'Organismo regulador',
    desc: 'Comisión para el Mercado Financiero (ex-SBIF)',
    accent: 'border-green-200',
  },
  {
    logo: '/logos/swift.svg',
    nombre: 'SWIFT',
    rol: 'Red comprometida',
    desc: 'Canal de transferencias internacionales utilizado',
    accent: 'border-orange-200',
  },
]

export default function Resumen() {
  const timeline = [
    { date: 'Semanas antes', event: 'Infiltración inicial a la red interna del banco (posiblemente via phishing o vulnerabilidad)' },
    { date: '24 mayo 2018 — Mañana', event: 'Activación simultánea del malware KillMBR en ~9.000 equipos. Colapso operativo masivo.' },
    { date: '24 mayo 2018 — Durante crisis', event: 'Ejecución de transferencias SWIFT fraudulentas hacia cuentas en Hong Kong y Madrid.' },
    { date: '24–25 mayo 2018', event: 'Banco detecta las transferencias. Coordinación con bancos corresponsales para bloquear fondos.' },
    { date: 'Semanas siguientes', event: 'CMF inicia investigación formal. Empresas de ciberseguridad analizan el malware.' },
    { date: '2018–2019', event: 'CMF impone multas y exige mejoras en controles de ciberseguridad. Atribución informal al Grupo Lazarus.' },
  ]

  const impactos = [
    { tipo: 'Financiero',      desc: 'USD 10 millones transferidos fraudulentamente (~USD 6M no recuperados)', color: 'bg-red-100 border-red-400 text-red-800' },
    { tipo: 'Operacional',     desc: '~9.000 equipos inutilizados; suspensión parcial de servicios por días',   color: 'bg-orange-100 border-orange-400 text-orange-800' },
    { tipo: 'Reputacional',    desc: 'Cobertura mediática masiva; desconfianza de clientes y accionistas',       color: 'bg-yellow-100 border-yellow-400 text-yellow-800' },
    { tipo: 'Regulatorio',     desc: 'Investigación y multa de la CMF; exigencia de mejoras en ciberseguridad', color: 'bg-blue-100 border-blue-400 text-blue-800' },
    { tipo: 'Datos personales',desc: 'Posible exposición de datos de clientes en sistemas comprometidos',        color: 'bg-purple-100 border-purple-400 text-purple-800' },
  ]

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Banner oscuro de portada */}
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

      {/* Ficha del caso — 3 stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div
          custom={0} variants={cardVariants} initial="hidden" animate="visible"
          whileHover={{ y: -4, boxShadow: '0 12px 28px rgba(0,0,0,0.18)' }}
          className="bg-blue-900 text-white rounded-xl p-5 cursor-default"
        >
          <p className="text-xs uppercase tracking-widest text-blue-300 mb-1">Fecha del ataque</p>
          <p className="text-xl font-semibold">24 mayo 2018</p>
        </motion.div>
        <motion.div
          custom={1} variants={cardVariants} initial="hidden" animate="visible"
          whileHover={{ y: -4, boxShadow: '0 12px 28px rgba(0,0,0,0.18)' }}
          className="bg-blue-900 text-white rounded-xl p-5 cursor-default"
        >
          <p className="text-xs uppercase tracking-widest text-blue-300 mb-1">Vectores</p>
          <p className="text-xl font-semibold">KillMBR + SWIFT</p>
        </motion.div>
        <motion.div
          custom={2} variants={cardVariants} initial="hidden" animate="visible"
          whileHover={{ y: -4, boxShadow: '0 12px 28px rgba(0,0,0,0.18)' }}
          className="bg-red-700 text-white rounded-xl p-5 cursor-default"
        >
          <p className="text-xs uppercase tracking-widest text-red-200 mb-1">Pérdida estimada</p>
          <p className="text-xl font-semibold">USD ~6M (neto)</p>
        </motion.div>
      </div>

      {/* Entidades clave con logos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {ENTIDADES.map((e, i) => (
          <motion.div
            key={e.nombre}
            custom={i + 3}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -3, boxShadow: '0 8px 20px rgba(0,0,0,0.10)' }}
            className={`bg-white border-2 ${e.accent} rounded-xl p-4 flex flex-col items-center text-center cursor-default`}
          >
            <div className="h-12 flex items-center justify-center mb-3">
              <img
                src={e.logo}
                alt={e.nombre}
                style={{ maxHeight: '48px', maxWidth: '140px', objectFit: 'contain' }}
              />
            </div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-0.5">{e.rol}</p>
            <p className="text-sm text-gray-500">{e.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Descripción */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">¿Qué ocurrió?</h2>
        <p className="text-gray-600 leading-relaxed">
          En mayo de 2018, el Banco de Chile sufrió uno de los ciberataques más sofisticados registrados en el sistema
          financiero latinoamericano. El ataque combinó dos vectores simultáneos: la destrucción masiva de infraestructura
          interna mediante el malware <strong>KillMBR</strong> (que sobrescribía el Master Boot Record de los equipos
          dejándolos inoperativos) y la ejecución de <strong>transferencias fraudulentas por la red SWIFT</strong> hacia
          cuentas en Hong Kong y Madrid, totalizando aproximadamente USD 10 millones.
        </p>
        <p className="text-gray-600 leading-relaxed mt-3">
          Las investigaciones de firmas de ciberseguridad apuntaron al <strong>Grupo Lazarus</strong>, vinculado al
          gobierno de Corea del Norte, aunque nunca se estableció responsabilidad penal formal. Los atacantes explotaron
          el caos operativo generado por el KillMBR para ejecutar las transferencias sin ser detectados a tiempo.
        </p>
      </section>

      {/* Impactos */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Impacto del incidente</h2>
        <div className="space-y-3">
          {impactos.map((item, i) => (
            <motion.div
              key={item.tipo}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ x: 4 }}
              className={`border-l-4 rounded-r-lg p-4 flex items-start gap-3 ${item.color}`}
            >
              {ICONOS_IMPACTO[item.tipo]}
              <span><span className="font-semibold">{item.tipo}:</span> {item.desc}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Línea de tiempo */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Línea de tiempo</h2>
        <div className="relative border-l-2 border-gray-300 pl-6 space-y-6">
          {timeline.map((item, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-600 border-2 border-white"></div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{item.date}</p>
              <p className="text-gray-700 mt-1">{item.event}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Actores */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Actores involucrados</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="text-left p-3 rounded-tl-lg">Actor</th>
                <th className="text-left p-3 rounded-tr-lg">Rol en el incidente</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                ['Atacantes (Grupo Lazarus)', 'Autores del ataque; ejecutaron el KillMBR y las transferencias SWIFT'],
                ['Banco de Chile', 'Víctima principal; responsable de la protección de activos y datos de clientes'],
                ['Red SWIFT', 'Canal financiero internacional utilizado para las transferencias fraudulentas'],
                ['Bancos corresponsales', 'Receptores intermediarios en Hong Kong y Madrid'],
                ['CMF (ex-SBIF)', 'Organismo regulador; investigó y sancionó al banco'],
              ].map(([actor, rol]) => (
                <tr key={actor} className="hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-800">{actor}</td>
                  <td className="p-3 text-gray-600">{rol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </motion.div>
  )
}
