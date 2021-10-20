import { api } from "./api";

type ProfileProps = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

export const profileService = async () => {
  const response = (await api.get<ProfileProps>("/profile")).data;

  return response;
};
