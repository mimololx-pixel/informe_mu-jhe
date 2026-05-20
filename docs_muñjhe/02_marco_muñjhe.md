# Marco Normativo — Caso Banco de Chile (2018)

## Criterio 2.1.1 — Leyes y regulaciones aplicables al caso

Este análisis presenta el marco normativo nacional e internacional aplicable al ataque de mayo de 2018 al Banco de Chile. Dado que el incidente involucró destrucción de sistemas, fraude financiero vía SWIFT y potencial exposición de datos de clientes, convergen múltiples cuerpos normativos.

---

## Normas Nacionales (Chile)

### 1. Ley 19.223 (1993) — Relativa a delitos informáticos *(vigente al momento del ataque)*

- **Ámbito:** Fue la primera ley chilena de delitos informáticos.
- **Relevancia para el caso:** Tipificaba la sabotaje informático (destrucción de sistemas, como el uso del KillMBR) y el acceso no autorizado a sistemas.
- **Limitación:** Esta ley era considerada insuficiente y desactualizada; no contemplaba adecuadamente ataques a infraestructura crítica ni transferencias fraudulentas.
- **Estado actual:** Derogada y reemplazada por la Ley 21.459 en 2022.

### 2. Ley 21.459 (2022) — Establece normas sobre delitos informáticos *(análisis retroactivo)*

- **Ámbito:** Moderniza el derecho penal informático chileno conforme al Convenio de Budapest.
- **Relevancia para el caso:** Si este incidente ocurriera hoy, sería el principal cuerpo normativo para tipificar los delitos de acceso no autorizado, daño informático, interceptación de datos y fraude informático.
- **Artículos clave aplicables:**
  - Art. 2: Acceso ilícito a sistema informático
  - Art. 3: Interceptación ilícita de datos
  - Art. 4: Ataque a la integridad de un sistema informático (instalación del KillMBR)
  - Art. 6: Fraude informático (transferencias SWIFT fraudulentas)
  - Art. 8: Abuso de dispositivos (uso de herramientas de hacking)
  - Art. 10: Agravante por afectación a infraestructura crítica

### 3. Ley 19.628 (1999) — Protección de la vida privada y datos personales

- **Ámbito:** Regula el tratamiento de datos personales en Chile.
- **Relevancia para el caso:** El Banco de Chile, como responsable del tratamiento de datos de millones de clientes, tenía obligaciones de seguridad. La brecha comprometió potencialmente datos personales financieros (RUT, cuentas, saldos).
- **Artículos clave:**
  - Art. 11: Deber de custodia y seguridad en el tratamiento de datos
  - Art. 12: Derechos de los titulares (ARCO)
  - Art. 23: Responsabilidad por daños derivados del tratamiento

### 4. Ley General de Bancos (DFL N°3 de 1997, con modificaciones)

- **Ámbito:** Regula las operaciones bancarias en Chile.
- **Relevancia:** Establece las obligaciones de gestión de riesgo operacional y tecnológico para entidades financieras supervisadas por la CMF.
- **Artículo 70:** Obligación de gestión prudente y segura de los recursos.

### 5. Normativa CMF — Circular N°3.506 y sucesoras

- **Ámbito:** Regulación de gestión de riesgo tecnológico y ciberseguridad para bancos.
- **Relevancia:** El ataque evidenció incumplimientos en los estándares mínimos de seguridad exigidos por la entonces SBIF (hoy CMF), dando base para las sanciones administrativas impuestas.

---

## Normas Internacionales

### 6. Convenio de Budapest (2001) — Convenio sobre la Ciberdelincuencia

- **Ámbito:** Tratado internacional que estandariza los delitos informáticos entre los países miembros.
- **Relevancia:** Chile se adhirió formalmente en 2023 (en 2018 no era parte), pero la Ley 21.459 fue diseñada para ser compatible con este convenio. Hubiera sido el marco de cooperación internacional para investigar el ataque.

### 7. SWIFT Customer Security Programme (CSP)

- **Ámbito:** Conjunto de controles de seguridad obligatorios para todos los usuarios de la red SWIFT.
- **Relevancia directa:** El ataque al Banco de Chile explotó las credenciales SWIFT. El banco estaba obligado a cumplir con los controles del CSP (autenticación multifactor, monitoreo de transacciones, segregación de redes).
- **Normas específicas:**
  - Control 1.1: Restricción de acceso a Internet
  - Control 2.1: Autenticación de usuarios SWIFT
  - Control 6.1: Detección de anomalías en transacciones

### 8. Basilea III — Acuerdo de Capital del Comité de Supervisión Bancaria de Basilea

- **Ámbito:** Marco internacional para la gestión del riesgo operacional bancario.
- **Relevancia:** El riesgo tecnológico y cibernético se considera parte del riesgo operacional. El ataque evidenció deficiencias en los modelos de gestión de riesgo operacional del banco.

### 9. ISO/IEC 27001:2013 — Sistemas de gestión de seguridad de la información

- **Ámbito:** Estándar internacional de gestión de seguridad.
- **Relevancia:** Aunque no es de cumplimiento obligatorio por ley, la CMF referencia estos estándares. El ataque demostró ausencias en controles como:
  - A.12.6: Gestión de vulnerabilidades técnicas
  - A.16.1: Gestión de incidentes de seguridad

### 10. GDPR — Reglamento General de Protección de Datos (UE, 2018)

- **Ámbito:** Regulación europea de protección de datos.
- **Relevancia (hipotética):** Si el Banco de Chile operara en la UE o manejara datos de ciudadanos europeos, el incidente habría desencadenado la obligación de notificación a la autoridad de control en 72 horas y posibles multas de hasta el 4% del volumen de negocios global (Art. 83).
- **Valor comparativo:** Ilustra la brecha entre la protección que ofrecía la Ley 19.628 chilena (sin multas significativas ni notificación obligatoria) y el GDPR.

---

## Resumen de normas aplicables

| Norma | Tipo | Relevancia al caso |
|---|---|---|
| Ley 19.223 (1993) | Nacional — Penal | Vigente al momento del ataque; tipificaba el sabotaje informático |
| Ley 21.459 (2022) | Nacional — Penal | Marco actual para tipificar los delitos del caso |
| Ley 19.628 (1999) | Nacional — Civil | Protección de datos personales de clientes del banco |
| DFL N°3 / Ley General de Bancos | Nacional — Regulatorio | Obligaciones de gestión de riesgo del banco |
| Normativa CMF (Circular 3.506+) | Nacional — Regulatorio | Base de las sanciones administrativas impuestas |
| Convenio de Budapest | Internacional | Marco de cooperación policial y tipificación uniforme |
| SWIFT CSP | Internacional — Sectorial | Controles de seguridad incumplidos en la red SWIFT |
| Basilea III | Internacional — Bancario | Gestión del riesgo operacional tecnológico |
| ISO 27001 | Internacional — Técnico | Estándar de referencia de la CMF para seguridad |
| GDPR (UE) | Internacional | Referencia comparativa de protección de datos |
