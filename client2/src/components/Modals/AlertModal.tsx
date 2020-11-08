import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogTitle, DialogContent, DialogContentText } from "@material-ui/core";
import { showAlertModalSelector } from "src/selectors";
import { ActionType as AppActionType } from 'src/reducers/appReducer';

type AlertModalProps = {
  onConfirm?: () => void;
};

const AlertModal = (props: AlertModalProps) => {
  const { onConfirm } = props;
  const dispatch = useDispatch();
  const showConfirmModal = useSelector(showAlertModalSelector);

  const onClose = () => {
    dispatch({
      type: AppActionType.SET_ALERT_MODAL,
      show: false,
    });
    if (onConfirm) { onConfirm(); }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={showConfirmModal.show}
      onClose={onClose}
      aria-labelledby="alert-modal"
      aria-describedby="alert-modal-description"
    >
      <DialogTitle id="alert-modal">提示</DialogTitle>
      <DialogContent id="alert-modal-description" dividers>
        <DialogContentText id="alert-dialog-description">
          {showConfirmModal.message}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default AlertModal;
