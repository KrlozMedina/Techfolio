import React, { FC, ReactNode, MouseEvent } from "react";
import ReactDOM from "react-dom";
import '@/styles/components/modal.css';

interface ModalProps {
  onClose: () => void; // Función para cerrar el modal
  children: ReactNode; // Contenido dinámico del modal
  title?: string;      // Título opcional del modal
}

const Modal: FC<ModalProps> = ({ onClose, children, title }) => {
  // Maneja el clic en el botón de cerrar
  const handleCloseClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
  };

  // Contenido del modal
  const modalContent = (
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <div className="modal">
          <div className="modal-header">
            <a href="#" onClick={handleCloseClick}>
              x
            </a>
          </div>
          {title && <h1>{title}</h1>}
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );

  // Validación para evitar errores si el elemento raíz no existe
  const rootElement = document.getElementById("app");
  if (!rootElement) {
    console.error("El elemento con id 'app' no se encuentra en el DOM.");
    return null;
  }

  return ReactDOM.createPortal(modalContent, rootElement);
};

export default Modal;
