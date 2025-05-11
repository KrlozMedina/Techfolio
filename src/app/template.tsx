/**
 * 📄 Template Component
 * Envuelve el contenido de una página con una imagen de fondo decorativa.
 * 
 * @param children - Elementos React que se renderizan dentro del layout.
 * @returns Un fragmento que incluye la imagen de fondo y el contenido.
 */

import React from 'react';

interface TemplateProps {
  children: React.ReactNode;
}

const Template: React.FC<TemplateProps> = ({ children }) => {
  return (
    <>
      {/* Imagen de fondo decorativa */}
      <span className="background__image" aria-hidden="true" />
      
      {/* Contenido principal */}
      {children}
    </>
  );
};

export default Template;
