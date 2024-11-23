import React from 'react';
import Image from 'next/image'; // Importa el componente Image de Next.js
import "../../styles/components/atom.css";
import logo from '../../assets/Logo.png';

// El label no necesita ser tipado explícitamente, ya que es solo una constante de tipo string
const label: string = "Krloz Medina </>";

const Logo: React.FC = () => {
  return (
    <h1 className="logo">{label}</h1>
  );
};

const LogoHeader: React.FC = () => {
  return (
    // Usa el componente Image de Next.js para la optimización de imágenes
    <Image 
      src={logo} 
      alt="Logo" 
      className="logo-imagen2"
    />
  );
};

export { LogoHeader, Logo };
