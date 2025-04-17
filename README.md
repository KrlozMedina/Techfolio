# Portafolio Web Personal

![GitHub Stars](https://img.shields.io/github/stars/KrlozMedina/Portafolio) 
![GitHub Forks](https://img.shields.io/github/forks/KrlozMedina/Portafolio) 
![GitHub Tag](https://img.shields.io/github/tag/KrlozMedina/Portafolio) 
![GitHub Release](https://img.shields.io/github/release/KrlozMedina/Portafolio) 
![GitHub Issues](https://img.shields.io/github/issues/KrlozMedina/Portafolio)

## Descripción

Este repositorio contiene el código fuente de mi portafolio web personal, desarrollado con **React**, **CSS**, y una **API personalizada**. Este portafolio es una muestra de mis proyectos, habilidades y experiencia como desarrollador de software. 

El portafolio incluye:
- Una interfaz interactiva y atractiva.
- Soporte para múltiples idiomas (español e inglés).
- Una API personalizada para gestionar y mostrar información actualizada sobre mis proyectos y estudios.

El objetivo principal de este portafolio es proporcionar una visión clara y profesional de mi trabajo, habilidades y experiencia, permitiendo a los visitantes explorar mis proyectos destacados, mi formación académica y mi experiencia laboral.

---

## Características principales

- **Diseño moderno y responsive**: Adaptado para dispositivos móviles, tabletas y escritorios.
- **Gestión dinámica de contenido**: Alimentado por una [API personalizada](https://github.com/KrlozMedina/PortafolioAPI).
- **Soporte multilingüe**: Cambia entre español e inglés para una experiencia inclusiva.
- **Secciones clave**:
  - Proyectos destacados.
  - Experiencia laboral y educación.
  - Testimonios de clientes.
  - Formulario de contacto.

---

## Diseño

El diseño del portafolio fue creado utilizando [Figma](https://www.figma.com/), teniendo en cuenta la usabilidad y la experiencia del usuario.

### Captura de pantalla del diseño:
![Captura de pantalla del diseño del portafolio](./src/assets/MuestraFigma.png)

### Enlace al diseño interactivo:
[Diseño en Figma](https://www.figma.com/file/u8Z7UxAuamfPEz4rvxnIcA?type=design)

---

## Demostración en Vivo

Puedes explorar mi portafolio en vivo en [krlozmedina.dev](https://krlozmedina.dev), alojado y desplegado utilizando los servicios gratuitos de [Vercel](https://vercel.com/).

### Secciones destacadas:
1. **Proyectos**: Galería interactiva de proyectos destacados.
2. **Perfil**: Información sobre habilidades, experiencia y pasiones.
3. **Contactarme**: Formulario para comunicarte conmigo.
4. **Blog**: Artículos y publicaciones técnicas.

---

## Tecnologías Utilizadas

En el desarrollo de este portafolio, utilicé las siguientes tecnologías:

- **Next.js**: Framework principal para la creación de la interfaz de usuario.
- **CSS**: Para el diseño y estilización, asegurando un diseño moderno y responsive.
- **Figma**: Herramienta de diseño para planificar y visualizar el diseño antes de codificar.
- **Vercel**: Para el alojamiento y despliegue del portafolio.
- **MongoDB**: Base de datos para almacenar la informacion del portafolio.

---

## Estructura de las páginas

```plaintext
src/
└── app/
    ├── home/                # Página principal
    │   ├── page.tsx
    │   └── page.module.css
    ├── profile/             # Agrupación de "Perfil"
    │   ├── about-me/
    │   │   ├── page.tsx
    │   │   └── page.module.css
    │   ├── education/
    │   │   ├── page.tsx
    │   │   └── page.module.css
    │   ├── skills/
    │   │   ├── page.tsx
    │   │   └── page.module.css
    │   ├── certifications/
    │   │   ├── page.tsx
    │   │   └── page.module.css
    │   ├── experience/
    │   │   ├── page.tsx
    │   │   └── page.module.css
    │   └── achievements/
    │       ├── page.tsx
    │       └── page.module.css
    ├── projects/            # Agrupación de "Proyectos"
    │   ├── page.tsx
    │   ├── page.module.css
    │   ├── services/
    │   │   ├── page.tsx
    │   │   └── page.module.css
    │   ├── testimonials/
    │   │   ├── page.tsx
    │   │   └── page.module.css
    │   └── case-studies/
    │       ├── page.tsx
    │       └── page.module.css
    ├── blog/                # Página del blog
    │   ├── page.tsx
    │   └── page.module.css
    ├── contact/             # Página de contacto
    │   ├── page.tsx
    │   └── page.module.css
    ├── clients/             # Página de clientes
    │   ├── page.tsx
    │   └── page.module.css
    ├── resources/           # Página de recursos
    │   ├── page.tsx
    │   └── page.module.css
    └── gallery/             # Página de galería
        ├── page.tsx
        └── page.module.css
```

## Descripción de las páginas

1. Página principal (home)
- Ruta: /
- Descripción: Página de inicio que presenta un resumen de tu portafolio, destacando tu perfil, proyectos y habilidades.

2. Sección "Perfil" (profile)
Agrupa páginas relacionadas con tu información personal y profesional.
- Ruta principal: /profile
- Subpáginas:
    - Sobre mí (about-me):
        - Ruta: /profile/about-me
        - Descripción: Información personal, experiencia y habilidades.
    - Educación (education):
        - Ruta: /profile/education
        - Descripción: Formación académica y certificaciones.
    - Habilidades (skills):
        - Ruta: /profile/skills
        - Descripción: Lenguajes de programación, tecnologías y habilidades blandas.
    - Certificaciones (certifications):
        - Ruta: /profile/certifications
        - Descripción: Certificaciones profesionales y técnicas.
    - Experiencia laboral (experience):
        - Ruta: /profile/experience
        - Descripción: Detalle de tu experiencia profesional.
    - Logros (achievements):
        - Ruta: /profile/achievements
        - Descripción: Premios, reconocimientos y contribuciones destacadas.

3. Sección "Proyectos" (projects)
Agrupa páginas relacionadas con tus proyectos y servicios.
- Ruta principal: /projects
- Subpáginas:
    - Servicios (services):
        - Ruta: /projects/services
        - Descripción: Servicios ofrecidos relacionados con los proyectos.
    - Testimonios (testimonials):
        - Ruta: /projects/testimonials
        - Descripción: Opiniones de clientes o colaboradores sobre los proyectos.
    - Casos de éxito (case-studies):
        - Ruta: /projects/case-studies
        - Descripción: Proyectos destacados con detalles sobre el problema, la solución y los resultados.

4. Blog (blog)
- Ruta: /blog
- Descripción: Artículos y publicaciones relacionadas con tecnología, desarrollo y automatización.

5. Contacto (contact)
- Ruta: /contact
- Descripción: Página para que los visitantes puedan contactarte.
- Contenido sugerido:
    - Formulario de contacto.
    - Información de contacto (correo electrónico, teléfono, redes sociales).
    - Enlace para descargar tu CV.

6. Página "Clientes" (clients)
- Ruta: /clients
- Descripción: Lista de clientes con los que has trabajado, incluyendo logos y breves descripciones de los proyectos realizados.

7. Página "Recursos" (resources)
- Ruta: /resources
- Descripción: Comparte recursos útiles relacionados con tu área de especialización, como herramientas, artículos o tutoriales.

8. Página "Galería" (gallery)
- Ruta: /gallery
- Descripción: Muestra imágenes relacionadas con tus proyectos, eventos o logros.

## Licencia
Este proyecto está bajo la licencia Creative Commons Attribution-NonCommercial (CC BY-NC). Puedes compartir y modificar el código, siempre que atribuyas la autoría y no lo utilices con fines comerciales.

## Contacto
Si tienes preguntas o deseas colaborar, no dudes en contactarme:
- Correo: tuemail@example.com
- LinkedIn: linkedin.com/in/krlozmedina
- Portafolio: krlozmedina.com