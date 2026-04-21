"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useFetch } from "@/app/hooks/useFetch";
import { Settings, FolderOpen, LinkIcon, TrendingUp } from "lucide-react";

interface DashboardStats {
  stats: {
    totalProjects: number;
    totalLinks: number;
  };
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
}: {
  title: string;
  value: number;
  icon: any;
  description: string;
}) => (
  <div className="bg-card border border-border/50 rounded-xl p-4 sm:p-6 lg:p-8 hover:border-border/80 transition-all shadow-sm">
    <div className="flex items-start justify-between">
      <div className="flex-1 min-w-0">
        <p className="text-foreground/60 text-xs sm:text-sm mb-2 truncate">{title}</p>
        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          {value}
        </p>
        <p className="text-xs text-foreground/50 mt-2 sm:mt-3 line-clamp-2">{description}</p>
      </div>
      <div className="ml-3 sm:ml-4 p-2 sm:p-3 bg-background/50 rounded-lg flex-shrink-0">
        <Icon size={20} className="text-cyan-400" />
      </div>
    </div>
  </div>
);

export default function DashboardPage() {
  const { adminId } = useAuth();
  const { data, isLoading, error } = useFetch<DashboardStats>(
    "/api/dashboard/overview"
  );

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Bem-vindo ao Dashboard!</h1>
        <p className="text-foreground/60 text-sm sm:text-base lg:text-lg">
          Gerencie seu site e portfólio em um único lugar
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-card border border-border rounded-xl p-4 sm:p-6 lg:p-8 animate-pulse h-24 sm:h-32" />
          <div className="bg-card border border-border rounded-xl p-4 sm:p-6 lg:p-8 animate-pulse h-24 sm:h-32" />
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <p className="text-red-400 font-medium text-sm">Erro ao carregar estatísticas</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <StatCard
            title="Total de Projetos"
            value={data?.stats.totalProjects || 0}
            icon={FolderOpen}
            description="Projetos adicionados ao seu portfólio"
          />
          <StatCard
            title="Links de Contato"
            value={data?.stats.totalLinks || 0}
            icon={LinkIcon}
            description="Links sociais configurados"
          />
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-card border border-border/50 rounded-xl p-4 sm:p-6 lg:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <TrendingUp size={18} className="text-cyan-400" />
          <h2 className="text-lg sm:text-xl font-semibold">Acesso Rápido</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <a
            href="/dashboard/projects"
            className="flex items-center gap-3 p-3 sm:p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-all border border-border/50 hover:border-cyan-500/50 group"
          >
            <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors flex-shrink-0">
              <FolderOpen size={18} className="text-cyan-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm truncate">Projetos</p>
              <p className="text-xs text-foreground/50 truncate">Gerenciar portfólio</p>
            </div>
          </a>

          <a
            href="/dashboard/links"
            className="flex items-center gap-3 p-3 sm:p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-all border border-border/50 hover:border-cyan-500/50 group"
          >
            <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors flex-shrink-0">
              <LinkIcon size={18} className="text-cyan-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm truncate">Links</p>
              <p className="text-xs text-foreground/50 truncate">Social media</p>
            </div>
          </a>

          <a
            href="/dashboard/settings"
            className="flex items-center gap-3 p-3 sm:p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-all border border-border/50 hover:border-cyan-500/50 group sm:col-span-2 lg:col-span-1"
          >
            <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors flex-shrink-0">
              <Settings size={18} className="text-cyan-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm truncate">Configurações</p>
              <p className="text-xs text-foreground/50 truncate">Perfil e website</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

