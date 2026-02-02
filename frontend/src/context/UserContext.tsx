"use client";
import { getUser } from "@/lib/actions/auth";
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
}

interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const UserStateContext = createContext<UserContextType | undefined>(undefined);

const UserContext = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const res = await getUser();
      if (res.status === 200 && res.user) {
        setUser(res.user);
      }
    };

    getCurrentUser();
  }, []);

  return (
    <UserStateContext.Provider value={{ user, setUser }}>
      {children}
    </UserStateContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserStateContext);
  if (!context)
    throw new Error("useUserContext must be used within UserContext");
  return context;
};

export default UserContext;
