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
    transition: { delay: i * 0.08, duration: 0.35, ease: 'easeOut' },
  }),
}

const STATS = [
  { label: 'Categorías de datos comprometidas', target: 5,  prefix: '',     suffix: '',  color: 'text-purple-700' },
  { label: 'Derechos ARCO afectados',           target: 4,  prefix: '',     suffix: '',  color: 'text-purple-600' },
  { label: 'Obligaciones legales en riesgo',    target: 4,  prefix: '',     suffix: '',  color: 'text-purple-500' },
  { label: 'Años hasta la reforma (→2024)',      target: 6,  prefix: '',     suffix: '',  color: 'text-gray-500'   },
]

const SISTEMAS = [
  { sistema: 'Estaciones de trabajo (área bancaria)',   datos: 'Documentos con datos de clientes y registros de transacciones' },
  { sistema: 'Servidores de operaciones',               datos: 'Historial de transacciones, saldos y cuentas' },
  { sistema: 'Sistema SWIFT',                          datos: 'Datos de transferencias internacionales' },
  { sistema: 'Active Directory / directorio corporativo', datos: 'Datos de empleados: RUT, cargo y credenciales' },
]

const CATEGORIAS = [
  { cat: 'Identificación',      ejemplos: 'RUT, nombre completo, fecha de nacimiento' },
  { cat: 'Contacto',            ejemplos: 'Dirección, teléfono, correo electrónico' },
  { cat: 'Situación económica', ejemplos: 'Saldos, deudas, historial de crédito, ingresos' },
  { cat: 'Transaccional',       ejemplos: 'Historial de movimientos bancarios y transferencias' },
  { cat: 'Laboral',             ejemplos: 'Datos de empleados del banco en sistemas internos' },
]

const OBLIGACIONES = [
  {
    nombre: 'Deber de custodia y seguridad',
    norma: 'Art. 11 Ley 19.628',
    cita: '"El responsable de los datos personales deberá cuidar de ellos con la debida diligencia, haciéndose responsable de los daños."',
    situacion: 'El ataque evidenció deficiencias críticas de seguridad en los sistemas del banco.',
    estado: 'Incumplida',
  },
  {
    nombre: 'Uso solo para la finalidad declarada',
    norma: 'Art. 9 Ley 19.628',
    cita: 'Los datos deben usarse solo para el fin que motivó su recopilación.',
    situacion: 'Los atacantes usaron los datos para fines no consentidos (fraude y robo). El banco debe garantizar que terceros no accedan.',
    estado: 'Vulnerada',
  },
  {
    nombre: 'Confidencialidad',
    norma: 'Art. 7 Ley 19.628',
    cita: 'El responsable y quienes intervengan en el tratamiento deben guardar secreto de los datos.',
    situacion: 'El deber de confidencialidad fue vulnerado de facto por el acceso no autorizado a los sistemas.',
    estado: 'Vulnerada',
  },
  {
    nombre: 'Notificación a los titulares',
    norma: 'Vacío legal en 2018',
    cita: 'La Ley 19.628 vigente en 2018 no exigía notificación obligatoria de brechas a los titulares.',
    situacion: 'Hoy la normativa CMF sí lo exige para entidades financieras. La Ley 21.719 lo extiende a todos los responsables.',
    estado: 'Vacío legal',
  },
]

const ESTADO_STYLE = {
  'Incumplida':  'bg-red-100 text-red-800 border border-red-300',
  'Vulnerada':   'bg-orange-100 text-orange-800 border border-orange-300',
  'Vacío legal': 'bg-gray-100 text-gray-600 border border-gray-300',
}

