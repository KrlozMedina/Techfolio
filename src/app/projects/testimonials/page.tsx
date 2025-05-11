'use client';

import React, { useContext } from 'react';
import LanguageContext, { LanguageContextType } from '@/context/LanguageContext';
import MainLayout from '@/components/templates/MainLayout/MainLayout';
import StatusNotice from '@/components/organisms/Notice/Notice';

const TestimonialsPage = () => {
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;

  const links = [
    {
      title: {es: "Servicios", en: "Services"},
      href: "/projects/services",
      isActive: false,
    },
    {
      title: {es: "Testimonios", en: "Testimonials"},
      href: "/projects/testimonials",
      isActive: true,
    },
    {
      title: {es: "Casos de éxito", en: "Success Stories"},
      href: "/projects/case-studies",
      isActive: false,
    },
  ];

  const testimonials = [
    {
      name: 'John Doe',
      role: 'Client',
      feedback: 'Working with this team was an amazing experience. The project exceeded my expectations!',
    },
    {
      name: 'Jane Smith',
      role: 'Collaborator',
      feedback: 'The collaboration was seamless, and the team was highly professional throughout the project.',
    },
    {
      name: 'Carlos López',
      role: 'Client',
      feedback: 'Great attention to detail and excellent communication. Highly recommended!',
    },
  ];

  return (
    <MainLayout isAdmin={false} links={links} language={isSpanish ? 'es' : 'en'} >
      <StatusNotice type='construction' language={isSpanish ? 'es' : 'en'} />
      <div className="testimonials-page">
        <h1>Testimonials</h1>
        <div className="testimonials-list">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <h2>{testimonial.name}</h2>
              <h4>{testimonial.role}</h4>
              <p>{testimonial.feedback}</p>
            </div>
          ))}
        </div>
        <style jsx>{`
                  .testimonials-page {
                      padding: 20px;
                      font-family: Arial, sans-serif;
                  }
                  .testimonials-list {
                      display: grid;
                      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                      gap: 20px;
                  }
                  .testimonial-card {
                      border: 1px solid #ddd;
                      border-radius: 8px;
                      padding: 15px;
                      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                  }
                  .testimonial-card h2 {
                      margin: 0;
                      font-size: 1.2em;
                      color: #333;
                  }
                  .testimonial-card h4 {
                      margin: 5px 0;
                      font-size: 1em;
                      color: #666;
                  }
                  .testimonial-card p {
                      font-style: italic;
                      color: #555;
                  }
              `}</style>
      </div>
    </MainLayout>
  );
};

export default TestimonialsPage;