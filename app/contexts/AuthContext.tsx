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

  // Verificar autenticação ao montar (via cookie HttpOnly)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/verify", {
          credentials: "include", // Enviar cookies
        });

        if (response.ok) {
          const data = await response.json();
          setToken(data.token);
          setAdminId(data.adminId);
        } else {
          setToken(null);
          setAdminId(null);
        }
      } catch {
        console.error("Erro ao verificar autenticação");
        setToken(null);
        setAdminId(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (newToken: string, newAdminId: string) => {
    try {
      // Salvar token via API (que retorna cookie HttpOnly)
      const response = await fetch("/api/auth/set-token", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: newToken, adminId: newAdminId }),
      });

      if (response.ok) {
        setToken(newToken);
        setAdminId(newAdminId);
      } else {
        throw new Error("Falha ao salvar autenticação");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setToken(null);
      setAdminId(null);
      router.push("/login");
    }
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
