import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function AnimatedCounter({ target, sufijo = '', duracion = 1000 }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let frame
    let start = null
    const tick = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duracion, 1)
      setVal(Math.floor(progress * target))
      if (progress < 1) frame = requestAnimationFrame(tick)
      else setVal(target)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duracion])
  return <>{val}{sufijo}</>
}

const COLOR_MAP = {
  blue:   { badge: 'bg-blue-100 text-blue-800',    barra: 'bg-blue-500',    tag: 'bg-blue-50 text-blue-700'    },
  red:    { badge: 'bg-red-100 text-red-800',      barra: 'bg-red-600',     tag: 'bg-red-50 text-red-700'      },
  orange: { badge: 'bg-orange-100 text-orange-800', barra: 'bg-orange-500',  tag: 'bg-orange-50 text-orange-700' },
  purple: { badge: 'bg-purple-100 text-purple-800', barra: 'bg-purple-500',  tag: 'bg-purple-50 text-purple-700' },
  yellow: { badge: 'bg-yellow-100 text-yellow-800', barra: 'bg-yellow-400',  tag: 'bg-yellow-50 text-yellow-700' },
}

const STATS = [
  { valor: '5',       numerico: 5,  sufijo: '',      etiqueta: 'Delitos tipificados',   sub: 'Ley 21.459',                        color: 'bg-blue-900 text-white'   },
  { valor: '1',       numerico: 1,  sufijo: '',      etiqueta: 'Agravante aplicable',   sub: 'Art. 10 — Infraestructura crítica', color: 'bg-yellow-500 text-white' },
  { valor: '10 años', numerico: 10, sufijo: ' años', etiqueta: 'Pena máxima',           sub: 'Arts. 4 y 6 con agravante',         color: 'bg-red-700 text-white'    },
  { valor: 'USD 10M', numerico: null,               etiqueta: 'Fraude SWIFT',           sub: '~USD 6M no recuperados',            color: 'bg-orange-600 text-white' },
]

const CATEGORIAS = ['Todos', 'Acceso', 'Integridad', 'Fraude', 'Dispositivos', 'Agravante']

