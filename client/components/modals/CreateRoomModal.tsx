import { createRoom } from "actions/roomsAction";
import Button from "components/Button";
import Input from "components/Input";
import Modal from "components/Modal";
import Select, { OptionType } from "components/Select";
import { GamePack } from "domain/models/Room";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setShowModal } from "slices/appSlice";
import styles from 'styles/components/modals/createRoomModal.module.scss';

type CreateRoomModalProps = {
  show: boolean;
}

const CreateRoomModal = (props: CreateRoomModalProps) => {
  const { show } = props;
  const [roomName, setRoomName] = useState('');
  const [roomPassword, setRoomPassword] = useState('');
  const [selectedGame, setSelectedGame] = useState<OptionType>();
  const [selectedMode, setSelectedMode] = useState<OptionType>();
  const dispatch = useDispatch();

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
      <Select
        value={selectedGame}
        options={[
          {label: '象棋', value: GamePack.ChineseChess}
        ]}
        label="遊戲"
        onChange={(o) => setSelectedGame(o)}
        customStyles={{ marginBottom: '20px' }}
      />
      <Select
        value={selectedMode}
        options={[
          {label: '大盤(標準)', value: 'standard'},
          {label: '小盤(暗棋)', value: 'hidden'}
        ]}
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
        <Button title="創建房間" color="secondary" onClick={() => {
          dispatch(createRoom({
            title: roomName,
            password: roomPassword,
            game_pack: selectedGame?.value as GamePack,
            game_mode: selectedMode?.value as string,
          }))
          dispatch(setShowModal(false))
        }}/>
      </div>
    </Modal>
  );
}

export default CreateRoomModal;
