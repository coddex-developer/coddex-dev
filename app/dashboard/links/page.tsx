"use client";

import { useState } from "react";
import { useFetch, apiFetch } from "@/app/hooks/useFetch";
import { useAuth } from "@/app/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Trash2, Edit2, Plus, ExternalLink, X } from "lucide-react";

interface ContactLink {
  id: string;
  icon?: string;
  url?: string;
  createdAt: string;
}

export default function LinksPage() {
  const { token, adminId } = useAuth();
  const { data: linksResponse, isLoading, error } = useFetch<{ data: ContactLink[] }>(
    "/api/dashboard/links"
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    icon: "",
    url: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const links = linksResponse?.data || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminId) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        adminId,
      };

      if (editingId) {
        await apiFetch(
          `/api/dashboard/links/${editingId}`,
          "PUT",
          payload,
          token || ""
        );
        toast.success("Link atualizado!");
      } else {
        await apiFetch(`/api/dashboard/links`, "POST", payload, token || "");
        toast.success("Link criado!");
      }

      setFormData({ icon: "", url: "" });
      setEditingId(null);
      window.location.reload();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    toast.promise(
      apiFetch(
        `/api/dashboard/links/${id}`,
        "DELETE",
        null,
        token || ""
      ),
      {
        loading: "Excluindo link...",
        success: "Link excluído com sucesso!",
        error: "Erro ao excluir link",
      }
    ).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Gerenciar Links</h1>
        <p className="text-foreground/60 mt-2">Adicione e gerencie seus links de contato</p>
      </div>

      {/* Form */}
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8 shadow-sm transition-all hover:border-border/80">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">
              {editingId ? "Editar Link" : "Novo Link"}
            </h2>
            <p className="text-sm text-foreground/60 mt-1">
              {editingId ? "Atualize os dados do link" : "Adicione um novo link de contato"}
            </p>
          </div>
          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setFormData({ icon: "", url: "" });
              }}
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="icon">Ícone (lucide-react)</Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
                placeholder="github, linkedin, twitter, mail"
                className="h-10 rounded-lg border-border/50"
              />
              <p className="text-xs text-foreground/50">Use nomes de ícones do lucide-react</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                required
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                placeholder="https://exemplo.com"
                className="h-10 rounded-lg border-border/50"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button disabled={isSubmitting} type="submit" className="h-10">
              {isSubmitting ? "Salvando..." : editingId ? "Atualizar Link" : "Criar Link"}
            </Button>
            {editingId && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ icon: "", url: "" });
                }}
                className="h-10"
              >
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* List */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Links</h2>
            <p className="text-sm text-foreground/60 mt-1">{links.length} link(s) cadastrado(s)</p>
          </div>
        </div>
        
        {isLoading ? (
          <div className="animate-pulse space-y-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl h-20"
              />
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <p className="text-red-400">Erro ao carregar links</p>
          </div>
        ) : links.length === 0 ? (
          <div className="text-center py-12 bg-background/50 rounded-xl border border-border/50">
            <p className="text-foreground/60 font-medium">Nenhum link cadastrado</p>
            <p className="text-foreground/40 text-sm mt-1">Crie seu primeiro link usando o formulário acima</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {links.map((link) => (
              <div
                key={link.id}
                className="bg-card border border-border/50 rounded-xl p-4 flex items-center justify-between hover:border-border/80 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">{link.icon || "Link"}</p>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 truncate mt-1"
                  >
                    <span className="truncate">{link.url}</span>
                    <ExternalLink size={14} className="flex-shrink-0" />
                  </a>
                </div>
                <div className="flex gap-2 ml-4 flex-shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingId(link.id);
                      setFormData({
                        icon: link.icon || "",
                        url: link.url || "",
                      });
                    }}
                    className="h-9 px-3"
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(link.id)}
                    className="h-9 px-3"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

