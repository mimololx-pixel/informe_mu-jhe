# Resumen Ejecutivo — Caso Banco de Chile (2018)

## ¿Qué ocurrió?

En mayo de 2018, el Banco de Chile sufrió uno de los ciberataques más sofisticados registrados en el sistema financiero latinoamericano. El ataque combinó dos vectores simultáneos: la destrucción masiva de infraestructura interna mediante malware (KillMBR/MBR Killer) y la ejecución de transferencias fraudulentas a través de la red SWIFT.

## Fecha y contexto

- **Fecha del ataque:** 24 de mayo de 2018
- **Lugar:** Chile — Banco de Chile (banco privado, segundo mayor del país en esa época)
- **Contexto:** El ataque ocurrió durante horario laboral, lo que permitió a los atacantes operar mientras el personal de TI estaba ocupado gestionando la crisis interna generada por el malware.

## ¿Quiénes participaron?

| Actor | Rol |
|---|---|
| Atacantes externos | Autores del ataque (presuntamente el Grupo Lazarus, vinculado a Corea del Norte) |
| Banco de Chile | Víctima principal; responsable de la protección de activos y datos de clientes |
| Red SWIFT | Canal utilizado para las transferencias fraudulentas |
| Bancos corresponsales (Hong Kong, Madrid) | Receptores intermediarios de los fondos robados |
| Comisión para el Mercado Financiero (CMF) | Organismo regulador; investigó y sancionó al banco |

## ¿Cómo ocurrió? (Secuencia del ataque)

1. **Infiltración inicial:** Los atacantes accedieron a la red interna semanas antes del ataque visible, probablemente mediante phishing o explotación de vulnerabilidades en software desactualizado.
2. **Instalación del malware KillMBR:** Se distribuyó un malware que sobrescribía el MBR (Master Boot Record) de los equipos, dejándolos inoperativos al reiniciar.
3. **Activación de la distracción:** El 24 de mayo se activó simultáneamente el KillMBR en aproximadamente 9.000 estaciones de trabajo y servidores, generando caos operativo total.
4. **Ejecución de transferencias SWIFT:** Mientras el equipo de TI intentaba responder a la crisis, los atacantes ejecutaron órdenes de transferencia fraudulentas hacia cuentas en Hong Kong y Madrid.
5. **Exfiltración de fondos:** Se transfirieron aproximadamente USD 10 millones. Una parte fue recuperada gracias a la coordinación con los bancos corresponsales.

## Impacto

| Dimensión | Descripción |
|---|---|
| **Financiero** | USD 10 millones transferidos fraudulentamente (aproximadamente USD 6 millones no recuperados) |
| **Operacional** | ~9.000 equipos inutilizados; suspensión parcial de servicios por varios días |
| **Reputacional** | Cobertura mediática masiva; desconfianza de clientes y accionistas |
| **Regulatorio** | Investigación y multa por parte de la CMF; exigencia de mejoras en ciberseguridad |
| **Datos personales** | Posible exposición de datos de clientes almacenados en sistemas comprometidos |

## Atribución

Las investigaciones de empresas de ciberseguridad (Trend Micro, Group-IB) apuntaron al **Grupo Lazarus**, una unidad de ciberespionaje y cibersabotaje atribuida al gobierno de Corea del Norte. Sin embargo, **nunca se estableció responsabilidad penal** formal ante tribunales chilenos o internacionales. Los atacantes operaron desde múltiples jurisdicciones, dificultando la persecución judicial.

## Relevancia para el análisis legal

Este caso es especialmente relevante porque:
- Combina delitos informáticos (destrucción de sistemas) con delitos económicos (fraude financiero)
- Involucra regulación financiera, protección de datos y legislación penal informática
- Permite analizar la aplicación de la Ley 21.459 (delitos informáticos) y la Ley 19.628 (datos personales) en un contexto bancario real
- Ilustra las brechas normativas existentes en Chile al momento del ataque (2018), cuando aún regía la antigua Ley 19.223
