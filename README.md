# Salesforce Challenge - Engagement Management System

Código Fuente [loadept.com/s/rDvO](https://loadept.com/s/rDvO)

Entorno: Salesforce Developer Edition

# Reto

Implementación de un sistema de gestión de proyectos personalizados y su integración con el ciclo de Oportunidades. El proyecto incluye lógica en el lado del servidor usando Apex, componentes web con LWC y Flujos.

## Componentes Técnicos y Rutas

### Backend

Lógica encargada de la recuperación de datos de forma segura.

* Ruta en github:
    - [/force-app/main/default/classes/EngagementController.cls](https://loadept.com/s/FuOV)
* Método
    - `getEngagementId`.

### Frontend

Interfaz de usuario reactiva para visualización de metadatos.

* Ruta en github:
    - [/force-app/main/default/lwc/engagementIdViewer/](https://loadept.com/s/7jCE)
* Descripción
    - Consumo de datos mediante el *Wire Service* para mostrar el identificador del registro actual.

### Automatización

* Nombre
    - `Opp_Negotiation_Task_Automation`
* Lógica
    - Record-Triggered Flow sobre `Opportunity`. Dispara la creación de una tarea técnica cuando la etapa cambia a Negotiation/Review. Incluye manejo de excepciones mediante un Fault Path.

## Guía de Pruebas

| # | Item | Acción | Resultado Esperado |
| --- | --- | --- | --- |
| 3-4 | Data Model | Crear un registro en el objeto *Engagement*. | Persistencia correcta en la DB de Salesforce. |
| 5 | LWC & Apex | Abrir el registro creado. | El componente debe renderizar el ID dinámicamente. |
| 6 | Activities | Usar el panel lateral para registrar una llamada. | El registro debe quedar logueado en la línea de tiempo. |
| 7 | Flow | Cambiar etapa de una Opp a `Negotiation/Review`. | Creación automática de la tarea Prepare proposal. |
| 8 | Reporting | Abrir el informe `Engagement Pipeline`. | Visualización de montos agrupados por estado. |


# Capturas

### 1. Engagement Record + LWC

![Captura 1](https://assets.loadept.com/r/Captura%20de%20pantalla_20260315_140156.png)

*Visualización del componente Lightning integrado en la página de registro de Engagement, mostrando el ID obtenido vía Apex.*

### 2. Registro de Actividad

![Captura 2](https://assets.loadept.com/r/Captura%20de%20pantalla_20260315_135959.png)

*Ejemplo de log de interacción (llamada/email) guardado en la línea de tiempo del registro.*

### 3. Ejecución del Flow

![Captura 3](https://assets.loadept.com/r/Captura%20de%20pantalla_20260315_140441.png)
![Captura 3.1](https://assets.loadept.com/r/Captura%20de%20pantalla_20260315_140557.png)

*Evidencia de la tarea generada automáticamente por el sistema tras el cambio de estado en la Oportunidad relacionada.*

### 4. Reporte y Gráfico

![Captura 4](https://assets.loadept.com/r/Captura%20de%20pantalla_20260315_141623.png)

*Informe `Engagement Pipeline` mostrando la distribución de montos. El nombre del List View utilizado es `All Engagements`.*

### 5. otras
![otros 1](https://assets.loadept.com/r/Captura%20de%20pantalla_20260315_141956.png)
![otros 2](https://assets.loadept.com/r/Captura%20de%20pantalla_20260315_142258.png)

# Notas

* Se implementó una fórmula lógica en el Flow para asegurar que la fecha de vencimiento de las tareas no caiga en fin de semana.
* Se asumió una relación de tipo *Lookup* de Oportunidad a Engagement para mantener la flexibilidad del modelo de datos.
* Se aplicaron modificadores `with sharing` en Apex para respetar la jerarquía de roles de Salesforce.