const ARCO = [
  {
    letra: 'A',
    nombre: 'Acceso',
    descripcion: 'Derecho a conocer qué datos tiene el banco sobre los titulares.',
    relevancia: 'Los clientes tenían derecho a saber qué datos fueron comprometidos, pero el banco no estaba obligado legalmente a notificarles la brecha.',
    bg: 'bg-purple-50',
    border: 'border-purple-300',
    lBg: 'bg-purple-600',
  },
  {
    letra: 'R',
    nombre: 'Rectificación',
    descripcion: 'Derecho a corregir datos inexactos o incompletos.',
    relevancia: 'Si el ataque alteró o corrompió registros bancarios, los clientes podían exigir la corrección de sus datos personales.',
    bg: 'bg-purple-50',
    border: 'border-purple-300',
    lBg: 'bg-purple-500',
  },
  {
    letra: 'C',
    nombre: 'Cancelación',
    descripcion: 'Derecho a eliminar datos cuando ya no son necesarios para la finalidad original.',
    relevancia: 'No directamente aplicable al ataque, pero relevante al tratamiento posterior de los datos comprometidos por terceros.',
    bg: 'bg-purple-50',
    border: 'border-purple-300',
    lBg: 'bg-purple-400',
  },
  {
    letra: 'O',
    nombre: 'Oposición',
    descripcion: 'Derecho a oponerse al tratamiento de datos en determinadas circunstancias.',
    relevancia: 'Los clientes podían oponerse a que sus datos se usaran más allá del contrato bancario original, incluyendo el tratamiento fraudulento.',
    bg: 'bg-purple-50',
    border: 'border-purple-300',
    lBg: 'bg-violet-600',
  },
]

const GDPR_ROWS = [
  { aspecto: 'Notificación de brecha', chile: 'No obligatoria (2018)', gdpr: 'Obligatoria en 72 h — Arts. 33-34', favorGDPR: true },
  { aspecto: 'Multas por incumplimiento', chile: 'Históricamente bajas / inexistentes', gdpr: 'Hasta 4% facturación anual global', favorGDPR: true },
  { aspecto: 'Principio de minimización de datos', chile: 'No explícito en 2018', gdpr: 'Sí — Art. 5 GDPR', favorGDPR: true },
  { aspecto: 'Derecho al olvido', chile: 'No contemplado en 2018', gdpr: 'Sí — Art. 17 GDPR', favorGDPR: true },
  { aspecto: 'Análisis de impacto (DPIA)', chile: 'No exigido en 2018', gdpr: 'Obligatorio para tratamientos de alto riesgo — Art. 35', favorGDPR: true },
]

const REFORMA_ITEMS = [
  { icono: '📢', texto: 'Notificación obligatoria de brechas de datos a los titulares' },
  { icono: '⚖️', texto: 'Multas proporcionales al daño causado' },
  { icono: '🏛️', texto: 'Consejo para la Transparencia con nuevas atribuciones sancionatorias' },
  { icono: '🔑', texto: 'Derechos ampliados: portabilidad y eliminación de datos' },
]

