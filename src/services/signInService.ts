import { api } from "./api";

type SignInServiceProps = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  };
};

export const signInService = async (githubCode: string) => {
  const response = await api.post<SignInServiceProps>("/authenticate", {
    code: githubCode,
  });

  return response.data;
};
