// components/ErrorTemplate/ErrorTemplate.tsx

import React, { ReactNode } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import style from './ErrorTemplate.module.scss';

/**
 * Define los estados disponibles para los errores.
 * Se pueden descomentar más opciones en el futuro según las necesidades del proyecto.
 */
type AvatarStatus =
  | 'generalError'
  | 'serverError'
  | 'notFound'
// | 'noNetwork'
| 'noResults'
// | 'success'
| 'loading'
// | 'forbidden'
// | 'sessionExpired'
// | 'deleteConfirm'
// | 'formInvalid'
// | 'validationError'
// | 'tooManyRequests'
| 'unauthorized'
// | 'partialSuccess'

/**
 * Props que acepta el componente ErrorTemplate
 * @param withBackground - Opción para agregar fondo decorativo
 * @param status - Tipo de error (usado para mostrar una imagen específica)
 * @param children - Contenido que se mostrará debajo de la imagen
 */
interface ErrorTemplateProps {
  withBackground?: boolean;
  inContainer?: boolean;
  status: AvatarStatus;
  children: ReactNode;
}

/**
 * Componente para mostrar plantillas de error con imagen + contenido
 * @returns JSX.Element
 */
const ErrorTemplate: React.FC<ErrorTemplateProps> = ({
  withBackground = false,
  inContainer = false,
  status,
  children
}) => {
  return (
    <section
      className={clsx(
        style.error__container,
        withBackground && style['error__container-background'],
        (!inContainer) && style['error__container-height']
      )}
    >
      <Image
        className={style['error__image']}
        src={`/assets/avatars/${status}.png`}
        width={400}
        height={500}
        alt={`Error status: ${status}`}
        priority
      />
      
      <div className={style['error__children']}>
        {children}
      </div>
    </section>
  );
};

export default ErrorTemplate;
