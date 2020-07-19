import { useState } from "react";
import { Box, TextField, Button } from "@material-ui/core";
import styles from '@styles/components/chat.module.scss';

type ChatProps = {
  onSubmit: (text: string) => void;
};

const Chat = (props: ChatProps) => {
  const {
    onSubmit,
  } = props;
  const [text, setText] = useState('');

  return (
    <Box className={styles.chat}>
      <Box className={styles.textArea}>
        Message...
      </Box>
      <Box display="flex">
        <TextField
          label="想說點什麼嗎？..."
          variant="outlined"
          color="primary"
          size="small"
          fullWidth
          onChange={(e) => setText(e.target.value)}
          className={styles.textField}
        />
        <Button variant="contained" color="primary" onClick={() => onSubmit(text)}>
          送出
        </Button>
      </Box>
    </Box>
  )
}

export default Chat;
