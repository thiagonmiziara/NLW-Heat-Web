import styles from "./styles.module.scss";

import logoImg from "../../assets/logo.svg";
import { useEffect, useState } from "react";

import { getMessagesList } from "../../services/messages";

type MessageProps = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

export function MessageList() {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  const listMessages = async () => {
    const response = await getMessagesList();
    if (response) {
      setMessages(response);
    }
  };

  useEffect(() => {
    listMessages();
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <img
        src={logoImg}
        alt='Imagem do evento DoWhile 2021'
        title='Imagem do evento DoWhile 2021'
      />

      <ul className={styles.messageList}>
        {messages &&
          messages?.map((message) => {
            return (
              <li className={styles.message} key={message.id}>
                <p className={styles.messageContent}>{message.text}</p>
                <div className={styles.messageUser}>
                  <div className={styles.userImage}>
                    <img
                      src={message.user.avatar_url}
                      alt={message.user.name}
                    />
                  </div>
                  <span>{message.user.name}</span>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
