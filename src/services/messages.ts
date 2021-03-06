import { api } from "./api";

type MessageProps = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

export const getMessagesList = async () => {
  const response = (await api.get<MessageProps[]>("/messages/last3")).data;

  return response;
};

export const postMessage = async (message: string) => {
  const response = (await api.post("messages", { message })).data;

  return response;
};
