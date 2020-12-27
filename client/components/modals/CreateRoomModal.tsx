import Input from "components/Input";
import Modal from "components/Modal";
import Select, { OptionType } from "components/Select";
import { GamePack } from "domain/models/Room";
import { useState } from "react";

type CreateRoomModalProps = {
  show: boolean;
}

const CreateRoomModal = (props: CreateRoomModalProps) => {
  const { show } = props;
  const [roomName, setRoomName] = useState('');
  const [selectedGame, setSelectedGame] = useState<OptionType>();

  return (
    <Modal title="New Room" show={show}>
      <Input
        type="text"
        placeholder="請輸入房間名稱"
        label="房間名稱"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <Select
        value={selectedGame}
        options={[
          {label: '象棋', value: GamePack.ChineseChess}
        ]}
        onChange={(o) => setSelectedGame(o)}
      />
    </Modal>
  );
}

export default CreateRoomModal;
