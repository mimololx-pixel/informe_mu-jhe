import { motion } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.35, ease: 'easeOut' }
  })
}

/* ─── Eje 1: Por industria ──────────────────────────────────────── */
const EJE1_FILAS = [
  { dim: 'Organismo regulador',             banca: 'CMF (ex-SBIF)',                  salud: 'MINSAL',                        telecom: 'SUBTEL' },
  { dim: 'Marco de ciberseguridad',         banca: 'Circular CMF N°3.506 + SBIF',    salud: 'Ley 19.628 + circulares MINSAL', telecom: 'Ley 18.168 (LGT)' },
  { dim: 'Notificación de incidentes',      banca: 'Sí, ante CMF en plazo breve',    salud: 'Limitada, sin plazos claros',    telecom: 'Sí, ante SUBTEL para graves' },
  { dim: 'Sanciones administrativas',       banca: 'Multas cuantiosas + revocación', salud: 'Multas menores + cierre',        telecom: 'Multas + suspensión concesión' },
  { dim: 'Gestión de riesgo tecnológico',   banca: 'Obligatoria, regulada en detalle', salud: 'No específicamente regulada',  telecom: 'Básica — continuidad servicio' },
  { dim: 'Estándares de referencia',        banca: 'ISO 27001, NIST, Basilea III, SWIFT CSP', salud: 'ISO 27799, HL7',        telecom: 'ETSI, ISO 27001 (referencial)' },
  { dim: '¿Cómo se habría tratado?',        banca: 'Investigación formal, multas, plan de mejora', salud: 'Investigación limitada por falta de regulación', telecom: 'Investigación por SUBTEL, enfocada en continuidad' },
]

/* ─── Eje 2: Por jurisdicción ───────────────────────────────────── */
const JURISDICCIONES = [
  {
    nombre: 'Chile (2018)',
    subtitulo: 'Marco aplicado al caso real',
    acento: 'border-red-500',
    acento2: 'bg-red-900/20 border-red-700',
    text: 'text-red-300',
    badge: 'bg-red-100 text-red-800',
    puntos: [
      'Ley 19.223 (1993) — desactualizada',
      'Ley 19.628 sin multas significativas',
      'Sin notificación obligatoria de brechas',
      'Cooperación internacional limitada',
      'SBIF con recursos y capacidades limitadas',
    ],
    multa: '~USD 1–5M',
    multaColor: 'text-red-400',
  },
  {
    nombre: 'Unión Europea',
    subtitulo: 'GDPR + Directiva NIS',
    acento: 'border-green-500',
    acento2: 'bg-green-900/20 border-green-700',
    text: 'text-green-300',
    badge: 'bg-green-100 text-green-800',
    puntos: [
      'GDPR: notificación obligatoria en 72 horas',
      'Multas hasta €20M o 4% facturación global',
      'BCE + EBA para regulación bancaria',
      'Redes Europol, ENISA, cooperación sólida',
      'Responsabilidad personal del DPO y directivos',
    ],
    multa: '~USD 40–80M',
    multaColor: 'text-yellow-400',
  },
  {
    nombre: 'Estados Unidos',
    subtitulo: 'SOX + GLBA + CFPB',
    acento: 'border-blue-500',
    acento2: 'bg-blue-900/20 border-blue-700',
    text: 'text-blue-300',
    badge: 'bg-blue-100 text-blue-800',
    puntos: [
      'Computer Fraud and Abuse Act (CFAA)',
      'GLBA exige notificación a instituciones financieras',
      'SOX: responsabilidad penal de CEO/CFO',
      'FBI, NSA, alianzas Five Eyes',
      'Hasta USD 100.000/día bajo GLBA + class actions',
    ],
    multa: 'USD 100M+',
    multaColor: 'text-blue-400',
  },
]