const DELITOS = [
  {
    id: 'art2',
    articulo: 'Art. 2',
    titulo: 'Acceso ilícito',
    accion: 'Acceso no autorizado a la red interna del banco',
    categoria: 'Acceso',
    pena: '61 días – 3 años',
    penaDetalle: 'Presidio menor grado mínimo a medio',
    multa: 'Multa 11–15 UTM',
    agravante: false,
    penaConAgravante: null,
    severidad: 60,
    colorCategoria: 'blue',
    textoLiteral: 'El que, sin autorización o excediendo la autorización que posea, acceda a un sistema informático...',
    conexionCaso: 'Los atacantes accedieron a los sistemas internos del banco, posiblemente mediante credenciales comprometidas en una etapa previa de reconocimiento, semanas antes del ataque principal.',
    fundamentoLegal: 'Implementa el Art. 2 del Convenio de Budapest. Requiere acceso "sin derecho" y conducta dolosa. El acceso fue necesariamente previo a cualquier otra acción del ataque.',
  },
  {
    id: 'art3',
    articulo: 'Art. 3',
    titulo: 'Interceptación ilícita',
    accion: 'Captura de credenciales SWIFT sin autorización',
    categoria: 'Acceso',
    pena: '61 días – 3 años',
    penaDetalle: 'Presidio menor grado mínimo a medio',
    multa: 'Multa 11–15 UTM',
    agravante: false,
    penaConAgravante: null,
    severidad: 60,
    colorCategoria: 'blue',
    textoLiteral: 'El que, sin autorización, intercepte por medios técnicos datos informáticos en transmisiones no públicas hacia, desde o dentro de un sistema informático...',
    conexionCaso: 'Para ejecutar las transferencias SWIFT, los atacantes debieron capturar las credenciales de autenticación de operadores del banco. Esto configura interceptación de datos en tránsito.',
    fundamentoLegal: 'Protege la confidencialidad de las comunicaciones digitales. La interceptación de credenciales es un paso técnico previo y necesario al fraude; puede concurrir con el Art. 6.',
  },
  {
    id: 'art4',
    articulo: 'Art. 4',
    titulo: 'Ataque a la integridad del sistema',
    accion: 'Malware KillMBR destruyó ~9.000 equipos del banco',
    categoria: 'Integridad',
    pena: '541 días – 5 años',
    penaDetalle: 'Presidio menor grado medio a mayor',
    multa: null,
    agravante: true,
    penaConAgravante: 'Hasta 10 años (con Art. 10)',
    severidad: 100,
    colorCategoria: 'red',
    textoLiteral: 'El que, sin autorización, obstaculice o interfiera el funcionamiento de un sistema informático de cualquier forma...',
    conexionCaso: 'El malware KillMBR sobrescribía el Master Boot Record, dejando los equipos completamente inoperativos. Con ~9.000 equipos destruidos, es el delito de mayor daño material del ataque.',
    fundamentoLegal: 'Es el delito de mayor penalidad base del caso. El Art. 4 inc. 2 eleva la pena cuando el sistema afectado es de infraestructura crítica, convergiendo directamente con el Art. 10.',
  },
  {
    id: 'art6',
    articulo: 'Art. 6',
    titulo: 'Fraude informático',
    accion: 'Transferencias SWIFT fraudulentas por USD 10 millones',
    categoria: 'Fraude',
    pena: '541 días – 5 años',
    penaDetalle: 'Presidio menor grado medio a mayor',
    multa: 'Multa según monto defraudado',
    agravante: true,
    penaConAgravante: 'Hasta 10 años (con Art. 10)',
    severidad: 100,
    colorCategoria: 'orange',
    textoLiteral: 'El que, a través de la manipulación de un sistema informático, obtenga un beneficio económico ilícito para sí o para un tercero, en perjuicio de otro...',
    conexionCaso: 'Las transferencias de USD 10M via SWIFT constituyeron el objetivo final del ataque. El KillMBR fue la distracción operativa; el fraude SWIFT fue el motivo económico real.',
    fundamentoLegal: 'Requiere: manipulación de sistema + beneficio económico + perjuicio a tercero. Los tres elementos se verifican con las transferencias. La multa se calcula sobre el monto defraudado.',
  },
  {
    id: 'art8',
    articulo: 'Art. 8',
    titulo: 'Abuso de dispositivos',
    accion: 'Uso de herramientas de hacking y malware',
    categoria: 'Dispositivos',
    pena: '61 días – 3 años',
    penaDetalle: 'Presidio menor grado mínimo a medio',
    multa: 'Multa 11–15 UTM',
    agravante: false,
    penaConAgravante: null,
    severidad: 60,
    colorCategoria: 'purple',
    textoLiteral: 'El que, sin autorización, produzca, adquiera, importe, posea, facilite o difunda artefactos, programas o datos diseñados para la comisión de delitos informáticos...',
    conexionCaso: 'El malware KillMBR y las herramientas de movimiento lateral usadas para comprometer la red interna son exactamente los "artefactos" del Art. 8. Este delito concurre con el Art. 4.',
    fundamentoLegal: 'Delito de posesión/uso de instrumentos de ataque. Es independiente del resultado final; basta con que las herramientas estén diseñadas para cometer delitos informáticos.',
  },
  {
    id: 'art10',
    articulo: 'Art. 10',
    titulo: 'Agravante: infraestructura crítica',
    accion: 'Aplica sobre Art. 4 y Art. 6 por afectar el sistema financiero nacional',
    categoria: 'Agravante',
    pena: 'Eleva la pena de Art. 4 y Art. 6 un grado',
    penaDetalle: 'Pena base + un grado adicional en la escala',
    multa: null,
    agravante: true,
    penaConAgravante: 'Arts. 4 y 6 pueden alcanzar hasta 10 años',
    severidad: null,
    colorCategoria: 'yellow',
    textoLiteral: 'Se impondrá la pena superior en un grado a la señalada cuando los hechos afecten el funcionamiento de infraestructuras críticas de la información o servicios esenciales...',
    conexionCaso: 'El Banco de Chile opera dentro del sistema financiero nacional, clasificado como infraestructura crítica. Esto eleva automáticamente la pena de los delitos base cometidos contra él.',
    fundamentoLegal: 'No es un delito autónomo, sino un modificador de pena. El fiscal debe acreditar que el sistema afectado está declarado infraestructura crítica. No tiene severidad propia; opera sobre otros artículos.',
  },
]

