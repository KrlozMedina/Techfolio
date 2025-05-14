'use client'

import React from 'react';
import './page.module.scss';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import GitHubCalendar from 'react-github-calendar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const languagesData = {
    labels: ['JavaScript', 'TypeScript', 'Python', 'Go', 'SQL'],
    datasets: [
      {
        label: 'Líneas de código',
        data: [4500, 3000, 1500, 700, 900],
        backgroundColor: ['#f1e05a', '#3178c6', '#3572A5', '#00ADD8', '#e38c00'],
      },
    ],
  };

  const projectsData = {
    labels: ['Completos', 'En desarrollo'],
    datasets: [
      {
        data: [7, 3],
        backgroundColor: ['#4caf50', '#ff9800'],
      },
    ],
  };

  const featuredProjects = [
    {
      name: 'GameScore Manager',
      stack: ['Next.js', 'NestJS', 'MongoDB'],
      status: 'Completo',
      repo: 'https://github.com/KrlozMedina/GameScoreManager',
      demo: '#',
      tags: ['fullstack', 'web', 'API'],
    },
    {
      name: 'Portfolio Personal',
      stack: ['React', 'SCSS'],
      status: 'En desarrollo',
      repo: '#',
      demo: '#',
      tags: ['web', 'frontend'],
    },
  ];

  const stack = [
    { name: 'React', level: 'Experto' },
    { name: 'NestJS', level: 'Intermedio' },
    { name: 'PostgreSQL', level: 'Intermedio' },
    { name: 'MongoDB', level: 'Básico' },
  ];

  const courses = [
    { title: 'Curso de NestJS', platform: 'Udemy', year: 2024 },
    { title: 'React desde Cero', platform: 'Platzi', year: 2023 },
  ];

  const timeline = [
    { year: '2023 - Presente', description: 'Freelance Full Stack Developer – Proyectos Web y APIs' },
    { year: '2022', description: 'Bootcamp Full Stack con NestJS y React – Mintic' },
    { year: '2020 - 2022', description: 'Ingeniería de Software – Universidad Virtual' },
  ];

  const blogPosts = [
    { title: 'Cómo estructurar un proyecto Full Stack', tags: ['fullstack', 'arquitectura'], views: 120 },
    { title: 'NestJS + MongoDB: Integración efectiva', tags: ['NestJS', 'MongoDB'], views: 95 },
  ];

  return (
    <div className="dashboard">
      <section className="profile">
        <img src="/assets/avatar.png" alt="Carlos Medina" className="avatar" />
        <h1>Carlos Medina – Full Stack Developer</h1>
        <p>Apasionado por construir soluciones completas con tecnologías modernas.</p>
      </section>

      <section className="activity">
        <h2>📊 Estadísticas de Actividad</h2>
        <div className="charts">
          <Bar data={languagesData} />
          <Doughnut data={projectsData} />
        </div>
        <div className="calendar">
          <h3>Contribuciones Recientes</h3>
          <GitHubCalendar username="KrlozMedina" />
        </div>
      </section>

      <section className="projects">
        <h2>🚀 Proyectos Destacados</h2>
        <div className="project-cards">
          {featuredProjects.map((project, idx) => (
            <div key={idx} className="project-card">
              <h3>{project.name}</h3>
              <p><strong>Stack:</strong> {project.stack.join(', ')}</p>
              <p><strong>Estado:</strong> {project.status}</p>
              <a href={project.repo}>Repositorio</a> | <a href={project.demo}>Demo</a>
              <div className="tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="blog">
        <h2>📝 Blog / Artículos Técnicos</h2>
        <ul>
          {blogPosts.map((post, i) => (
            <li key={i}>
              <strong>{post.title}</strong> – Etiquetas: {post.tags.join(', ')} ({post.views} vistas)
            </li>
          ))}
        </ul>
      </section>

      <section className="stack">
        <h2>🛠️ Tecnologías Favoritas</h2>
        <ul>
          {stack.map((tech, i) => (
            <li key={i}><strong>{tech.name}</strong> – {tech.level}</li>
          ))}
        </ul>
      </section>

      <section className="courses">
        <h2>🎓 Certificaciones / Cursos</h2>
        <ul>
          {courses.map((course, i) => (
            <li key={i}>{course.title} - {course.platform} ({course.year})</li>
          ))}
        </ul>
      </section>

      <section className="experience">
        <h2>🧭 Experiencia / Cronología</h2>
        <ul>
          {timeline.map((item, i) => (
            <li key={i}><strong>{item.year}</strong>: {item.description}</li>
          ))}
        </ul>
      </section>

      <section className="contact">
        <h2>📫 Contacto</h2>
        <div className="contact-links">
          <a href="https://linkedin.com/in/krlozmedina">LinkedIn</a>
          <a href="https://github.com/KrlozMedina">GitHub</a>
          <a href="mailto:krlozmedina@gmail.com">Email</a>
          <a href="/cv.pdf" download>Descargar CV</a>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
