import { wsSendMessage } from "actions/socketAction";
import Button from "components/Button";
import Modal from "components/Modal";
import { SocketEvent } from "domain/models/WebSocket";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "selectors/appSelector";
import styles from "styles/components/modals/confirmModal.module.scss";

type ConfirmModalProps = {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmModal = (props: ConfirmModalProps) => {
  const { show, onClose, onConfirm } = props;

  return (
    <Modal show={show} title="提示" onCloseModal={() => onClose()}>
      <div className={styles.message}>確定要離開房間 ?</div>
      <div className={styles.controls}>
        <Button title="取消" color="grey-4" onClick={() => onClose()} />
        <Button title="離開" color="secondary" onClick={() => onConfirm()} />
      </div>
    </Modal>
  );
};

export default ConfirmModal;
