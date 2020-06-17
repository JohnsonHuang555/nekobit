import React, { ReactNode } from 'react';
import { Modal, Backdrop, Fade } from '@material-ui/core';

type AppModalProps = React.HTMLAttributes<HTMLElement> & {
  show: boolean;
  className?: string;
  header?: ReactNode;
  onClose: () => void;
}

const AppModal = (props: AppModalProps) => {
  const {
    show,
    className,
    onClose,
    header,
    children,
  } = props;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={`gp-modal ${className}`}
      open={show}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={show}>
        <div className="modal-container">
          <div className="header">
            {header}
          </div>
          <div className="content">
            {children}
          </div>
        </div>
      </Fade>
    </Modal>
  )
};

export default AppModal;
