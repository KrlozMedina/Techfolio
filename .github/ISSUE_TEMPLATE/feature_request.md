---
name: ✨ Solicitud de Nueva Funcionalidad
description: Sugiere una idea o mejora para el proyecto.
title: "[FEATURE] - "
labels: ["enhancement"]
assignees: ["KrlozMedina"]

body:
  - type: textarea
    id: que-funcionalidad
    attributes:
      label: ¿Qué funcionalidad quieres?
      description: Describe la nueva funcionalidad o mejora que propones.
      placeholder: "Me gustaría poder filtrar los proyectos por categoría..."
    validations:
      required: true

  - type: dropdown
    id: alcance
    attributes:
      label: Alcance
      options:
        - Frontend
        - Backend
        - API
        - Infraestructura
        - Documentación

  - type: textarea
    id: motivo
    attributes:
      label: ¿Por qué sería útil?
      description: Explica el valor de esta funcionalidad.

  - type: textarea
    id: criterios
    attributes:
      label: Criterios de aceptación
      placeholder: |
        - [ ] Funcionalidad implementada
        - [ ] Pruebas pasan
        - [ ] Documentación actualizada

  - type: textarea
    id: notas-extra
    attributes:
      label: Notas adicionales
