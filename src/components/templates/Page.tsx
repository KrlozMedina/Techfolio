import React, { ReactNode } from 'react';
import { Language } from '@/components/molecules/Language';
import { LogoHeader } from '@/components/atom/Logo';
import { MenuAside, MenuPhone } from '@/components/organisms/Menu';
import '@/styles/components/template.css';

// Definir la interfaz para las props del componente
interface PageProps {
  children: ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <div className='template__container'>
      <div className='menuPhone'>
        <MenuPhone />
      </div>

      <div className='language'>
        <Language />
      </div>
      
      <div className='template__main'>
        <LogoHeader />
        {children}
      </div>

      <aside className='template__aside'>
        <MenuAside />
      </aside>
    </div>
  );
};

export default Page;