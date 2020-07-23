import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { showConfirmModalSelector } from "src/selectors";
import { ActionType as AppActionType } from 'src/reducers/appReducer';

type ConfirmModalProps = {
  onConfirm: () => void;
}

const ConfirmModal = (props: ConfirmModalProps) => {
  const dispatch = useDispatch();
  const showConfirmMoal = useSelector(showConfirmModalSelector);

  const closeHandler = () => {
    dispatch({
      type: AppActionType.SET_CONFIRM_MODAL,
      show: false,
    });
  };

  const confrimHandler = () => {
    closeHandler();
    props.onConfirm();
  };

  return (
    <Dialog
      open={showConfirmMoal.show}
      onClose={closeHandler}
      aria-labelledby="confirm-modal"
      aria-describedby="confirm-modal"
      disableBackdropClick
    >
      <DialogContent>
        <DialogContentText id="confirm-modal">
          {showConfirmMoal.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler} color="primary">
          Cancel
        </Button>
        <Button onClick={confrimHandler} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default ConfirmModal;
