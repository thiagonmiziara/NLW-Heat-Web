import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";
import { profileService } from "../services/profileService";
import { signInService } from "../services/signInService";

type UserProps = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

type AuthContextProps = {
  user: UserProps | null;
  signInUrl: string;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextProps);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=49a0a0e5503174966923`;

  const signIn = async (githubCode: string) => {
    const response = await signInService(githubCode);
    const { token, user } = response;

    localStorage.setItem("@dowhile:token", token);

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setUser(user);
  };

  const getProfile = async () => {
    const response = await profileService();
    setUser(response);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("@dowhile:token");
  };

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes("?code=");
    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split("?code=");

      window.history.pushState({}, "", urlWithoutCode);

      signIn(githubCode);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("@dowhile:token");

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      getProfile();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInUrl,
        user,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
