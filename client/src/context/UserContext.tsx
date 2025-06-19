import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  role: "user" | "therapist" | "admin";
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  getToken: () => string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const getToken = () => {
    return localStorage.getItem('token');
  };

  return (
    <UserContext.Provider value={{ user, setUser, getToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
}; 