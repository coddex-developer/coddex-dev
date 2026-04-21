"use client";

import { useState, useEffect } from "react";
import { useFetch, apiFetch } from "@/app/hooks/useFetch";
import { useAuth } from "@/app/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

interface AdminConfig {
  id: string;
  phoneNumber?: string;
  imageProfile?: string;
  activateWebsite: boolean;
  adminId: string;
}

export default function SettingsPage() {
  const { token, adminId } = useAuth();
  const { data: config, isLoading } = useFetch<AdminConfig>(
    "/api/dashboard/config"
  );
  const [formData, setFormData] = useState({
    phoneNumber: "",
    imageProfile: "",
    activateWebsite: true,
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (config) {
      setFormData({
        phoneNumber: config.phoneNumber || "",
        imageProfile: config.imageProfile || "",
        activateWebsite: config.activateWebsite || true,
      });
    }
  }, [config]);

  const handleConfigSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config?.id || !adminId) return;

    setIsSubmitting(true);
    try {
      await apiFetch(
        `/api/dashboard/config/${config.id}`,
        "PUT",
        formData,
        token || ""
      );
      toast.success("Configurações atualizadas!");
    } catch (err) {
      toast.error("Erro ao atualizar");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Senhas não conferem");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Senha deve ter no mínimo 6 caracteres");
      return;
    }

    setIsSubmitting(true);
    try {
      await apiFetch(
        `/api/dashboard/admin/password/${adminId}`,
        "PUT",
        {
          currentPassword,
          newPassword,
        },
        token || ""
      );
      toast.success("Senha alterada com sucesso!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao alterar senha");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Configurações</h1>
          <p className="text-foreground/60 mt-2">Gerencie as configurações do seu website</p>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="bg-card border border-border rounded-xl h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Configurações</h1>
        <p className="text-foreground/60 mt-2">Gerencie as configurações do seu website</p>
      </div>

      {/* Website Config */}
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8 shadow-sm transition-all hover:border-border/80">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Configurações do Website</h2>
          <p className="text-sm text-foreground/60 mt-1">Configure informações públicas do seu website</p>
        </div>
        <form onSubmit={handleConfigSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                placeholder="+55 (11) 99999-9999"
                className="h-10 rounded-lg border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">URL Imagem de Perfil</Label>
              <Input
                id="image"
                type="url"
                value={formData.imageProfile}
                onChange={(e) =>
                  setFormData({ ...formData, imageProfile: e.target.value })
                }
                placeholder="https://exemplo.com/imagem.jpg"
                className="h-10 rounded-lg border-border/50"
              />
            </div>
          </div>

          <div className="bg-background/50 border border-border/50 rounded-lg p-4 flex items-center gap-3">
            <input
              type="checkbox"
              id="activateWebsite"
              checked={formData.activateWebsite}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  activateWebsite: e.target.checked,
                })
              }
              className="w-5 h-5 rounded border-border/50 accent-cyan-500 cursor-pointer"
            />
            <div className="flex-1">
              <Label htmlFor="activateWebsite" className="cursor-pointer font-medium">
                Website Ativo
              </Label>
              <p className="text-sm text-foreground/60 mt-0.5">Sua página será visível publicamente quando ativada</p>
            </div>
          </div>

          <Button disabled={isSubmitting} type="submit" className="w-full md:w-auto h-10">
            {isSubmitting ? "Salvando..." : "Salvar Configurações"}
          </Button>
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8 shadow-sm transition-all hover:border-border/80">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Alterar Senha</h2>
          <p className="text-sm text-foreground/60 mt-1">Atualize sua senha de acesso ao dashboard</p>
        </div>
        <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="current">Senha Atual</Label>
            <div className="relative">
              <Input
                id="current"
                type={showCurrentPassword ? "text" : "password"}
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Digite sua senha atual"
                className="h-10 rounded-lg border-border/50 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground transition-colors"
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new">Nova Senha</Label>
            <div className="relative">
              <Input
                id="new"
                type={showNewPassword ? "text" : "password"}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Digite sua nova senha"
                className="h-10 rounded-lg border-border/50 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground transition-colors"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm">Confirmar Senha</Label>
            <div className="relative">
              <Input
                id="confirm"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme sua nova senha"
                className="h-10 rounded-lg border-border/50 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button disabled={isSubmitting} type="submit" className="w-full h-10">
            {isSubmitting ? "Atualizando..." : "Alterar Senha"}
          </Button>
        </form>
      </div>
    </div>
  );
}

