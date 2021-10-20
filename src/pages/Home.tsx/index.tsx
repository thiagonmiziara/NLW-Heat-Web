import { useContext } from "react";
import { AuthContext } from "../../context/auth";

import { MessageList } from "../../components/MessageList";
import { SendMessageForm } from "../../components/SendMessageForm";
import { LoginBox } from "../../components/LoginBox";

import styles from "./styles.module.scss";

export function Home() {
  const { user } = useContext(AuthContext);
  return (
    <main
      className={`${styles.contentWrapper} ${
        !!user ? styles.contentSigned : ""
      }`}
    >
      <MessageList />
      {!!user ? <SendMessageForm /> : <LoginBox />}
    </main>
  );
}
