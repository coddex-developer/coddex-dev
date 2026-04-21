"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useFetch<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...options?.headers,
          },
        });

        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Erro desconhecido");
        setError(error);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, token, options]);

  return { data, isLoading, error };
}

export async function apiFetch<T>(
  url: string,
  method: string,
  body?: any,
  token?: string
): Promise<T> {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro na requisição");
  }

  return response.json();
}
