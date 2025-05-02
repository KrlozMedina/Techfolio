import React, { FC, ReactNode, MouseEvent } from "react";
import ReactDOM from "react-dom";
import style from './Modal.module.css'

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const Modal: FC<ModalProps> = ({ onClose, children, title }) => {
  const handleCloseClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = (
    <div className={style["modal__overlay"]}>
      <div className={style["modal__wrapper"]}>
        <div className={style["modal"]}>
          <div className={style["modal__header"]}>
            <a href="#" onClick={handleCloseClick}>
              x
            </a>
          </div>
          {title && <h1>{title}</h1>}
          <div className={style["modal__body"]}>{children}</div>
        </div>
      </div>
    </div>
  );

  // Validación para evitar errores si el elemento raíz no existe
  const rootElement = document.getElementById("app");
  if (!rootElement) {
    console.error("The element with the ID 'app' was not found in the DOM.");
    return null;
  }

  return ReactDOM.createPortal(modalContent, rootElement);
};

export default Modal;