const EJE2_TABLA = [
  { dim: 'Ley de delitos informáticos', chile: 'Ley 19.223 (desactualizada)', ue: 'Directiva NIS + legislaciones nacionales', usa: 'CFAA (Computer Fraud and Abuse Act)' },
  { dim: 'Protección de datos', chile: 'Ley 19.628 (sin multas significativas)', ue: 'GDPR: multas hasta 4% facturación global', usa: 'GLBA, CCPA (California), HIPAA si aplica' },
  { dim: 'Notificación de brecha', chile: 'No existía en 2018', ue: 'Sí — 72 horas (Art. 33 GDPR)', usa: 'Sí — varía por Estado; GLBA exige a bancos' },
  { dim: 'Multa máxima por brecha', chile: 'Sin límite definido, históricamente baja', ue: 'Hasta €20M o 4% facturación global', usa: 'Hasta USD 100.000/día + litigios' },
  { dim: 'Regulación bancaria', chile: 'SBIF (hoy CMF)', ue: 'BCE + EBA (European Banking Authority)', usa: 'OCC, Fed Reserve, FDIC, SEC' },
  { dim: 'Marco ciberseguridad financiero', chile: 'Circular SBIF (básica en 2018)', ue: 'EBA Guidelines on ICT and Security Risk', usa: 'FFIEC Cybersecurity Assessment Tool' },
  { dim: 'Responsabilidad civil ejecutivos', chile: 'Baja — sin normas específicas personales', ue: 'GDPR: sanciones a DPO y directivos', usa: 'SOX: responsabilidad penal CEO/CFO' },
  { dim: 'Cooperación internacional', chile: 'Limitada (no parte del Convenio de Budapest)', ue: 'Sólida (Europol, ENISA, redes europeas)', usa: 'Sólida (FBI, NSA, alianzas Five Eyes)' },
]

const MULTAS = [
  { jurisdiccion: 'Chile 2018', monto: '~USD 1–5M', base: 'Ley 19.223 + normativa SBIF', pct: 5, color: 'bg-red-500', text: 'text-red-400' },
  { jurisdiccion: 'UE — GDPR', monto: '~USD 40–80M', base: '4% facturación global del banco', pct: 50, color: 'bg-yellow-500', text: 'text-yellow-400' },
  { jurisdiccion: 'EE.UU. — GLBA', monto: 'USD 100M+', base: 'Penalidades + class actions (ref. Equifax: USD 700M)', pct: 100, color: 'bg-blue-500', text: 'text-blue-400' },
]

/* ─── Eje 3: Temporal ───────────────────────────────────────────── */
const EJE3 = [
  { aspecto: 'Ley de delitos informáticos', antes: 'Ley 19.223 (1993) — desactualizada', despues: 'Ley 21.459 (2022) — más completa' },
  { aspecto: 'Convenio de Budapest', antes: 'No adherida en 2018', despues: 'Sí — adherida en 2023' },
  { aspecto: 'Notificación de brechas', antes: 'No era obligatoria', despues: 'CMF ya lo exige a regulados; proyecto de ley en tramitación' },
  { aspecto: 'Ley de datos personales', antes: 'Ley 19.628 sin multas significativas', despues: 'Ley 21.719 en tramitación (reforma tipo GDPR)' },
  { aspecto: 'Marco de ciberseguridad nacional', antes: 'Inexistente', despues: 'Ley Marco de Ciberseguridad 21.663 (2024) + ANCI' },
  { aspecto: 'CSIRT Financiero', antes: 'Sin CSIRT financiero formal', despues: 'CSIRT Financiero operativo (CMF)' },
]

/* ─── Síntesis ──────────────────────────────────────────────────── */
const SINTESIS = [
  {
    num: '1',
    titulo: 'Marco chileno más débil de la OCDE en 2018',
    texto: 'Chile tenía en 2018 uno de los marcos de ciberseguridad más débiles entre los países de la OCDE, lo que limitó la respuesta regulatoria al incidente y redujo drásticamente las multas aplicadas.',
    color: 'bg-red-50 border-red-300 text-red-800',
    dot: 'bg-red-500',
  },
  {
    num: '2',
    titulo: 'Regulación financiera más efectiva que la penal',
    texto: 'Fue la CMF — no los tribunales penales — quien impuso consecuencias al banco. Esto evidencia que la vía administrativa fue más ágil y práctica que la persecución penal.',
    color: 'bg-orange-50 border-orange-300 text-orange-800',
    dot: 'bg-orange-500',
  },
  {
    num: '3',
    titulo: 'Brecha jurisdiccional notable',
    texto: 'El mismo incidente en la UE habría generado multas entre 40 y 80 veces mayores y una investigación penal más robusta. En EE.UU., las class actions habrían elevado la cifra aún más.',
    color: 'bg-yellow-50 border-yellow-300 text-yellow-800',
    dot: 'bg-yellow-500',
  },
  {
    num: '4',
    titulo: 'Chile ha avanzado significativamente desde 2018',
    texto: 'La Ley 21.459, la adhesión al Convenio de Budapest y la Ley Marco de Ciberseguridad representan avances importantes. El mismo ataque hoy tendría consecuencias legales mucho más severas.',
    color: 'bg-emerald-50 border-emerald-300 text-emerald-800',
    dot: 'bg-emerald-500',
  },
]