export default function Datos() {
  const [arcoAbierto, setArcoAbierto] = useState(null)
  const [oblAbierta, setOblAbierta] = useState(null)

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
        style={{ background: 'linear-gradient(135deg, #581c87 0%, #7c3aed 60%, #a855f7 100%)' }}
      >
        {/* dot-grid */}
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
            Sección 06 · Criterio 2.1.5
          </span>
          <h2 className="text-3xl font-bold mb-2">Tratamiento de Datos Personales</h2>
          <p className="text-purple-100 text-base max-w-2xl">
            Análisis del caso Banco de Chile (2018) bajo la <strong>Ley N°19.628</strong> sobre
            Protección de la Vida Privada — derechos vulnerados, obligaciones incumplidas y
            comparación con el estándar GDPR.
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
              <AnimatedCounter target={s.target} prefix={s.prefix} suffix={s.suffix} />
            </div>
            <div className="text-xs text-gray-500 leading-tight">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* ── Sección 1 & 2: Datos comprometidos ─────────────────── */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-gray-800 mb-1">Datos personales en riesgo</h3>
        <p className="text-sm text-gray-500 mb-5">
          Art. 2 Ley 19.628 — sistemas comprometidos y categorías de datos afectadas.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Sistemas */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 bg-purple-800 text-white text-sm font-semibold">
              Sistemas comprometidos
            </div>
            <table className="w-full text-sm">
              <tbody>
                {SISTEMAS.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-purple-50/40'}>
                    <td className="px-4 py-3 font-medium text-gray-700 w-2/5 border-b border-gray-100">{row.sistema}</td>
                    <td className="px-4 py-3 text-gray-600 border-b border-gray-100">{row.datos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Categorías */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 bg-purple-700 text-white text-sm font-semibold">
              Categorías de datos personales
            </div>
            <table className="w-full text-sm">
              <tbody>
                {CATEGORIAS.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-purple-50/40'}>
                    <td className="px-4 py-3 w-2/5 border-b border-gray-100">
                      <span className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                        {row.cat}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs border-b border-gray-100">{row.ejemplos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 bg-purple-50 border border-purple-200 rounded-xl px-5 py-4 text-sm text-purple-900">
          <span className="font-semibold">Nota — datos sensibles (Art. 2):</span> Los datos
          económicos y financieros no se clasifican formalmente como "sensibles" bajo la Ley 19.628,
          pero sí tienen protección reforzada por el secreto bancario (Art. 154 DFL N°3).
        </div>
      </div>

      {/* ── Sección 3: Obligaciones del banco ──────────────────── */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-gray-800 mb-1">El banco como responsable del tratamiento</h3>
        <p className="text-sm text-gray-500 mb-5">
          Obligaciones del Art. 2 Ley 19.628 — situación al momento del ataque.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {OBLIGACIONES.map((ob, i) => {
            const abierta = oblAbierta === i
            return (
              <motion.div
                key={ob.nombre}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOblAbierta(abierta ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-start justify-between gap-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold text-gray-800 text-sm">{ob.nombre}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ESTADO_STYLE[ob.estado]}`}>
                        {ob.estado}
                      </span>
                    </div>
                    <span className="text-xs text-purple-600 font-mono">{ob.norma}</span>
                  </div>
                  <span className="text-gray-400 text-xs shrink-0 mt-1">{abierta ? '▲' : '▼'}</span>
                </button>

                <AnimatePresence initial={false}>
                  {abierta && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="px-5 pb-5 border-t border-gray-100">
                        <blockquote className="bg-purple-50 border-l-4 border-purple-400 px-4 py-3 my-3 text-sm text-purple-900 italic rounded-r-lg">
                          {ob.cita}
                        </blockquote>
                        <p className="text-sm text-gray-600">{ob.situacion}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ── Sección 4: Derechos ARCO ────────────────────────────── */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-gray-800 mb-1">Derechos ARCO de los titulares</h3>
        <p className="text-sm text-gray-500 mb-2">
          Derechos de los clientes bajo la Ley 19.628 y su relevancia en el caso.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 text-sm text-amber-900 mb-5">
          <span className="font-semibold">Problema práctico (2018):</span> Los mecanismos para ejercer
          derechos ARCO eran débiles. El banco no estaba obligado a notificar la brecha, por lo que la
          mayoría de clientes desconoció si sus datos habían sido comprometidos.
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {ARCO.map((d, i) => {
            const abierto = arcoAbierto === i
            return (
              <motion.div
                key={d.letra}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className={`rounded-xl border ${d.border} shadow-sm overflow-hidden`}
                style={{ backgroundColor: '#faf5ff' }}
              >
                <button
                  onClick={() => setArcoAbierto(abierto ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-purple-50 transition-colors"
                >
                  <div
                    className="shrink-0 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ width: '44px', height: '44px', backgroundColor: '#7c3aed' }}
                  >
                    {d.letra}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{d.nombre}</div>
                    <div className="text-xs text-gray-500">{d.descripcion}</div>
                  </div>
                  <span className="text-gray-400 text-xs">{abierto ? '▲' : '▼'}</span>
                </button>

                <AnimatePresence initial={false}>
                  {abierto && (
                    <motion.div
                      key="arco-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="px-5 pb-5 border-t border-purple-200">
                        <p className="text-sm text-gray-700 mt-3">
                          <span className="font-semibold text-purple-700">Relevancia en el caso: </span>
                          {d.relevancia}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ── Sección 5 + 6: Secreto bancario + Comparación ──────── */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {/* Secreto bancario */}
        <div className="md:col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col">
          <div
            className="rounded-lg px-4 py-2 text-white text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ background: 'linear-gradient(90deg, #581c87, #7c3aed)' }}
          >
            Secreto bancario
          </div>
          <p className="text-sm text-gray-600 mb-3">
            El <span className="font-semibold">Art. 154 DFL N°3</span> (Ley General de Bancos)
            establece que los bancos no pueden revelar las cuentas y depósitos de sus clientes a
            terceros, salvo excepciones legales.
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-800 mt-auto">
            El ataque violó indirectamente este secreto al comprometer los sistemas que contenían
            esa información sensible.
          </div>
        </div>

        {/* Comparación GDPR */}
        <div className="md:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 text-white text-sm font-semibold" style={{ background: 'linear-gradient(90deg, #3730a3, #7c3aed)' }}>
            Comparación: Ley 19.628 (Chile 2018) vs. GDPR (UE 2018)
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2.5 text-left text-gray-600 font-semibold border-b border-gray-200">Aspecto</th>
                  <th className="px-4 py-2.5 text-center text-blue-700 font-semibold border-b border-gray-200">Chile 2018</th>
                  <th className="px-4 py-2.5 text-center text-indigo-700 font-semibold border-b border-gray-200">GDPR (UE)</th>
                </tr>
              </thead>
              <tbody>
                {GDPR_ROWS.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}>
                    <td className="px-4 py-2.5 font-medium text-gray-700 border-b border-gray-100">{row.aspecto}</td>
                    <td className="px-4 py-2.5 text-center border-b border-gray-100">
                      <span className="inline-block bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded text-xs">
                        {row.chile}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-center border-b border-gray-100">
                      <span className="inline-block bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded text-xs">
                        {row.gdpr}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Sección 7: Reforma Ley 21.719 ──────────────────────── */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-1">Reforma en curso: Ley 21.719 (2024)</h3>
        <p className="text-sm text-gray-500 mb-5">
          El incidente del Banco de Chile fue uno de los casos que impulsó la reforma de la Ley 19.628.
        </p>

        <div className="bg-white rounded-xl border border-purple-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 text-white text-sm font-semibold flex items-center gap-2" style={{ background: 'linear-gradient(90deg, #7c3aed, #a855f7)' }}>
            <span>Ley 21.719 — aprobada 2024, en período de implementación</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 p-5">
            {REFORMA_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="flex items-start gap-3 bg-purple-50 border border-purple-100 rounded-xl p-4"
              >
                <span className="text-xl shrink-0">{item.icono}</span>
                <span className="text-sm text-purple-900">{item.texto}</span>
              </motion.div>
            ))}
          </div>
          <div className="px-5 pb-5">
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-5 py-4 text-sm text-indigo-900">
              <span className="font-semibold">Objetivo:</span> Acercar el marco chileno al estándar
              GDPR, cerrando las brechas críticas que el ataque de 2018 puso en evidencia — especialmente
              la ausencia de notificación obligatoria y multas efectivas.
            </div>
          </div>
        </div>
      </div>

      {/* ── Conclusión ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.35 }}
        className="rounded-xl border border-purple-300 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)' }}
      >
        <div className="px-6 py-3 text-white text-sm font-semibold" style={{ background: 'linear-gradient(90deg, #581c87, #7c3aed)' }}>
          Conclusión — Criterio 2.1.5
        </div>
        <div className="px-6 py-5 text-sm text-purple-900 leading-relaxed">
          El ataque al Banco de Chile puso en evidencia las <strong>brechas críticas</strong> de la
          Ley 19.628 en contextos de ciberseguridad financiera: ausencia de notificación obligatoria,
          multas insuficientes y falta de mecanismos de enforcement. Los datos personales de millones
          de clientes estuvieron en riesgo sin que la ley vigente obligara al banco a informarles.
          La reforma (Ley 21.719, 2024) busca cerrar estas brechas acercando el marco chileno al
          estándar GDPR.
        </div>
      </motion.div>
    </motion.div>
  )
}
