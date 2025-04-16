"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AdminStateContextProps {
  users: UserNT[];
  setUsers: React.Dispatch<React.SetStateAction<UserNT[]>>;
}

const AdminStateContext = createContext<AdminStateContextProps>(
  {} as AdminStateContextProps
);

export const AdminStateProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<UserNT[]>([]);

  return (
    <AdminStateContext.Provider
      value={{
        users,
        setUsers,
      }}
    >
      {children}
    </AdminStateContext.Provider>
  );
};

export const useAdminState = () => {
  const context = useContext(AdminStateContext);
  if (!context) {
    throw new Error("useAdminState must be used within an AdminStateProvider");
  }
  return context;
};
