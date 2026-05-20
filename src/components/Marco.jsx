import { motion } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.35, ease: 'easeOut' }
  })
}

export default function Marco() {
  const nacionales = [
    {
      num: '1',
      nombre: 'Ley 19.223 (1993) — Delitos informáticos',
      ambito: 'Primera ley chilena de delitos informáticos.',
      relevancia: 'Vigente al momento del ataque. Tipificaba el sabotaje informático (KillMBR) y el acceso no autorizado. Considerada insuficiente para ataques de esta escala.',
      estado: 'Derogada — reemplazada por Ley 21.459 (2022)',
      articulos: [],
    },
    {
      num: '2',
      nombre: 'Ley 21.459 (2022) — Normas sobre delitos informáticos',
      ambito: 'Moderniza el derecho penal informático conforme al Convenio de Budapest.',
      relevancia: 'Si el incidente ocurriera hoy, sería el principal cuerpo normativo.',
      estado: 'Vigente',
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
      num: '3',
      nombre: 'Ley 19.628 (1999) — Protección de datos personales',
      ambito: 'Regula el tratamiento de datos personales en Chile.',
      relevancia: 'El banco custodiaba datos de millones de clientes. La brecha comprometió datos financieros (RUT, cuentas, saldos).',
      estado: 'Vigente (con reforma Ley 21.719 en implementación)',
      articulos: [
        'Art. 11 — Deber de custodia y seguridad',
        'Art. 12 — Derechos de los titulares (ARCO)',
        'Art. 23 — Responsabilidad por daños',
      ],
    },
    {
      num: '4',
      nombre: 'Ley General de Bancos (DFL N°3 de 1997)',
      ambito: 'Regula las operaciones bancarias en Chile.',
      relevancia: 'Establece obligaciones de gestión de riesgo operacional y tecnológico para entidades financieras supervisadas por la CMF.',
      estado: 'Vigente',
      articulos: ['Art. 70 — Obligación de gestión prudente y segura de los recursos'],
    },
    {
      num: '5',
      nombre: 'Normativa CMF — Circular N°3.506 y sucesoras',
      ambito: 'Regulación de gestión de riesgo tecnológico y ciberseguridad para bancos.',
      relevancia: 'El ataque evidenció incumplimientos en estándares mínimos de seguridad exigidos por la SBIF (hoy CMF), dando base para sanciones administrativas.',
      estado: 'Vigente (actualizada)',
      articulos: [],
    },
  ]

  const internacionales = [
    {
      num: '6',
      nombre: 'Convenio de Budapest (2001)',
      ambito: 'Tratado internacional que estandariza los delitos informáticos.',
      relevancia: 'Chile se adhirió en 2023 (no en 2018). Hubiera sido el marco de cooperación internacional para investigar el ataque.',
    },
    {
      num: '7',
      nombre: 'SWIFT Customer Security Programme (CSP)',
      ambito: 'Controles de seguridad obligatorios para todos los usuarios de la red SWIFT.',
      relevancia: 'El ataque explotó credenciales SWIFT. El banco debía cumplir con autenticación multifactor, monitoreo de transacciones y segregación de redes.',
    },
    {
      num: '8',
      nombre: 'Basilea III — Comité de Supervisión Bancaria de Basilea',
      ambito: 'Marco internacional para la gestión del riesgo operacional bancario.',
      relevancia: 'El riesgo tecnológico es parte del riesgo operacional. El ataque evidenció deficiencias en los modelos de gestión de riesgo del banco.',
    },
    {
      num: '9',
      nombre: 'ISO/IEC 27001:2013 — Seguridad de la información',
      ambito: 'Estándar internacional de gestión de seguridad.',
      relevancia: 'La CMF lo referencia. El ataque mostró ausencias en A.12.6 (gestión de vulnerabilidades) y A.16.1 (gestión de incidentes).',
    },
    {
      num: '10',
      nombre: 'GDPR — Reglamento General de Protección de Datos (UE, 2018)',
      ambito: 'Regulación europea de protección de datos.',
      relevancia: 'Valor comparativo: si el banco operara en la UE, habría enfrentado notificación en 72h y multas de hasta 4% de facturación global. Ilustra la brecha con la Ley 19.628 chilena.',
    },
  ]

  const tabla = [
    { norma: 'Ley 19.223 (1993)', tipo: 'Nacional — Penal', relevancia: 'Vigente al momento; tipificaba el sabotaje informático' },
    { norma: 'Ley 21.459 (2022)', tipo: 'Nacional — Penal', relevancia: 'Marco actual para tipificar los delitos del caso' },
    { norma: 'Ley 19.628 (1999)', tipo: 'Nacional — Civil', relevancia: 'Protección de datos personales de clientes' },
    { norma: 'DFL N°3 / Ley General de Bancos', tipo: 'Nacional — Regulatorio', relevancia: 'Obligaciones de gestión de riesgo del banco' },
    { norma: 'Normativa CMF (Circular 3.506+)', tipo: 'Nacional — Regulatorio', relevancia: 'Base de las sanciones administrativas impuestas' },
    { norma: 'Convenio de Budapest', tipo: 'Internacional', relevancia: 'Marco de cooperación policial y tipificación uniforme' },
    { norma: 'SWIFT CSP', tipo: 'Internacional — Sectorial', relevancia: 'Controles de seguridad incumplidos en la red SWIFT' },
    { norma: 'Basilea III', tipo: 'Internacional — Bancario', relevancia: 'Gestión del riesgo operacional tecnológico' },
    { norma: 'ISO 27001', tipo: 'Internacional — Técnico', relevancia: 'Estándar de referencia de la CMF para seguridad' },
    { norma: 'GDPR (UE)', tipo: 'Internacional', relevancia: 'Referencia comparativa de protección de datos' },
  ]

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Marco Normativo</h1>
      <p className="text-lg text-gray-500 mb-8">Leyes y regulaciones aplicables al caso Banco de Chile (2018)</p>

      {/* Nacionales */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Normas Nacionales (Chile)</h2>
        <div className="space-y-4">
          {nacionales.map((n, i) => (
            <motion.div
              key={n.num}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="border border-gray-200 rounded-xl p-5 bg-white"
            >
              <div className="flex items-start gap-3 mb-2">
                <span className="shrink-0 w-7 h-7 rounded-full bg-blue-900 text-white text-xs font-bold flex items-center justify-center">{n.num}</span>
                <h3 className="font-semibold text-gray-800">{n.nombre}</h3>
              </div>
              <p className="text-sm text-gray-500 mb-1 pl-10"><span className="font-medium text-gray-600">Ámbito:</span> {n.ambito}</p>
              <p className="text-sm text-gray-600 mb-2 pl-10"><span className="font-medium">Relevancia:</span> {n.relevancia}</p>
              {n.articulos.length > 0 && (
                <ul className="pl-10 space-y-1">
                  {n.articulos.map((a) => (
                    <li key={a} className="text-sm text-blue-700 bg-blue-50 rounded px-3 py-1">{a}</li>
                  ))}
                </ul>
              )}
              <p className="text-xs text-gray-400 pl-10 mt-2">{n.estado}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Internacionales */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Normas Internacionales</h2>
        <div className="space-y-4">
          {internacionales.map((n, i) => (
            <motion.div
              key={n.num}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="border border-gray-200 rounded-xl p-5 bg-white"
            >
              <div className="flex items-start gap-3 mb-2">
                <span className="shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">{n.num}</span>
                <h3 className="font-semibold text-gray-800">{n.nombre}</h3>
              </div>
              <p className="text-sm text-gray-500 mb-1 pl-10"><span className="font-medium text-gray-600">Ámbito:</span> {n.ambito}</p>
              <p className="text-sm text-gray-600 pl-10"><span className="font-medium">Relevancia:</span> {n.relevancia}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tabla resumen */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Resumen de normas aplicables</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="text-left p-3 rounded-tl-lg">Norma</th>
                <th className="text-left p-3">Tipo</th>
                <th className="text-left p-3 rounded-tr-lg">Relevancia al caso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tabla.map((row) => (
                <tr key={row.norma} className="hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-800">{row.norma}</td>
                  <td className="p-3 text-gray-500 whitespace-nowrap">{row.tipo}</td>
                  <td className="p-3 text-gray-600">{row.relevancia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </motion.div>
  )
}
