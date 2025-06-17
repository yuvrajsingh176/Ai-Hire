import { createContext } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  picture: string;
  credits: string;
};

type UserContextType = {
  user: User;
  setUser?: (user: User) => void; // optional setter if needed
};

export const UserDetailContext = createContext<UserContextType>({
  user: {
    id: "",
    name: "",
    email: "",
    picture: "",
    credits: "",
  }
});
