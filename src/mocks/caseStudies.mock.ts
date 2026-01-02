export interface CaseStudyLocale {
  title: string
  summary: string
  description: string
  challenges: string
  solution: string
  results: string
}

export interface Testimonial {
  es: string
  en: string
  interviewee: {
    name: string
    position: string
  }
}

export interface CaseStudy {
  es: CaseStudyLocale
  en: CaseStudyLocale
  testimonials: Testimonial[]
  client: string
  imageUrl: string
  tags: string[]
  date: string
  isFeatured: boolean
  link: string
  rating: number
}

export const caseStudies: CaseStudy[] = [
  // 👉 el resto de objetos va igual, sin cambios estructurales
  // [
  {
    "es": {
      "title": "Automatización Inteligente para TechCorp Solutions",
      "summary": "Desarrollamos una solución personalizada para automatizar procesos clave, logrando mayor eficiencia y productividad.",
      "description": "Implementamos un sistema de gestión empresarial con integración de inteligencia artificial para automatizar procesos manuales, mejorando significativamente la eficiencia operativa.",
      "challenges": "Automatizar procesos manuales para mejorar la eficiencia operativa.",
      "solution": "Implementación de un sistema de gestión empresarial personalizado con integración de inteligencia artificial.",
      "results": "Reducción del 40% en el tiempo de procesamiento y aumento del 25% en la productividad."
    },
    "en": {
      "title": "Intelligent Automation for TechCorp Solutions",
      "summary": "We developed a custom solution to automate key processes, achieving greater efficiency and productivity.",
      "description": "We implemented a custom enterprise management system with AI integration to automate manual processes, significantly improving operational efficiency.",
      "challenges": "Automate manual processes to improve operational efficiency.",
      "solution": "Implementation of a custom enterprise management system with artificial intelligence integration.",
      "results": "40% reduction in processing time and 25% increase in productivity."
    },
    "testimonials": [
      {
        "es": "Gracias a esta solución, hemos transformado nuestra forma de trabajar. La eficiencia lograda es impresionante.",
        "en": "Thanks to this solution, we have transformed the way we work. The achieved efficiency is impressive.",
        "interviewee": {
          "name": "Juan Pérez",
          "position": "CEO of TechCorp Solutions"
        }
      }
    ],
    "client": "TechCorp Solutions",
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9nDM0FXZS9x-mCrGbmpFr5vh7TYYFO5gJUQ&s",
    "tags": ["Automatización", "IA", "Gestión empresarial"],
    "date": "2023-10-12T00:00:00.000Z",
    "isFeatured": true,
    "link": "case-studies/techcorp-automation",
    "rating": 5
  },
  {
    "es": {
      "title": "Monitoreo IoT para Energía Renovable",
      "summary": "Creamos una plataforma IoT para optimizar el rendimiento de paneles solares, mejorando la eficiencia energética.",
      "description": "Desarrollamos una plataforma IoT para monitorear y analizar en tiempo real datos de paneles solares, lo que mejoró el rendimiento energético y redujo los costos de mantenimiento.",
      "challenges": "Optimizar el monitoreo en tiempo real de paneles solares.",
      "solution": "Desarrollo de una plataforma IoT para monitoreo y análisis de datos.",
      "results": "Incremento del 15% en el rendimiento energético y reducción en los costos de mantenimiento."
    },
    "en": {
      "title": "IoT Monitoring for Renewable Energy",
      "summary": "We created an IoT platform to optimize solar panel performance, improving energy efficiency.",
      "description": "We developed an IoT platform for real-time monitoring and data analysis of solar panels, improving performance and reducing maintenance costs.",
      "challenges": "Optimize real-time monitoring of solar panels.",
      "solution": "Development of an IoT platform for monitoring and analyzing solar panel data.",
      "results": "15% increase in energy performance and reduction in maintenance costs."
    },
    "testimonials": [
      {
        "es": "La plataforma desarrollada nos ha permitido maximizar el rendimiento de nuestros paneles solares. Estamos muy satisfechos con los resultados.",
        "en": "The platform developed has allowed us to maximize the performance of our solar panels. We are very satisfied with the results.",
        "interviewee": {
          "name": "María López",
          "position": "Operations Director of GreenEnergy Inc"
        }
      }
    ],
    "client": "GreenEnergy Inc.",
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX6s68iU8RqcV1Zd4jzM-X3r4gurbEWL2aRA&s",
    "tags": ["IoT", "Energía renovable", "Monitoreo"],
    "date": "2023-08-15T00:00:00.000Z",
    "isFeatured": false,
    "link": "case-studies/greenenergy-iot",
    "rating": 4
  },
  {
    "es": {
      "title": "Transformación Digital en Educación",
      "summary": "Desarrollamos una plataforma e-learning interactiva para mejorar la experiencia educativa de estudiantes remotos.",
      "description": "Diseñamos e implementamos una plataforma de aprendizaje digital con herramientas interactivas y accesibilidad mejorada, fomentando la participación estudiantil.",
      "challenges": "Crear una experiencia de aprendizaje interactiva y accesible para estudiantes remotos.",
      "solution": "Diseño e implementación de una plataforma e-learning con herramientas interactivas.",
      "results": "Aumento del 30% en la participación estudiantil y expansión del 50% en la base de usuarios."
    },
    "en": {
      "title": "Digital Transformation in Education",
      "summary": "We developed an interactive e-learning platform to improve the educational experience of remote students.",
      "description": "We designed and implemented a digital learning platform with interactive tools and enhanced accessibility, boosting student engagement.",
      "challenges": "Create an interactive and accessible learning experience for remote students.",
      "solution": "Design and implementation of an e-learning platform with interactive tools and enhanced accessibility.",
      "results": "30% increase in student engagement and 50% expansion of the user base."
    },
    "testimonials": [
      {
        "es": "La plataforma ha revolucionado la forma en que nuestros estudiantes aprenden. Es intuitiva, accesible y muy efectiva.",
        "en": "The platform has revolutionized the way our students learn. It is intuitive, accessible, and very effective.",
        "interviewee": {
          "name": "Carlos Gómez",
          "position": "Founder of EduLearn Academy"
        }
      }
    ],
    "client": "EduLearn Academy",
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR0xRvJ-Zz3Q4qwMlryjDqOFbTtk7e5gIRNg&s",
    "tags": ["Educación", "E-learning", "Accesibilidad"],
    "date": "2024-01-25T00:00:00.000Z",
    "isFeatured": true,
    "link": "case-studies/edulearn-platform",
    "rating": 5
  },
  {
    "es": {
      "title": "Optimización Logística con Machine Learning",
      "summary": "Redujimos los tiempos de entrega con una solución inteligente basada en datos y aprendizaje automático.",
      "description": "Creamos un sistema predictivo de rutas logísticas que analiza tráfico, clima y demanda para optimizar las entregas en tiempo real.",
      "challenges": "Reducir los tiempos de entrega y los costos logísticos.",
      "solution": "Sistema predictivo de rutas con integración de machine learning y análisis de datos en tiempo real.",
      "results": "Disminución del 35% en los tiempos de entrega y 20% en costos operativos."
    },
    "en": {
      "title": "Logistics Optimization with Machine Learning",
      "summary": "We reduced delivery times using a smart, data-driven machine learning solution.",
      "description": "We created a predictive logistics routing system that analyzes traffic, weather, and demand to optimize real-time deliveries.",
      "challenges": "Reduce delivery times and logistics costs.",
      "solution": "Predictive routing system with machine learning and real-time data analysis integration.",
      "results": "35% reduction in delivery times and 20% decrease in operational costs."
    },
    "testimonials": [
      {
        "es": "El sistema ha revolucionado nuestra logística. Ahora podemos anticiparnos a los problemas y entregar más rápido.",
        "en": "The system has revolutionized our logistics. Now we can anticipate issues and deliver faster.",
        "interviewee": {
          "name": "Laura Martínez",
          "position": "Gerente de Logística en FastDelivery Co."
        }
      }
    ],
    "client": "FastDelivery Co.",
    "imageUrl": "https://images.unsplash.com/photo-1557804506-669a67965ba0",
    "tags": ["Machine Learning", "Logística", "Optimización"],
    "date": "2023-09-05T00:00:00.000Z",
    "isFeatured": false,
    "link": "case-studies/fastdelivery-ml",
    "rating": 4
  },
  {
    "es": {
      "title": "E-commerce Personalizado con Big Data",
      "summary": "Aumentamos la conversión del sitio al personalizar la experiencia de compra en tiempo real.",
      "description": "Desarrollamos una plataforma que analiza el comportamiento de los usuarios para mostrar recomendaciones personalizadas y promociones dirigidas.",
      "challenges": "Incrementar la conversión del sitio web y la retención de clientes.",
      "solution": "Motor de recomendaciones basado en big data y análisis de comportamiento en tiempo real.",
      "results": "Aumento del 45% en las conversiones y del 60% en retención de clientes."
    },
    "en": {
      "title": "Personalized E-commerce with Big Data",
      "summary": "We increased site conversion by personalizing the shopping experience in real time.",
      "description": "We developed a platform that analyzes user behavior to display personalized recommendations and targeted promotions.",
      "challenges": "Increase website conversion and customer retention.",
      "solution": "Recommendation engine based on big data and real-time behavior analytics.",
      "results": "45% increase in conversions and 60% in customer retention."
    },
    "testimonials": [
      {
        "es": "Desde que usamos esta solución, nuestros clientes compran más y regresan con frecuencia. Es un antes y después.",
        "en": "Since we started using this solution, our customers buy more and come back often. It's a game changer.",
        "interviewee": {
          "name": "Andrés Salgado",
          "position": "CMO de ShopNow"
        }
      }
    ],
    "client": "ShopNow",
    "imageUrl": "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    "tags": ["Big Data", "E-commerce", "Personalización"],
    "date": "2023-11-18T00:00:00.000Z",
    "isFeatured": true,
    "link": "case-studies/shopnow-bigdata",
    "rating": 5
  },
  {
    "es": {
      "title": "Digitalización de RRHH con Inteligencia Artificial",
      "summary": "Implementamos una plataforma que agiliza procesos de selección, evaluación y desarrollo de talento.",
      "description": "Diseñamos una herramienta que automatiza el análisis de currículums, mide desempeño y sugiere rutas de crecimiento para empleados.",
      "challenges": "Agilizar los procesos de contratación y mejorar el desarrollo de talento interno.",
      "solution": "Plataforma de gestión de RRHH con algoritmos de IA y análisis predictivo.",
      "results": "Reducción del 50% en el tiempo de contratación y mejora del 35% en la retención de talento."
    },
    "en": {
      "title": "HR Digitalization with Artificial Intelligence",
      "summary": "We implemented a platform that streamlines recruitment, evaluation, and talent development.",
      "description": "We designed a tool that automates resume analysis, measures performance, and suggests employee growth paths.",
      "challenges": "Speed up hiring processes and improve internal talent development.",
      "solution": "HR management platform with AI algorithms and predictive analytics.",
      "results": "50% reduction in hiring time and 35% improvement in talent retention."
    },
    "testimonials": [
      {
        "es": "Con esta plataforma, nuestros procesos son más ágiles y hemos mejorado mucho en la gestión de nuestro talento.",
        "en": "With this platform, our processes are faster and we've greatly improved talent management.",
        "interviewee": {
          "name": "Fernando Díaz",
          "position": "Director de RRHH en PeopleFirst"
        }
      }
    ],
    "client": "PeopleFirst",
    "imageUrl": "https://images.unsplash.com/photo-1560250097-0b93528c311a",
    "tags": ["RRHH", "IA", "Gestión de talento"],
    "date": "2024-02-08T00:00:00.000Z",
    "isFeatured": false,
    "link": "case-studies/peoplefirst-hr-ai",
    "rating": 4
  }      
// ]
]


