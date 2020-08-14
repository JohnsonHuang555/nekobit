import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  DialogTitle
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { showConfirmModalSelector } from "src/selectors";
import { ActionType as AppActionType } from 'src/reducers/appReducer';

type ConfirmModalProps = {
  onConfirm: () => void;
  onCancel?: () => void;
}

const ConfirmModal = (props: ConfirmModalProps) => {
  const dispatch = useDispatch();
  const showConfirmModal = useSelector(showConfirmModalSelector);

  const closeHandler = () => {
    if (props.onCancel) {
      props.onCancel();
    }
    dispatch({
      type: AppActionType.SET_CONFIRM_MODAL,
      show: false,
    });
  };

  const confirmHandler = () => {
    closeHandler();
    props.onConfirm();
  };

  return (
    <Dialog
      fullWidth
      open={showConfirmModal.show}
      onClose={closeHandler}
    >
      <DialogTitle id="leave-room-modal">提示</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {showConfirmModal.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={closeHandler}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={confirmHandler}
          color="primary"
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default ConfirmModal;
