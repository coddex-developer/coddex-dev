"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  token: string | null;
  adminId: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, adminId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [adminId, setAdminId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Recuperar token do localStorage ao montar
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedAdminId = localStorage.getItem("adminId");
    
    if (storedToken && storedAdminId) {
      setToken(storedToken);
      setAdminId(storedAdminId);
    }
    
    setIsLoading(false);
  }, []);

  const login = (newToken: string, newAdminId: string) => {
    setToken(newToken);
    setAdminId(newAdminId);
    localStorage.setItem("token", newToken);
    localStorage.setItem("adminId", newAdminId);
  };

  const logout = () => {
    setToken(null);
    setAdminId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("adminId");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        adminId,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