const ESCENARIO = {
  titulo: 'Escenario hipotético: ¿Qué pasaría si el caso llegara a tribunales chilenos hoy?',
  puntos: [
    {
      heading: 'Jurisdicción',
      texto: 'Chile tendría jurisdicción por el principio de territorialidad (Art. 304 COT): el banco está en Chile, los sistemas afectados están en Chile. La ubicación física de los atacantes (Corea del Norte / terceros países) complica la extradición pero no impide el juicio en rebeldía.',
    },
    {
      heading: 'Concurso de delitos',
      texto: 'Los Arts. 2, 3, 4, 6 y 8 serían imputados en concurso real (Art. 74 CP), salvo que el fiscal alegue concurso ideal en los actos simultáneos. La pena más grave — Art. 4 con agravante Art. 10 — establece el marco principal del que parte el tribunal.',
    },
    {
      heading: 'Pena concreta estimada',
      texto: 'Si el Art. 10 opera sobre Art. 4 (5 años sube un grado: hasta 10 años de presidio mayor grado mínimo) y sobre Art. 6 (misma escala), el tribunal podría fijar condenas de 7 a 10 años efectivos para los autores materiales. Las multas se acumularían a la pena corporal.',
    },
    {
      heading: 'Obstáculo real',
      texto: 'Grupo Lazarus nunca fue formalmente atribuido ni detenido. Sin imputados presentes, el caso se transforma en investigación activa con plazo de prescripción de 10 años (crimen) desde la comisión del delito (mayo 2018). Prescribiría en mayo 2028 si no hay formalización previa.',
    },
  ],
}

const GRAFICO_PENAS = [
  { id: 'art2', label: 'Art. 2', titulo: 'Acceso ilícito',        anos: 3, anosAg: null, color: 'bg-blue-500' },
  { id: 'art3', label: 'Art. 3', titulo: 'Interceptación',        anos: 3, anosAg: null, color: 'bg-blue-500' },
  { id: 'art4', label: 'Art. 4', titulo: 'Integridad del sistema', anos: 5, anosAg: 10,   color: 'bg-red-500' },
  { id: 'art6', label: 'Art. 6', titulo: 'Fraude informático',     anos: 5, anosAg: 10,   color: 'bg-orange-500' },
  { id: 'art8', label: 'Art. 8', titulo: 'Abuso de dispositivos',  anos: 3, anosAg: null, color: 'bg-purple-500' },
]
const MAX_ANOS = 10

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.35, ease: 'easeOut' }
  })
}

