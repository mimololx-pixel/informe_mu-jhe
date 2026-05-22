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

### Fase 3 — Tipificación de delitos informáticos

**Prompt utilizado:**
> "Ejecutemos la fase 3, pero intentemos mejorar con algunas interacciones bonitas en la página de Vercel para que sea bien interactivo."

**Sección:** 03_delitos_muñjhe.md + componente Delitos.jsx  
**¿Qué se aceptó?** La estructura completa: stats row con 4 métricas clave, filtros de categoría por pills, cards expandibles con acordeón (texto legal, conexión con el ataque, fundamento jurídico, barra de severidad visual), tabla resumen y panel colapsable de escenario hipotético en tribunales chilenos.  
**¿Qué se corrigió?** Ninguna corrección necesaria en esta fase.  
**Reflexión:** Pedir interactividad explícita (acordeón, filtros, barra de pena) antes de la implementación produjo un componente con 3 estados `useState` bien definidos desde el diseño, sin deuda técnica posterior.

---

### Fase 4 — Comparación de marcos regulatorios

**Prompt utilizado:**
> "ejecuta la fase 4, y agrega colores a las 4 fases que llevamos y la barra lateral derecha que despliega los modulos hazla mas bonita y dale una buena ubicacion. dame sugerencias y preguntas si lo concideras necesario."

**Sección:** 04_comparacion_muñjhe.md + componente Comparacion.jsx  
**¿Qué se aceptó?** La estructura completa: banner emerald de sección, tres ejes de comparación (industria, jurisdicción, temporal), tabla por industria con headers coloreados (Banca/Salud/Telecom), 3 cards de jurisdicción en panel oscuro con barras de multa proporcionales, tabla completa jurisdiccional, comparativa 2018 vs 2026 en grid before/after y bloque de síntesis con 4 conclusiones. Además: banner de color a Marco (indigo) y Delitos (rojo), sidebar desktop rediseñado con barra de progreso 4/8 y color por sección, drawer móvil con slide-in animado y backdrop desde el menú hamburguesa.  
**¿Qué se corrigió?** Ninguna corrección necesaria en esta fase.  
**Reflexión:** Combinar múltiples solicitudes (fase nueva + mejoras visuales + UI) en un solo prompt requirió planificación explícita en modo /plan antes de ejecutar. Separar el análisis del diseño evitó ambigüedades en la implementación.

---

### Fase 5 — Responsabilidades legales de los actores

**Prompt utilizado:**
> "ejecutemos la fase 5, pero necesito que la mejores visualmente si es necesario utiliza de ejemplo alguna pagina de confianza de la web. Hazme sugerencias o preguntas si es optimo."

**Sección:** 05_responsabilidades_muñjhe.md + componente Responsabilidades.jsx  
**¿Qué se aceptó?** La estructura completa: banner amber de sección, stats row con 4 KPIs animados (5 actores, 6 delitos, USD 10M+ daños, 0 condenas firmes), matriz de responsabilidades tipo heatmap legal (3 tipos × 5 actores) con tooltips hover que muestran la norma aplicable, cards expandibles por actor con tablas de detalle penal/civil/administrativa y panel de obstáculos prácticos para los atacantes, tabla resumen final con badges coloreados y panel colapsable con nota sobre Ley 20.393.  
**¿Qué se corrigió?** Ninguna corrección necesaria en esta fase.  
**Reflexión:** La combinación de matriz heatmap + acordeón elegida mediante pregunta previa al usuario permitió obtener un componente con dos niveles de lectura: vista rápida (matriz) y análisis detallado (acordeón). Preguntar el layout antes de implementar evitó iterar sobre el diseño.

---

### Fase 6 — Datos personales y Ley 19.628

**Prompt utilizado:**
> "lee el .md y ejecuta la fase que corresponda"

**Sección:** 06_datos_muñjhe.md + componente Datos.jsx  
**¿Qué se aceptó?** La estructura completa: banner purple con dot-grid (Criterio 2.1.5), stats row con 4 KPIs animados (5 categorías / 4 derechos ARCO / 4 obligaciones / 6 años hasta reforma), tabla de sistemas comprometidos + tabla de categorías de datos (columnas), cards expandibles de obligaciones legales con cita legal y badge de estado (Incumplida/Vulnerada/Vacío legal), cards ARCO expandibles (A/R/C/O) con relevancia al caso, panel de secreto bancario + tabla comparativa Ley 19.628 vs GDPR, y grid de la Reforma Ley 21.719 con bloque de conclusión.  
**¿Qué se corrigió?** Ninguna corrección necesaria en esta fase.  
**Reflexión:** Delegar la lectura del .md directamente al asistente ("lee el .md y ejecuta la fase que corresponda") funcionó de forma óptima porque el contexto de memoria ya contenía la ruta del archivo y el patrón visual establecido. Un prompt mínimo produjo un componente completo gracias a la memoria acumulada de las fases anteriores.

---

### Fase 7 — Conclusiones y Recomendaciones

**Prompt utilizado:**
> "ejecutemos la fase 7, pero me percate que hay parrafos donde las palabras se separan mucho ( hola         hola) algo asi"

**Sección:** 07_conclusiones_muñjhe.md + componente Conclusiones.jsx  
**¿Qué se aceptó?** La estructura completa: banner teal con dot-grid, stats row con 4 KPIs animados (5 conclusiones / 12 recomendaciones / 8 años de evolución / 3 leyes modernizadas), grid de 5 conclusiones numeradas con badge de estado y panel de detalle al hover, tabla de recomendaciones con 3 tabs (Alta prioridad / Media / Largo plazo) y panel de justificación técnica al hover de fila, sección de reflexión final con 3 puntos animados con stagger y bloque de cierre con síntesis. Además: fix global del bug `text-align: justify` — se agregaron `text-align-last: left` y `hyphens: auto` en `index.css`, y `lang="es"` en `index.html` para activar el silabeo automático en español.  
**¿Qué se corrigió?** El bug de justificación fue detectado por el usuario antes de ejecutar la fase. Se corrigió como parte del mismo commit.  
**Reflexión:** Combinar una corrección de bug con la implementación de una nueva fase en un único prompt fue eficiente: el contexto de la sesión ya tenía el patrón visual completo, por lo que el asistente pudo aplicar el fix y construir el componente en la misma pasada sin iteraciones adicionales.

---

### Fase 8 — Bitácora de Uso de IA

**Prompt utilizado:**
> "ejecutas la fase 8, sugiere mejoras si lo concideras optimo y hazme preguntas."

**Sección:** 08_prompts_muñjhe.md + componente Prompts.jsx  
**¿Qué se aceptó?** La estructura completa: banner gray con dot-grid, stats row con 4 KPIs (8 fases / 6 sin corrección / 1 herramienta / 64 palabras en el prompt más extenso), acordeón de 8 entradas con header compacto (número, título, badge Sin corrección / Con ajuste) y body expandible (blockquote del prompt, qué se aceptó, corrección si hubo, reflexión con borde izquierdo gris).  
**¿Qué se corrigió?** Ninguna corrección necesaria en esta fase.  
**Reflexión:** El usuario solicitó sugerencias explícitas antes de ejecutar la fase. Esto permitió acordar el layout (acordeón) y la sección de stats antes de implementar, evitando iteraciones de diseño posteriores. La bitácora se beneficia de ser la última fase: tiene acceso a todos los prompts anteriores como datos completos.
