import Button from "components/Button";
import Input from "components/Input";
import styles from "styles/pages/rooms/chatArea.module.scss";

type ChatAreaProps = {
  messages: string[];
  startingCount?: number;
  onSubmit: () => void;
};

const ChatArea = (props: ChatAreaProps) => {
  const { messages, startingCount, onSubmit } = props;
  return (
    <>
      <div className={styles.chatArea}>
        {messages.map((m, idx) => (
          <div className={styles.row} key={idx}>
            {m}
          </div>
        ))}
        {startingCount && (
          <div className={styles.countdown}>
            遊戲開始倒數 {startingCount} 秒...
          </div>
        )}
      </div>
      <div className={styles.inputArea}>
        <Input
          type="text"
          value=""
          placeholder="請輸入訊息..."
          onChange={() => {}}
        />
        {/* FIXME: 可以改成 input + button 的 component */}
        <Button color="secondary" title="送出" onClick={() => onSubmit()} />
      </div>
    </>
  );
};

export default ChatArea;