export default function Delitos() {
  const [expandido, setExpandido] = useState(null)
  const [filtro, setFiltro] = useState('Todos')
  const [escenarioAbierto, setEscenarioAbierto] = useState(false)
  const [busqueda, setBusqueda] = useState('')

  const conteoCategoria = (cat) =>
    cat === 'Todos' ? DELITOS.length : DELITOS.filter((d) => d.categoria === cat).length

  const delitosVisibles = DELITOS
    .filter((d) => filtro === 'Todos' || d.categoria === filtro)
    .filter((d) => {
      if (!busqueda) return true
      const q = busqueda.toLowerCase()
      return (
        d.titulo.toLowerCase().includes(q) ||
        d.articulo.toLowerCase().includes(q) ||
        d.accion.toLowerCase().includes(q) ||
        d.categoria.toLowerCase().includes(q)
      )
    })

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Banner rojo */}
      <div className="relative bg-gradient-to-br from-red-950 via-red-900 to-gray-900 rounded-2xl overflow-hidden mb-8 p-7 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-widest text-red-300 mb-1">Sección 03</p>
          <h1 className="text-3xl font-bold mb-1">Delitos Informáticos</h1>
          <p className="text-red-200">Tipificación bajo la Ley 21.459 — Caso Banco de Chile (2018)</p>
        </div>
      </div>

      {/* Stats row con contador animado */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {STATS.map((s, i) => (
          <motion.div
            key={s.etiqueta}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
            className={`rounded-xl p-4 cursor-default ${s.color}`}
          >
            <p className="text-2xl font-bold">
              {s.numerico !== null
                ? <AnimatedCounter target={s.numerico} sufijo={s.sufijo} />
                : s.valor
              }
            </p>
            <p className="text-sm font-medium mt-1">{s.etiqueta}</p>
            <p className="text-xs opacity-75 mt-0.5">{s.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Filtro por categoría + búsqueda */}
      <section className="mb-8 space-y-3">
        <div className="flex flex-wrap gap-2">
          {CATEGORIAS.map((cat, i) => {
            const count = conteoCategoria(cat)
            return (
              <motion.button
                key={cat}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                onClick={() => { setFiltro(cat); setExpandido(null) }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  filtro === cat
                    ? 'bg-blue-700 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {cat}
                <span className={`text-xs rounded-full px-1.5 py-0.5 font-bold ${
                  filtro === cat ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {count}
                </span>
              </motion.button>
            )
          })}
        </div>

        {/* Campo de búsqueda */}
        <div className="relative max-w-sm">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" style={{ fontSize: '14px' }}>
            🔍
          </span>
          <input
            type="text"
            value={busqueda}
            onChange={(e) => { setBusqueda(e.target.value); setExpandido(null) }}
            placeholder="Buscar por artículo, título o acción…"
            className="w-full pl-8 pr-8 py-2 text-sm border border-gray-200 rounded-full bg-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-300 transition"
          />
          {busqueda && (
            <button
              onClick={() => setBusqueda('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </section>

      {/* Cards de delitos (acordeón) */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Artículos aplicables
          {busqueda && (
            <span className="ml-2 text-sm font-normal text-gray-400">— {delitosVisibles.length} resultado{delitosVisibles.length !== 1 ? 's' : ''} para "{busqueda}"</span>
          )}
        </h2>
        <div className="space-y-4">
          <AnimatePresence>
            {delitosVisibles.map((delito, i) => {
              const colores = COLOR_MAP[delito.colorCategoria]
              const estaExpandido = expandido === delito.id

              return (
                <motion.div
                  key={delito.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
                  className="border border-gray-200 rounded-xl bg-white overflow-hidden"
                >
                  {/* Cabecera clickeable */}
                  <button
                    onClick={() => setExpandido(estaExpandido ? null : delito.id)}
                    className="w-full text-left p-5 flex items-start gap-3 hover:bg-gray-50 transition-colors"
                  >
                    <span className="shrink-0 w-7 h-7 rounded-full bg-blue-900 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                      {delito.articulo.replace('Art. ', '')}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-gray-800">
                          {delito.articulo} — {delito.titulo}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colores.badge}`}>
                          {delito.categoria}
                        </span>
                        {delito.agravante && delito.penaConAgravante && (
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-red-100 text-red-700">
                            + Agravante
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-500 mt-1">{delito.accion}</p>

                      {delito.severidad != null && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                            <span>Pena máxima</span>
                            <span className="font-medium text-gray-600">{delito.pena}</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${colores.barra}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${delito.severidad}%` }}
                              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
                            />
                          </div>
                          {delito.penaConAgravante && (
                            <p className="text-xs text-red-600 font-medium mt-1">{delito.penaConAgravante}</p>
                          )}
                        </div>
                      )}
                    </div>

                    <motion.span
                      animate={{ rotate: estaExpandido ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 text-gray-400 text-xs"
                    >
                      ▼
                    </motion.span>
                  </button>

                  {/* Panel expandido con animación de altura */}
                  <AnimatePresence>
                    {estaExpandido && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="border-t border-gray-100 px-5 pb-5 pt-4 space-y-4">
                          <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Texto legal (extracto)</p>
                            <blockquote className="text-sm text-gray-600 italic border-l-4 border-gray-200 pl-3">
                              "{delito.textoLiteral}"
                            </blockquote>
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Conexión con el ataque</p>
                            <p className={`text-sm rounded px-3 py-2 ${COLOR_MAP[delito.colorCategoria].tag}`}>
                              {delito.conexionCaso}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Fundamento jurídico</p>
                            <p className="text-sm text-gray-600">{delito.fundamentoLegal}</p>
                          </div>

                          <div className="flex flex-wrap gap-2 pt-1">
                            <span className="text-sm text-gray-700 bg-gray-100 rounded px-3 py-1">{delito.penaDetalle}</span>
                            {delito.multa && (
                              <span className="text-sm text-orange-700 bg-orange-50 rounded px-3 py-1">{delito.multa}</span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {delitosVisibles.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-400 text-sm">
                {busqueda
                  ? <>Sin resultados para <strong>"{busqueda}"</strong>. <button onClick={() => setBusqueda('')} className="text-blue-500 hover:underline">Limpiar búsqueda</button></>
                  : 'No hay delitos en esta categoría.'
                }
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Comparativa visual de penas */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Comparativa visual de penas</h2>
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          {GRAFICO_PENAS.map((item, i) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="w-24 shrink-0">
                <p className="text-xs font-semibold text-gray-700">{item.label}</p>
                <p className="text-xs text-gray-400 truncate">{item.titulo}</p>
              </div>
              <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden flex">
                <motion.div
                  className={`h-full ${item.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.anos / MAX_ANOS) * 100}%` }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                />
                {item.anosAg && (
                  <motion.div
                    className="h-full bg-red-200"
                    initial={{ width: 0 }}
                    animate={{ width: `${((item.anosAg - item.anos) / MAX_ANOS) * 100}%` }}
                    transition={{ duration: 0.5, delay: i * 0.1 + 0.5, ease: 'easeOut' }}
                  />
                )}
              </div>
              <div className="w-28 shrink-0 text-right">
                <p className="text-xs text-gray-600">hasta {item.anos} años</p>
                {item.anosAg && <p className="text-xs text-red-500 font-medium">+ Art.10: {item.anosAg} años</p>}
              </div>
            </div>
          ))}
          <div className="flex flex-wrap gap-4 pt-2 border-t border-gray-100 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500 inline-block" /> Acceso / Abuso</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500 inline-block" /> Integridad</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-orange-500 inline-block" /> Fraude</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-purple-500 inline-block" /> Dispositivos</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-200 border border-red-300 inline-block" /> Extensión Art. 10</span>
          </div>
        </div>
      </section>

      {/* Tabla resumen */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Cuadro resumen de penas</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="text-left p-3 rounded-tl-lg">Artículo</th>
                <th className="text-left p-3">Categoría</th>
                <th className="text-left p-3">Pena base</th>
                <th className="text-left p-3 rounded-tr-lg">Con Art. 10</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {delitosVisibles.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-800">{d.articulo} — {d.titulo}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${COLOR_MAP[d.colorCategoria].badge}`}>
                      {d.categoria}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600">{d.pena}</td>
                  <td className="p-3">
                    {d.penaConAgravante
                      ? <span className="text-red-600 font-medium">{d.penaConAgravante}</span>
                      : <span className="text-gray-300">—</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Panel escenario hipotético */}
      <section>
        <button
          onClick={() => setEscenarioAbierto((prev) => !prev)}
          className="w-full flex items-center justify-between border border-gray-200 rounded-xl p-5 bg-white hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-blue-600 shrink-0" />
            <h2 className="text-lg font-semibold text-gray-800 text-left">{ESCENARIO.titulo}</h2>
          </div>
          <motion.span
            animate={{ rotate: escenarioAbierto ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 text-gray-400 text-xs ml-3"
          >
            ▼
          </motion.span>
        </button>

        <AnimatePresence>
          {escenarioAbierto && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div className="border border-t-0 border-gray-200 rounded-b-xl bg-white px-5 pb-5 pt-4 space-y-4">
                {ESCENARIO.puntos.map((punto, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-blue-900 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-800">{punto.heading}</p>
                      <p className="text-sm text-gray-600 mt-1">{punto.texto}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </motion.div>
  )
}
