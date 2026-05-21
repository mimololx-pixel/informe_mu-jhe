import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.35, ease: 'easeOut' }
  })
}

const ESTADO_BADGE = {
  'Vigente':       'bg-green-100 text-green-700',
  'Derogada':      'bg-red-100 text-red-700',
  'En reforma':    'bg-yellow-100 text-yellow-700',
  'Internacional': 'bg-indigo-100 text-indigo-700',
}

const DIMENSIONES = ['Penal', 'Datos', 'Regulatorio', 'Cooperación', 'Técnico']

const COBERTURA = [
  { norma: 'Ley 19.223',     valores: ['full', 'none', 'none', 'none', 'none'] },
  { norma: 'Ley 21.459',     valores: ['full', 'none', 'none', 'partial', 'none'] },
  { norma: 'Ley 19.628',     valores: ['none', 'full', 'none', 'none', 'none'] },
  { norma: 'DFL N°3 / LGB',  valores: ['none', 'none', 'full', 'none', 'none'] },
  { norma: 'CMF Circular',   valores: ['none', 'none', 'full', 'none', 'partial'] },
  { norma: 'Conv. Budapest', valores: ['full', 'partial', 'none', 'full', 'none'] },
  { norma: 'SWIFT CSP',      valores: ['none', 'none', 'full', 'full', 'full'] },
  { norma: 'Basilea III',    valores: ['none', 'none', 'full', 'full', 'partial'] },
  { norma: 'ISO 27001',      valores: ['none', 'partial', 'partial', 'partial', 'full'] },
  { norma: 'GDPR',           valores: ['none', 'full', 'full', 'partial', 'partial'] },
]

const COB_COLOR = {
  full:    'bg-green-500',
  partial: 'bg-yellow-400',
  none:    'bg-gray-200',
}
const COB_LABEL = {
  full:    'Cubre directamente',
  partial: 'Cubre parcialmente',
  none:    'No aplica',
}

