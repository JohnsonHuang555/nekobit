import React, { useState } from 'react';
import ReactModal, { Styles } from 'react-modal';

const customStyles: Styles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform : 'translate(-50%, -50%)',
    backgroundColor: '#1D2124',
    maxWidth: '1000px',
    minWidth: '600px',
    border: '1px solid #707070',
  }
};

type ModalProps = {
  children?: React.ReactNode;
  show: boolean;
}

ReactModal.setAppElement('#__next')

const Modal = (props: ModalProps) => {
  const {
    children,
    show,
  } = props;
  const [isOpen, setOpen] = useState(show);

  const openModal = () => {
    setOpen(true);
  }
  const closeModal = () => {
    setOpen(false);
  }
  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {children}
      </ReactModal>
    </div>
  );
};

export default Modal;
