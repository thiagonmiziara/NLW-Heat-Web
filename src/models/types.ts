export type MessageProps = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

export type UserProps = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

export type AuthContextProps = {
  user: UserProps | null;
  signInUrl: string;
  signOut: () => void;
};
