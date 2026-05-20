# Bitácora de Uso de Inteligencia Artificial — Caso Banco de Chile (2018)

## Herramienta utilizada

**Claude Code (claude-sonnet-4-6)** — CLI de Anthropic, integrado directamente en el entorno de desarrollo.

---

## Prompts por fase

### Fase 1 — Resumen ejecutivo

**Prompt utilizado:**
> "Redacta el resumen ejecutivo del caso Banco de Chile de mayo de 2018, donde atacantes usaron el malware KillMBR para inutilizar ~9.000 equipos y simultáneamente ejecutaron transferencias SWIFT fraudulentas por USD 10 millones. Incluye: fecha exacta, actores involucrados (banco, atacantes, CMF, SWIFT, bancos corresponsales), secuencia del ataque paso a paso, e impacto en dimensiones financiera, operacional, reputacional, regulatoria y de datos personales."

**Sección:** 01_resumen_muñjhe.md + componente Resumen.jsx  
**¿Qué se aceptó?** La estructura completa: ficha del caso, descripción narrativa, tabla de impactos, línea de tiempo y tabla de actores.  
**¿Qué se corrigió?** Se precisó que la atribución al Grupo Lazarus es informal y nunca fue establecida judicialmente.  
**Reflexión:** Mencionar el nombre del malware (KillMBR), el monto exacto (USD 10M) y los destinos (Hong Kong, Madrid) permitió obtener un análisis concreto, no genérico.

---

### Fase 2 — Marco normativo

**Prompt utilizado:**
> "Redacta el marco normativo nacional e internacional aplicable al caso Banco de Chile 2018. Incluye: Ley 19.223 (vigente al momento), Ley 21.459 (análisis retroactivo con artículos clave), Ley 19.628, Ley General de Bancos, normativa CMF, Convenio de Budapest, SWIFT CSP, Basilea III, ISO 27001 y GDPR como referencia comparativa. Para cada norma indica ámbito, relevancia específica al caso y artículos aplicables."

**Sección:** 02_marco_muñjhe.md + componente Marco.jsx  
**¿Qué se aceptó?** La estructura completa: cards numeradas para normas nacionales e internacionales, artículos destacados en color y tabla resumen final.  
**¿Qué se corrigió?** Se aclaró que el GDPR se incluye como referencia comparativa hipotética, no como norma directamente aplicable al caso.  
**Reflexión:** Especificar los artículos concretos de cada ley (no solo el nombre de la norma) permitió obtener un análisis jurídico preciso y citable, en lugar de una descripción genérica.

---

*Los prompts de las fases 3 a 8 se irán registrando a medida que se ejecute cada fase.*
