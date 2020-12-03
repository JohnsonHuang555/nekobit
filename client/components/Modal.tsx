import React, { useState } from 'react';
import ReactModal, { Styles } from 'react-modal';
import { useDispatch } from 'react-redux';
import { setShowModal } from 'slices/appSlice';
import styles from 'styles/components/modal.module.scss';
import Icon, { IconType } from './Icon';

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
  show: boolean;
  title?: string;
  children?: React.ReactNode;
}

ReactModal.setAppElement('#__next')

const Modal = (props: ModalProps) => {
  const {
    children,
    show,
    title = '',
  } = props;
  const dispatch = useDispatch();

  return (
    <div>
      <ReactModal
        isOpen={show}
        onRequestClose={() => dispatch(setShowModal(false))}
        style={customStyles}
        contentLabel="appModal"
      >
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          <div className={styles.closeModal} onClick={() => dispatch(setShowModal(false))}>
            <Icon type={IconType.Times}/>
          </div>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </ReactModal>
    </div>
  );
};

export default Modal;
