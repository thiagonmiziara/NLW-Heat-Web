import { FormEvent, useState } from "react";
import { VscGithubInverted, VscSignOut } from "react-icons/vsc";

import { useAuth } from "../../hooks/useAuth";
import { postMessage } from "../../services/messages";

import styles from "./styles.module.scss";

export function SendMessageForm() {
  const { user, signOut } = useAuth();
  const [message, setMessage] = useState("");

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }
    postMessage(message);

    setMessage("");
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button className={styles.signOutButton} onClick={signOut}>
        <VscSignOut size={32} />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size={16} />
          {user?.login}
        </span>
      </header>

      <form className={styles.sendMessageForm} onSubmit={handleSendMessage}>
        <label htmlFor='message'>Mensagem</label>
        <textarea
          name='message'
          id='message'
          placeholder='Qual sua expectativa para o evento?'
          onChange={({ target }) => setMessage(target.value)}
          value={message}
        />
        <button type='submit'>Enviar mensagem</button>
      </form>
    </div>
  );
}
