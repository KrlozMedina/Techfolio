# Portafolio Web Personal

![](https://img.shields.io/github/stars/KrlozMedina/Portafolio) ![](https://img.shields.io/github/forks/KrlozMedina/Portafolio) ![](https://img.shields.io/github/tag/KrlozMedina/Portafolio) ![](https://img.shields.io/github/release/KrlozMedina/Portafolio) ![](https://img.shields.io/github/issues/KrlozMedina/Portafolio)
## Descripción

Este repositorio contiene el código fuente de mi portafolio web personal construido con React y CSS. El portafolio web es una muestra de mis proyectos y habilidades como desarrollador de software y se alimenta de una [API personalizada](https://github.com/KrlozMedina/PortafolioAPI) que he creado para administrar y mostrar mi información.

La API personalizada me permite gestionar de manera eficiente la información sobre mis proyectos y estudios. Además, garantiza que mi portafolio web se mantenga actualizado y refleje de manera precisa mi trabajo más reciente.

El portafolio web presenta una interfaz interactiva y atractiva, con la posibilidad de cambiar entre los idiomas español e inglés para una experiencia más inclusiva. Incluye una selección de mis proyectos destacados, una sección de experiencia laboral y educación, y un formulario de contacto para que los visitantes puedan comunicarse conmigo.

La combinación de React, CSS y mi API personalizada proporciona una solución poderosa y versátil para mostrar y gestionar mi portafolio web de manera eficiente.

## Diseño

He creado un diseño visualmente atractivo para mi portafolio web utilizando la herramienta de diseño [Figma](https://www.figma.com/). El diseño se ha realizado teniendo en cuenta la usabilidad y la experiencia del usuario.

A continuación, puedes ver una captura de pantalla del diseño:

![Captura de pantalla del diseño del portafolio](./src/assets/MuestraFigma.png)

Si deseas explorar el diseño interactivo y en detalle, puedes acceder a través de este [enlace](https://www.figma.com/file/u8Z7UxAuamfPEz4rvxnIcA?type=design) a Figma 

## Demostración en Vivo

Puedes ver una demostración en vivo de mi portafolio web en [krlozmedina.com](https://krlozmedina.com), el cual está alojado y desplegado utilizando los servicios gratuitos de Netlify.

En esta demostración, encontrarás las siguientes secciones:

- **Inicio**: Aquí recibirás una cálida bienvenida y una descripción general de quién soy.

- **Proyectos**: En esta sección, encontrarás una galería interactiva de mis proyectos destacados. Cada proyecto incluye detalles sobre su propósito, las tecnologías utilizadas y los enlaces a las demos o repositorios correspondientes.

- **Sobre mí**: Esta sección proporciona información adicional sobre mí, incluyendo mis habilidades, experiencia y pasiones relacionadas con el desarrollo de software.

- **Educación**: Aquí encontrarás detalles sobre mi formación académica y cursos relevantes que he completado. Esto brinda una visión más completa de mi conocimiento y capacidad para afrontar desafíos técnicos.

- **Contactarme**: Si deseas comunicarte conmigo para oportunidades de colaboración o simplemente para hacerme preguntas, puedes utilizar el formulario de contacto disponible en esta sección. Estaré encantado de responder a tus consultas.

[Netlify](https://www.netlify.com/) ha sido una excelente opción para alojar y desplegar mi portafolio web de forma gratuita. Gracias a sus servicios gratuitos, puedo compartir mi trabajo en línea de manera confiable y accesible.

Te invito a explorar mi portafolio web en la demostración en vivo en [krlozmedina.com](https://krlozmedina.com) y descubrir más sobre mis proyectos, experiencia y habilidades como desarrollador.

¡Espero que disfrutes navegando por mi portafolio web y que encuentres proyectos y habilidades que te resulten interesantes!

## Tecnologías Utilizadas

En el desarrollo de mi portafolio web, utilicé las siguientes tecnologías:

- **React**: Utilicé React como el framework principal para crear la interfaz de usuario de mi portafolio. Aproveché las ventajas de React para crear componentes reutilizables y mantener un flujo de datos eficiente.

- **CSS**: Utilicé CSS para el diseño y la estilización de mi portafolio web. Aproveché las características de CSS para crear diseños modernos y atractivos, y asegurarme de que mi portafolio sea totalmente responsive en diferentes dispositivos y tamaños de pantalla.

- **Spring Framework**: Utilicé el framework Spring para desarrollar la API que alimenta mi portafolio web. Spring me permitió implementar de manera eficiente la lógica y las operaciones CRUD necesarias para administrar mis proyectos y estudios.

- **Figma**: Utilicé la herramienta de diseño Figma para crear el diseño visual de mi portafolio web. Desde el diseño de las páginas hasta la elección de colores y tipografías, Figma me permitió planificar y visualizar cómo se vería mi portafolio antes de comenzar a codificar.

Estas tecnologías me permitieron desarrollar un portafolio web moderno, interactivo y fácil de usar. Cada una de ellas desempeñó un papel importante en la creación de una experiencia de usuario atractiva y en la presentación efectiva de mis proyectos y habilidades como desarrollador.

## Licencia

Mi portafolio web y el código fuente asociado están protegidos bajo la siguiente licencia:

- **Creative Commons Attribution-NonCommercial (CC BY-NC)**: Este proyecto se encuentra bajo la licencia CC BY-NC. Esto significa que puedes compartir, copiar, distribuir y modificar el código de este proyecto, siempre y cuando se atribuya adecuadamente la autoría y no se utilice con fines comerciales.

Asegúrate de leer detenidamente los términos y condiciones de la licencia CC BY-NC antes de utilizar este código en tus propios proyectos.

También es importante tener en cuenta que, si bien mi código fuente puede estar disponible bajo la licencia CC BY-NC, es posible que algunos elementos del diseño, como las imágenes, iconos o fuentes, tengan sus propias licencias. Asegúrate de revisar y respetar las licencias correspondientes de estos elementos si deseas utilizarlos en tu propio proyecto.

Si tienes alguna pregunta o inquietud relacionada con las licencias de mi portafolio web, no dudes en ponerse en contacto conmigo a través de los canales mencionados en la sección de contacto.

## Estructura de las páginas

```
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