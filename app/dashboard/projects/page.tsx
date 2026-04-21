"use client";

import { useState } from "react";
import { useFetch, apiFetch } from "@/app/hooks/useFetch";
import { useAuth } from "@/app/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Trash2, Plus, Edit2, X, Upload, GripVertical } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  stack: string[];
  highlights: string[];
  images: string[];
  liveUrl?: string;
  repoUrl?: string;
  createdAt: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project | null;
  onSave: (project: Partial<Project>) => void;
  isLoading: boolean;
}

function DraggableImage({
  image,
  index,
  onRemove,
  onDragStart,
  onDragOver,
  onDrop
}: {
  image: string;
  index: number;
  onRemove: (index: number) => void;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
}) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
      className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg cursor-move hover:bg-background/80 transition-colors"
    >
      <GripVertical size={16} className="text-foreground/60 flex-shrink-0" />
      <img
        src={image}
        alt={`Imagem ${index + 1}`}
        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded flex-shrink-0"
      />
      <span className="flex-1 text-xs sm:text-sm truncate min-w-0">
        {image.split('/').pop() || `Imagem ${index + 1}`}
      </span>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => onRemove(index)}
        className="flex-shrink-0 h-8 w-8 p-0"
      >
        <X size={14} />
      </Button>
    </div>
  );
}

function ProjectModal({ isOpen, onClose, project, onSave, isLoading }: ProjectModalProps) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    category: project?.category || "",
    stack: project?.stack?.join(", ") || "",
    highlights: project?.highlights?.join(", ") || "",
    images: project?.images || [],
    liveUrl: project?.liveUrl || "",
    repoUrl: project?.repoUrl || "",
  });
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
    }
  };

  const handleImageRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newImages = [...formData.images];
    const draggedImage = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(dropIndex, 0, draggedImage);

    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
    setDraggedIndex(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      stack: formData.stack.split(",").map((s) => s.trim()).filter(Boolean),
      highlights: formData.highlights.split(",").map((s) => s.trim()).filter(Boolean),
    };

    onSave(payload);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-background border border-border rounded-xl p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl font-semibold">
            {project ? "Editar Projeto" : "Novo Projeto"}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="flex-shrink-0">
            <X size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="h-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <textarea
              id="description"
              required
              className="w-full bg-background border border-border rounded-lg p-3 min-h-[100px] resize-y"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="stack">Stack (separado por vírgula)</Label>
              <Input
                id="stack"
                value={formData.stack}
                onChange={(e) =>
                  setFormData({ ...formData, stack: e.target.value })
                }
                placeholder="React, TypeScript, Tailwind"
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="highlights">Destaques (separado por vírgula)</Label>
              <Input
                id="highlights"
                value={formData.highlights}
                onChange={(e) =>
                  setFormData({ ...formData, highlights: e.target.value })
                }
                placeholder="Responsivo, Performance, UX"
                className="h-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="liveUrl">URL ao Vivo</Label>
              <Input
                id="liveUrl"
                type="url"
                value={formData.liveUrl}
                onChange={(e) =>
                  setFormData({ ...formData, liveUrl: e.target.value })
                }
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="repoUrl">URL Repositório</Label>
              <Input
                id="repoUrl"
                type="url"
                value={formData.repoUrl}
                onChange={(e) =>
                  setFormData({ ...formData, repoUrl: e.target.value })
                }
                className="h-10"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Imagens (arraste para reordenar)</Label>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageAdd}
                  className="hidden"
                  id="image-upload"
                />
                <Label
                  htmlFor="image-upload"
                  className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg cursor-pointer hover:bg-background/80 transition-colors flex-1 sm:flex-none"
                >
                  <Upload size={16} />
                  Adicionar Imagens
                </Label>
              </div>

              {formData.images.length > 0 && (
                <div className="space-y-2 max-h-48 overflow-y-auto border border-border/50 rounded-lg p-3">
                  {formData.images.map((image, index) => (
                    <DraggableImage
                      key={`image-${index}`}
                      image={image}
                      index={index}
                      onRemove={handleImageRemove}
                      onDragStart={handleDragStart}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border/50">
            <Button disabled={isLoading} type="submit" className="flex-1 h-10">
              {isLoading
                ? "Salvando..."
                : project
                  ? "Atualizar"
                  : "Criar Projeto"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="h-10">
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const { token, adminId } = useAuth();
  const { data: projects, isLoading, error } = useFetch<{ data: Project[] }>(
    "/api/dashboard/projects"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async (projectData: Partial<Project>) => {
    if (!adminId) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ...projectData,
        adminId,
      };

      if (editingProject) {
        await toast.promise(
          apiFetch(
            `/api/dashboard/projects/${editingProject.id}`,
            "PUT",
            payload,
            token || ""
          ),
          {
            loading: "Atualizando projeto...",
            success: "Projeto atualizado com sucesso!",
            error: "Erro ao atualizar projeto",
          }
        );
      } else {
        await toast.promise(
          apiFetch(`/api/dashboard/projects`, "POST", payload, token || ""),
          {
            loading: "Criando projeto...",
            success: "Projeto criado com sucesso!",
            error: "Erro ao criar projeto",
          }
        );
      }

      setIsModalOpen(false);
      setEditingProject(null);
      window.location.reload();
    } catch (err) {
      // Error already shown by toast.promise
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    toast.promise(
      apiFetch(`/api/dashboard/projects/${id}`, "DELETE", null, token || ""),
      {
        loading: "Excluindo projeto...",
        success: "Projeto excluído com sucesso!",
        error: "Erro ao excluir projeto",
      }
    ).then(() => {
      window.location.reload();
    });
  };

  const openModal = (project?: Project) => {
    setEditingProject(project || null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Gerenciar Projetos</h1>
          <p className="text-foreground/60 text-sm sm:text-base mt-1">Adicione e gerencie seus projetos</p>
        </div>
        <Button onClick={() => openModal()} className="w-full sm:w-auto h-10">
          <Plus size={16} className="mr-2" />
          Novo Projeto
        </Button>
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={editingProject}
        onSave={handleSave}
        isLoading={isSubmitting}
      />

      {/* List */}
      <div>
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">Projetos</h2>
          <span className="text-xs sm:text-sm text-foreground/60 bg-background/50 px-2 py-1 rounded">
            {projects?.data?.length || 0} projeto(s)
          </span>
        </div>
        
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl h-20 sm:h-24"
              />
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <p className="text-red-400 font-medium">Erro ao carregar projetos</p>
          </div>
        ) : projects?.data?.length === 0 ? (
          <div className="text-center py-12 bg-background/50 rounded-xl border border-border/50">
            <p className="text-foreground/60 font-medium">Nenhum projeto cadastrado</p>
            <p className="text-foreground/40 text-sm mt-1">Crie seu primeiro projeto usando o botão acima</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {projects?.data?.map((project) => (
              <div
                key={project.id}
                className="bg-card border border-border/50 rounded-xl p-4 sm:p-6 hover:border-border/80 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-2 truncate">{project.title}</h3>
                    <p className="text-sm text-foreground/60 mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.stack?.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack && project.stack.length > 4 && (
                        <span className="text-xs text-foreground/50 px-2 py-1">
                          +{project.stack.length - 4} mais
                        </span>
                      )}
                    </div>
                    {project.images && project.images.length > 0 && (
                      <p className="text-xs text-foreground/50">
                        {project.images.length} imagem(ns)
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openModal(project)}
                      className="h-9 px-3"
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(project.id)}
                      className="h-9 px-3"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