/* ═══════════════════════════════════════════════════════════════ */
export default function Comparacion() {
  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── Banner emerald ── */}
      <div className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-gray-900 rounded-2xl overflow-hidden mb-10 p-7 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-widest text-emerald-300 mb-1">Sección 04</p>
          <h1 className="text-3xl font-bold mb-1">Comparación de Marcos Regulatorios</h1>
          <p className="text-emerald-200">Análisis por industria, jurisdicción y período — Caso Banco de Chile (2018)</p>
        </div>
      </div>

      {/* ─── EJE 1: Por industria ─── */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-700 mb-1">Eje 1 — Comparación por industria en Chile</h2>
        <p className="text-sm text-gray-500 mb-5">¿Cómo se habría tratado el mismo incidente en otros sectores regulados?</p>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm border-collapse min-w-[640px]">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-800 text-white rounded-tl-xl">Dimensión</th>
                <th className="p-3 bg-blue-800 text-white text-center">🏦 Banca (CMF/SBIF)</th>
                <th className="p-3 bg-green-800 text-white text-center">🏥 Salud (MINSAL)</th>
                <th className="p-3 bg-orange-800 text-white text-center rounded-tr-xl">📡 Telecom (SUBTEL)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {EJE1_FILAS.map((fila, i) => (
                <motion.tr
                  key={i}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="hover:bg-gray-50"
                >
                  <td className="p-3 font-medium text-gray-700 bg-gray-50">{fila.dim}</td>
                  <td className="p-3 text-gray-600 text-center">{fila.banca}</td>
                  <td className="p-3 text-gray-600 text-center">{fila.salud}</td>
                  <td className="p-3 text-gray-600 text-center">{fila.telecom}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Conclusión:</span> El sector financiero tiene la regulación más robusta en Chile. El mismo incidente en el sector salud o telecomunicaciones habría tenido consecuencias regulatorias significativamente menores, evidenciando una brecha sectorial importante.
          </p>
        </div>
      </section>

      {/* ─── EJE 2: Por jurisdicción ─── */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-700 mb-1">Eje 2 — Comparación por jurisdicción</h2>
        <p className="text-sm text-gray-500 mb-5">¿Cómo se habría tratado el incidente en Chile, la UE y EE.UU.?</p>

        {/* Cards de jurisdicción */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {JURISDICCIONES.map((j, i) => (
              <motion.div
                key={j.nombre}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className={`border rounded-xl p-4 ${j.acento2}`}
              >
                <div className={`border-l-4 ${j.acento} pl-3 mb-3`}>
                  <p className={`font-bold text-white`}>{j.nombre}</p>
                  <p className={`text-xs ${j.text}`}>{j.subtitulo}</p>
                </div>
                <ul className="space-y-1 mb-4">
                  {j.puntos.map((p, pi) => (
                    <li key={pi} className="text-xs text-gray-300 flex gap-1.5">
                      <span className={`${j.text} shrink-0`}>·</span>{p}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-700 pt-2">
                  <p className="text-xs text-gray-400">Multa estimada</p>
                  <p className={`font-bold text-lg ${j.multaColor}`}>{j.multa}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Comparativa de multas — barras */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Multa estimada bajo cada marco — escala proporcional</p>
            {MULTAS.map((m, i) => (
              <div key={i} className="flex items-center gap-3">
                <p className="text-xs text-gray-300 w-32 shrink-0">{m.jurisdiccion}</p>
                <div className="flex-1 bg-gray-700 rounded-full" style={{ height: '16px' }}>
                  <motion.div
                    className={`${m.color} rounded-full`}
                    style={{ height: '16px' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${m.pct}%` }}
                    transition={{ duration: 0.7, delay: i * 0.15, ease: 'easeOut' }}
                  />
                </div>
                <p className={`text-sm font-bold w-28 shrink-0 text-right ${m.text}`}>{m.monto}</p>
              </div>
            ))}
            <p className="text-xs text-gray-500 mt-1">Referencia: caso Equifax (EE.UU., 2019) — USD 700M en acuerdos regulatorios.</p>
          </div>
        </div>

        {/* Tabla comparativa completa */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm border-collapse min-w-[640px]">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-800 text-white rounded-tl-xl">Dimensión</th>
                <th className="p-3 bg-red-800 text-white text-center">🇨🇱 Chile (2018)</th>
                <th className="p-3 bg-green-800 text-white text-center">🇪🇺 Unión Europea</th>
                <th className="p-3 bg-blue-800 text-white text-center rounded-tr-xl">🇺🇸 EE.UU.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {EJE2_TABLA.map((fila, i) => (
                <motion.tr
                  key={i}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="hover:bg-gray-50"
                >
                  <td className="p-3 font-medium text-gray-700 bg-gray-50">{fila.dim}</td>
                  <td className="p-3 text-gray-600">{fila.chile}</td>
                  <td className="p-3 text-gray-600">{fila.ue}</td>
                  <td className="p-3 text-gray-600">{fila.usa}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── EJE 3: Temporal ─── */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-700 mb-1">Eje 3 — Comparación temporal: Chile 2018 vs. Chile 2026</h2>
        <p className="text-sm text-gray-500 mb-5">¿Cómo ha evolucionado el marco normativo chileno desde el ataque?</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Header 2018 */}
          <div className="bg-red-900/20 border border-red-700 rounded-xl p-4 text-center">
            <p className="text-xs uppercase tracking-widest text-red-300 mb-1">Marco vigente al momento del ataque</p>
            <p className="text-2xl font-bold text-red-400">Chile 2018</p>
          </div>
          {/* Header 2026 */}
          <div className="bg-emerald-900/20 border border-emerald-700 rounded-xl p-4 text-center">
            <p className="text-xs uppercase tracking-widest text-emerald-300 mb-1">Marco actual</p>
            <p className="text-2xl font-bold text-emerald-400">Chile 2026</p>
          </div>
        </div>

        <div className="space-y-3">
          {EJE3.map((fila, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-[auto_1fr_1fr] gap-px bg-gray-200 rounded-xl overflow-hidden"
            >
              <div className="bg-gray-800 text-white text-xs font-semibold px-3 py-3 flex items-center min-w-[160px]">
                {fila.aspecto}
              </div>
              <div className="bg-red-50 border-none px-4 py-3 text-sm text-red-800 flex items-center">
                <span className="text-red-500 mr-2 shrink-0">✗</span>{fila.antes}
              </div>
              <div className="bg-emerald-50 px-4 py-3 text-sm text-emerald-800 flex items-center">
                <span className="text-emerald-500 mr-2 shrink-0">✓</span>{fila.despues}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
          <p className="text-sm text-emerald-800">
            <span className="font-semibold">Conclusión:</span> El marco normativo chileno ha evolucionado significativamente desde 2018. El mismo ataque ocurrido hoy tendría consecuencias legales, regulatorias y sancionatorias mucho más severas para el banco y eventualmente para los atacantes.
          </p>
        </div>
      </section>

      {/* ─── Síntesis ─── */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Síntesis</h2>
        <div className="space-y-3">
          {SINTESIS.map((s, i) => (
            <motion.div
              key={s.num}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ x: 4 }}
              className={`border rounded-xl p-4 flex items-start gap-3 ${s.color}`}
            >
              <span className={`shrink-0 w-7 h-7 rounded-full ${s.dot} text-white text-xs font-bold flex items-center justify-center mt-0.5`}>
                {s.num}
              </span>
              <div>
                <p className="font-semibold mb-1">{s.titulo}</p>
                <p className="text-sm">{s.texto}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  )
}
