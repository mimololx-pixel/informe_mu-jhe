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
    { tipo: 'Financiero', desc: 'USD 10 millones transferidos fraudulentamente (~USD 6M no recuperados)', color: 'bg-red-100 border-red-400 text-red-800' },
    { tipo: 'Operacional', desc: '~9.000 equipos inutilizados; suspensión parcial de servicios por días', color: 'bg-orange-100 border-orange-400 text-orange-800' },
    { tipo: 'Reputacional', desc: 'Cobertura mediática masiva; desconfianza de clientes y accionistas', color: 'bg-yellow-100 border-yellow-400 text-yellow-800' },
    { tipo: 'Regulatorio', desc: 'Investigación y multa de la CMF; exigencia de mejoras en ciberseguridad', color: 'bg-blue-100 border-blue-400 text-blue-800' },
    { tipo: 'Datos personales', desc: 'Posible exposición de datos de clientes en sistemas comprometidos', color: 'bg-purple-100 border-purple-400 text-purple-800' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Resumen Ejecutivo</h1>
      <p className="text-lg text-gray-500 mb-8">Caso Banco de Chile — Ataque SWIFT + KillMBR (Mayo 2018)</p>

      {/* Ficha del caso */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-gray-800 text-white rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Fecha</p>
          <p className="text-xl font-semibold">24 mayo 2018</p>
        </div>
        <div className="bg-gray-800 text-white rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Víctima</p>
          <p className="text-xl font-semibold">Banco de Chile</p>
        </div>
        <div className="bg-red-700 text-white rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-red-200 mb-1">Pérdida estimada</p>
          <p className="text-xl font-semibold">USD ~6M (neto)</p>
        </div>
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
          {impactos.map((i) => (
            <div key={i.tipo} className={`border-l-4 rounded-r-lg p-4 ${i.color}`}>
              <span className="font-semibold">{i.tipo}:</span> {i.desc}
            </div>
          ))}
        </div>
      </section>

      {/* Línea de tiempo */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Línea de tiempo</h2>
        <div className="relative border-l-2 border-gray-300 pl-6 space-y-6">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-gray-800 border-2 border-white"></div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{item.date}</p>
              <p className="text-gray-700 mt-1">{item.event}</p>
            </div>
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
    </div>
  )
}
