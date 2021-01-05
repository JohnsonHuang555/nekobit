import { createRoom } from "actions/roomsAction";
import Button from "components/Button";
import Input from "components/Input";
import Modal from "components/Modal";
import Select, { OptionType } from "components/Select";
import { EnhanceGame } from "domain/models/Game";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectGameInfo } from "selectors/gamesSelector";
import { setShowModal } from "slices/appSlice";
import styles from 'styles/components/modals/createRoomModal.module.scss';

type CreateRoomModalProps = {
  show: boolean;
}

const CreateRoomModal = (props: CreateRoomModalProps) => {
  const { show } = props;
  const [roomName, setRoomName] = useState('');
  const [roomPassword, setRoomPassword] = useState('');
  const [selectedMode, setSelectedMode] = useState<OptionType>();
  const { selectedGame } = useSelector(selectGameInfo);
  const dispatch = useDispatch();

  const onCreate = () => {
    if (!selectedGame || !selectedMode) {
      toast.warn('請選擇');
      return;
    }
    dispatch(createRoom({
      title: roomName,
      password: roomPassword,
      game_pack: selectedGame.gamePack,
      game_mode: selectedMode.value,
    }))
    dispatch(setShowModal(false));
  }

  return (
    <Modal title="New Room" show={show}>
      <Input
        type="text"
        placeholder="請輸入房間名稱"
        label="房間名稱"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        customStyles={{ marginBottom: '20px' }}
      />
      {/* TODO: 考慮要不要放 */}
      {/* <Select
        value={selectedGame}
        options={[
          {label: '象棋', value: GamePack.ChineseChess}
        ]}
        label="遊戲"
        onChange={(o) => setSelectedGame(o)}
        customStyles={{ marginBottom: '20px' }}
      /> */}
      <Select
        value={selectedMode}
        options={selectedGame?.modes || []}
        label="模式"
        onChange={(o) => setSelectedMode(o)}
        customStyles={{ marginBottom: '20px' }}
      />
      <Input
        type="text"
        placeholder="請輸入房間密碼"
        label="房間密碼"
        value={roomPassword}
        onChange={(e) => setRoomPassword(e.target.value)}
        customStyles={{ marginBottom: '40px' }}
      />
      <div className={styles.controls}>
        <Button title="取消" color="grey-4" onClick={() => dispatch(setShowModal(false))}/>
        <Button title="創建房間" color="secondary" onClick={() => onCreate()}/>
      </div>
    </Modal>
  );
}

export default CreateRoomModal;