const NORMAS = [
  {
    id: 'ley19223',
    num: '1',
    nombre: 'Ley 19.223 (1993) — Delitos informáticos',
    tipo: 'Nacional',
    estado: 'Derogada',
    ambito: 'Primera ley chilena de delitos informáticos.',
    relevancia: 'Vigente al momento del ataque. Tipificaba el sabotaje informático (KillMBR) y el acceso no autorizado. Considerada insuficiente para ataques de esta escala.',
    estadoTexto: 'Derogada — reemplazada por Ley 21.459 (2022)',
    articulos: [],
  },
  {
    id: 'ley21459',
    num: '2',
    nombre: 'Ley 21.459 (2022) — Normas sobre delitos informáticos',
    tipo: 'Nacional',
    estado: 'Vigente',
    ambito: 'Moderniza el derecho penal informático conforme al Convenio de Budapest.',
    relevancia: 'Si el incidente ocurriera hoy, sería el principal cuerpo normativo.',
    estadoTexto: 'Vigente',
    articulos: [
      'Art. 2 — Acceso ilícito a sistema informático',
      'Art. 3 — Interceptación ilícita de datos',
      'Art. 4 — Ataque a la integridad de un sistema (KillMBR)',
      'Art. 6 — Fraude informático (transferencias SWIFT)',
      'Art. 8 — Abuso de dispositivos (uso de malware)',
      'Art. 10 — Agravante por infraestructura crítica',
    ],
  },
  {
    id: 'ley19628',
    num: '3',
    nombre: 'Ley 19.628 (1999) — Protección de datos personales',
    tipo: 'Nacional',
    estado: 'En reforma',
    ambito: 'Regula el tratamiento de datos personales en Chile.',
    relevancia: 'El banco custodiaba datos de millones de clientes. La brecha comprometió datos financieros (RUT, cuentas, saldos).',
    estadoTexto: 'Vigente (con reforma Ley 21.719 en implementación)',
    articulos: [
      'Art. 11 — Deber de custodia y seguridad',
      'Art. 12 — Derechos de los titulares (ARCO)',
      'Art. 23 — Responsabilidad por daños',
    ],
  },
  {
    id: 'dfl3',
    num: '4',
    nombre: 'Ley General de Bancos (DFL N°3 de 1997)',
    tipo: 'Nacional',
    estado: 'Vigente',
    ambito: 'Regula las operaciones bancarias en Chile.',
    relevancia: 'Establece obligaciones de gestión de riesgo operacional y tecnológico para entidades financieras supervisadas por la CMF.',
    estadoTexto: 'Vigente',
    articulos: ['Art. 70 — Obligación de gestión prudente y segura de los recursos'],
  },
  {
    id: 'cmf',
    num: '5',
    nombre: 'Normativa CMF — Circular N°3.506 y sucesoras',
    tipo: 'Nacional',
    estado: 'Vigente',
    ambito: 'Regulación de gestión de riesgo tecnológico y ciberseguridad para bancos.',
    relevancia: 'El ataque evidenció incumplimientos en estándares mínimos de seguridad exigidos por la SBIF (hoy CMF), dando base para sanciones administrativas.',
    estadoTexto: 'Vigente (actualizada)',
    articulos: [],
  },
  {
    id: 'budapest',
    num: '6',
    nombre: 'Convenio de Budapest (2001)',
    tipo: 'Internacional',
    estado: 'Internacional',
    ambito: 'Tratado internacional que estandariza los delitos informáticos.',
    relevancia: 'Chile se adhirió en 2023 (no en 2018). Hubiera sido el marco de cooperación internacional para investigar el ataque.',
    estadoTexto: 'Convenio internacional',
    articulos: [],
  },
  {
    id: 'swiftcsp',
    num: '7',
    nombre: 'SWIFT Customer Security Programme (CSP)',
    tipo: 'Internacional',
    estado: 'Internacional',
    ambito: 'Controles de seguridad obligatorios para todos los usuarios de la red SWIFT.',
    relevancia: 'El ataque explotó credenciales SWIFT. El banco debía cumplir con autenticación multifactor, monitoreo de transacciones y segregación de redes.',
    estadoTexto: 'Norma sectorial internacional',
    articulos: [],
  },
  {
    id: 'basilea',
    num: '8',
    nombre: 'Basilea III — Comité de Supervisión Bancaria de Basilea',
    tipo: 'Internacional',
    estado: 'Internacional',
    ambito: 'Marco internacional para la gestión del riesgo operacional bancario.',
    relevancia: 'El riesgo tecnológico es parte del riesgo operacional. El ataque evidenció deficiencias en los modelos de gestión de riesgo del banco.',
    estadoTexto: 'Marco internacional bancario',
    articulos: [],
  },
  {
    id: 'iso27001',
    num: '9',
    nombre: 'ISO/IEC 27001:2013 — Seguridad de la información',
    tipo: 'Internacional',
    estado: 'Internacional',
    ambito: 'Estándar internacional de gestión de seguridad.',
    relevancia: 'La CMF lo referencia. El ataque mostró ausencias en A.12.6 (gestión de vulnerabilidades) y A.16.1 (gestión de incidentes).',
    estadoTexto: 'Estándar internacional',
    articulos: [],
  },
  {
    id: 'gdpr',
    num: '10',
    nombre: 'GDPR — Reglamento General de Protección de Datos (UE, 2018)',
    tipo: 'Internacional',
    estado: 'Internacional',
    ambito: 'Regulación europea de protección de datos.',
    relevancia: 'Valor comparativo: si el banco operara en la UE, habría enfrentado notificación en 72h y multas de hasta 4% de facturación global. Ilustra la brecha con la Ley 19.628 chilena.',
    estadoTexto: 'Referencia comparativa (no aplica directamente a Chile)',
    articulos: [],
  },
]

