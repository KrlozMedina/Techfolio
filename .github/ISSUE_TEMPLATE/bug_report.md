name: 🐛 Reporte de Bug
description: Reportar un error en el proyecto.
title: "[BUG] - título corto y descriptivo"
labels: ["bug"]
assignees: ["KrlozMedina"]

body:
  - type: textarea
    id: que-pasa
    attributes:
      label: ¿Qué sucede?
      description: Describe el error de manera clara y concisa.
      placeholder: "Cuando hago click en el botón de login, la página se congela..."
    validations:
      required: true

  - type: textarea
    id: pasos-reproducir
    attributes:
      label: Pasos para reproducir
      description: Enumera los pasos para reproducir el error.
      placeholder: |
        1. Ir a la página de login
        2. Escribir usuario y contraseña
        3. Hacer click en 'Login'
        4. Aparece error 500
    validations:
      required: true

  - type: input
    id: navegador
    attributes:
      label: Navegador o dispositivo
      description: Indica navegador y sistema operativo usado.
      placeholder: "Chrome 123, Windows 11"

  - type: textarea
    id: evidencia
    attributes:
      label: Evidencias (capturas/logs)
      description: Adjunta imágenes o logs si es posible.
