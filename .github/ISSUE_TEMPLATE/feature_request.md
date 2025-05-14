---
name: ✨ Solicitud de Nueva Funcionalidad
description: Sugiere una idea o mejora para el proyecto.
title: "[FEATURE] - título corto y descriptivo"
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

  - type: textarea
    id: motivo
    attributes:
      label: ¿Por qué sería útil?
      description: Explica por qué mejoraría el proyecto esta funcionalidad.

  - type: textarea
    id: notas-extra
    attributes:
      label: Notas adicionales
      description: Deja cualquier comentario extra, diseño o ideas relacionadas.
