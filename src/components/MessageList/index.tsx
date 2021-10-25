import { useEffect, useState } from "react";
import io from "socket.io-client";

import { getMessagesList } from "../../services/messages";
import { MessageProps } from "../../models/types";

import logoImg from "../../assets/logo.svg";
import styles from "./styles.module.scss";

const messagesQueue: MessageProps[] = [];

const socket = io("http://localhost:4000");

socket.on("new_message", (newMessage: MessageProps) => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  const listMessages = async () => {
    const response = await getMessagesList();
    if (response) {
      setMessages(response);
    } else {
      setMessages([]);
    }
  };

  useEffect(() => {
    listMessages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages((oldValue) =>
          [messagesQueue[0], oldValue[0], oldValue[1]].filter(Boolean)
        );

        messagesQueue.shift();
      }
    }, 3000);
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
