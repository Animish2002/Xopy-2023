import React from 'react';
import ReactDOM from 'react-dom';
import "./Model.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-content">
        {children}
      </div>
    </>,
    document.getElementById('modal-root') // assuming there is a div with this id in your index.html
  );
};

export default Modal;
