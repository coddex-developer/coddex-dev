"use client"

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Card } from "@radix-ui/themes";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import * as z from "zod";
import axios from "axios";
const url = process.env.NEXT_PUBLIC_API_URL
const loginSchema = z.object({
  username: z.string().min(4, "O mínimo de caracteres permitido é 4"),
  password: z.string().min(4, "O mínimo de caracteres permitido é 4"),
});

export default function Page() {
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // evita múltiplos submits
    if (isLoading) return;

    const parsed = loginSchema.safeParse({ username, password });

    if (!parsed.success) {
      const firstError = parsed.error?.issues[0];
      toast.error("Dados inválidos", {
        description:
          firstError?.message || "Verifique os dados do formulário.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axios.post(url+"/api/auth/login", parsed.data);

      if (!data || !data.token) {
        toast.error("Erro ao autenticar", {
          description: data?.message || "Resposta inválida do servidor.",
        });
        return;
      }

      const tokenParts = data.token.split(".");
      const payload =
        tokenParts.length === 3
          ? JSON.parse(atob(tokenParts[1]))
          : null;

      const adminId = payload?.sub || payload?.id || "";

      if (!adminId) {
        toast.error("Erro ao autenticar", {
          description: "ID do usuário não encontrado no token.",
        });
        return;
      }

      await login(data.token, adminId);

      toast.success("Login realizado com sucesso!");
      router.push("/dashboard");
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : error instanceof Error
        ? error.message
        : "Erro desconhecido";

      toast.error("Erro ao conectar", {
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-dvh w-full flex flex-col justify-center items-center">
      <Card className="w-full rounded-2xl py-0 max-w-[min(95vw,640px)] sm:max-w-[520px] md:max-w-[640px] border-cyan-500/25 bg-card/95 shadow-[0_18px_60px_rgba(2,6,23,0.24)]">

        <CardHeader className="relative rounded-t-xl border-b border-border bg-background/70 px-5 pt-4 text-center sm:px-6">
          <CardTitle className="text-2xl">
            Acesso Admin
          </CardTitle>

          <CardDescription>
            Adicione as credenciais de acesso.
          </CardDescription>
        </CardHeader>

        <CardContent className="max-h-[78vh] rounded-b-2xl overflow-y-auto px-5 pt-6 pb-6 sm:px-6 sm:pb-6">
          <form
            className="grid gap-2 py-4 sm:gap-4"
            aria-label="Formulário de acesso admin"
            onSubmit={handleSubmit}
          >

            <div className="grid gap-2.5">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                name="username"
                autoComplete="username"
                placeholder="Seu login"
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="grid gap-2.5">
              <Label htmlFor="password">Senha</Label>

              <div className="grid grid-cols-6 sm:grid-cols-8 gap-4">
                <Input
                  type={visible ? "text" : "password"}
                  className="col-span-5 sm:col-span-7 w-full"
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Senha de acesso"
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />

                <Button
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setVisible((prev) => !prev)}
                  type="button"
                  disabled={isLoading}
                  className="cursor-pointer col-span-1"
                  variant={"outline"}
                >
                  {visible ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </Button>
              </div>
            </div>

            <CardFooter className="px-0 pt-2 flex mt-2 flex-col-reverse gap-4 sm:grid sm:grid-cols-2 sm:gap-8 rounded-b-2xl">
              <Link className="w-full cursor-pointer" href={"/"}>
                <Button
                  className="w-full"
                  type="button"
                  variant={"secondary"}
                  disabled={isLoading}
                >
                  Voltar
                </Button>
              </Link>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-white disabled:opacity-60"
                variant={"default"}
              >
                {isLoading ? "Entrando..." : "Login"}
              </Button>
            </CardFooter>

          </form>
        </CardContent>

      </Card>
    </div>
  );
}