export default function Marco() {
  const [filtroTipo,   setFiltroTipo]   = useState('Todos')
  const [filtroEstado, setFiltroEstado] = useState('Todos')
  const [normaAbierta, setNormaAbierta] = useState(null)
  const [normaDestacada, setNormaDestacada] = useState(null)
  const [dimDestacada,   setDimDestacada]   = useState(null)

  const normasFiltradas = NORMAS.filter((n) => {
    const pasaTipo   = filtroTipo === 'Todos'   || n.tipo === filtroTipo
    const pasaEstado = filtroEstado === 'Todos' || n.estado === filtroEstado
    return pasaTipo && pasaEstado
  })

  const conteoTipo   = (t) => t === 'Todos' ? NORMAS.length : NORMAS.filter((n) => n.tipo === t).length
  const conteoEstado = (e) => e === 'Todos' ? NORMAS.length : NORMAS.filter((n) => n.estado === e).length

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Banner indigo */}
      <div className="relative bg-gradient-to-br from-indigo-950 via-indigo-900 to-gray-900 rounded-2xl overflow-hidden mb-8 p-7 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-widest text-indigo-300 mb-1">Sección 02</p>
          <h1 className="text-3xl font-bold mb-1">Marco Normativo</h1>
          <p className="text-indigo-200">Leyes y regulaciones aplicables al caso Banco de Chile (2018)</p>
        </div>
      </div>

      {/* Filtros */}
      <section className="mb-8 space-y-3">
        {/* Filtro por tipo */}
        <div className="flex flex-wrap gap-2">
          {['Todos', 'Nacional', 'Internacional'].map((t) => (
            <button
              key={t}
              onClick={() => { setFiltroTipo(t); setNormaAbierta(null) }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                filtroTipo === t
                  ? 'bg-indigo-700 text-white border-indigo-700'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400 hover:text-indigo-700'
              }`}
            >
              {t}
              <span className={`text-xs rounded-full px-1.5 py-0.5 font-bold ${filtroTipo === t ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {conteoTipo(t)}
              </span>
            </button>
          ))}
        </div>
        {/* Filtro por estado */}
        <div className="flex flex-wrap gap-2">
          {['Todos', 'Vigente', 'Derogada', 'En reforma', 'Internacional'].map((e) => (
            <button
              key={e}
              onClick={() => { setFiltroEstado(e); setNormaAbierta(null) }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                filtroEstado === e
                  ? 'bg-gray-800 text-white border-gray-800'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              }`}
            >
              {e}
              <span className={`text-xs rounded-full px-1.5 py-0.5 font-bold ${filtroEstado === e ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {conteoEstado(e)}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Acordeón de normas */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-1">
          Normas aplicables
          {(filtroTipo !== 'Todos' || filtroEstado !== 'Todos') && (
            <span className="ml-2 text-sm font-normal text-gray-400">— {normasFiltradas.length} resultado{normasFiltradas.length !== 1 ? 's' : ''}</span>
          )}
        </h2>
        <p className="text-sm text-gray-500 mb-4">Haz click en cada norma para ver artículos clave y relevancia al caso.</p>

        <div className="space-y-2">
          <AnimatePresence>
            {normasFiltradas.map((n, i) => {
              const abierta = normaAbierta === n.id
              return (
                <motion.div
                  key={n.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, height: 0, transition: { duration: 0.15 } }}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setNormaAbierta(abierta ? null : n.id)}
                    className="w-full text-left px-5 py-3.5 flex items-center gap-3 hover:bg-gray-50 transition-colors"
                  >
                    <span className={`shrink-0 w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center ${n.tipo === 'Nacional' ? 'bg-blue-900' : 'bg-indigo-600'}`}>
                      {n.num}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-800 text-sm">{n.nombre}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ESTADO_BADGE[n.estado]}`}>
                          {n.estadoTexto}
                        </span>
                      </div>
                      {!abierta && <p className="text-xs text-gray-500 mt-0.5 truncate">{n.ambito}</p>}
                    </div>
                    <motion.span
                      animate={{ rotate: abierta ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-400 text-xs shrink-0"
                    >▼</motion.span>
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
                        <div className="px-5 pb-4 pt-2 border-t border-gray-100 space-y-3">
                          <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Ámbito</p>
                            <p className="text-sm text-gray-600">{n.ambito}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Relevancia al caso</p>
                            <p className="text-sm text-indigo-800 bg-indigo-50 rounded-lg px-3 py-2">{n.relevancia}</p>
                          </div>
                          {n.articulos.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Artículos clave</p>
                              <ul className="space-y-1">
                                {n.articulos.map((a) => (
                                  <li key={a} className="text-sm text-blue-700 bg-blue-50 rounded px-3 py-1">{a}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {normasFiltradas.length === 0 && (
            <div className="text-center py-8 text-gray-400 text-sm">
              Sin normas para los filtros seleccionados.{' '}
              <button onClick={() => { setFiltroTipo('Todos'); setFiltroEstado('Todos') }} className="text-indigo-500 hover:underline">Limpiar filtros</button>
            </div>
          )}
        </div>
      </section>

      {/* Mapa de cobertura interactivo */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-1">Mapa de cobertura normativa</h2>
        <p className="text-sm text-gray-500 mb-4">
          Click en una <strong>norma</strong> para resaltar su fila · Click en una <strong>dimensión</strong> para resaltar su columna
        </p>

        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm border-collapse min-w-[520px]">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="text-left p-3 rounded-tl-xl">Norma</th>
                {DIMENSIONES.map((d, di) => {
                  const activa = dimDestacada === d
                  return (
                    <th
                      key={d}
                      onClick={() => setDimDestacada(activa ? null : d)}
                      className={`p-3 text-center text-xs cursor-pointer transition-colors select-none ${activa ? 'bg-indigo-600' : 'hover:bg-gray-700'} ${di === DIMENSIONES.length - 1 ? 'rounded-tr-xl' : ''}`}
                    >
                      {d}
                      {activa && <span className="block text-indigo-200 text-xs">▲</span>}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {COBERTURA.map((row) => {
                const filaActiva = normaDestacada === row.norma
                return (
                  <tr
                    key={row.norma}
                    onClick={() => setNormaDestacada(filaActiva ? null : row.norma)}
                    className={`cursor-pointer transition-colors ${filaActiva ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}
                  >
                    <td className={`p-3 font-medium whitespace-nowrap text-sm transition-colors ${filaActiva ? 'text-indigo-800' : 'text-gray-700'}`}>
                      {filaActiva && <span className="mr-1 text-indigo-500">→</span>}
                      {row.norma}
                    </td>
                    {row.valores.map((v, i) => {
                      const colActiva = dimDestacada === DIMENSIONES[i]
                      return (
                        <td
                          key={i}
                          className={`p-3 text-center transition-colors ${(filaActiva || colActiva) && v !== 'none' ? 'bg-indigo-100' : ''}`}
                        >
                          <span
                            className={`inline-block w-4 h-4 rounded-full transition-all ${COB_COLOR[v]} ${(filaActiva || colActiva) ? 'ring-2 ring-offset-1 ring-indigo-400' : ''}`}
                            title={COB_LABEL[v]}
                          />
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Panel de detalle al seleccionar norma o dimensión */}
        <AnimatePresence mode="wait">
          {(normaDestacada || dimDestacada) && (
            <motion.div
              key={`${normaDestacada}-${dimDestacada}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="mt-3 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3 text-sm text-indigo-900 flex items-start gap-3"
            >
              <span className="text-indigo-500 font-semibold shrink-0">
                {normaDestacada ? `Norma →` : `Dimensión →`}
              </span>
              <span>
                {normaDestacada
                  ? NORMAS.find((n) => n.norma === normaDestacada || n.nombre.startsWith(normaDestacada.split('/')[0].trim()))?.relevancia ?? `${normaDestacada} — ver artículos en el acordeón.`
                  : `${dimDestacada}: normas con cobertura directa (verde) o parcial (amarillo) en esta dimensión para el caso Banco de Chile.`
                }
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-green-500 inline-block" /> Cubre directamente</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" /> Cubre parcialmente</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-gray-200 border border-gray-300 inline-block" /> No aplica</span>
        </div>
      </section>
    </motion.div>
  )
}
