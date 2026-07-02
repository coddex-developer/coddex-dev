"use client";

import { useAuth } from "@/app/contexts/AuthContext";

export function DashboardHeader() {
  const { adminId } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-xl sm:text-2xl font-bold truncate">Dashboard</h2>
            <p className="text-xs sm:text-sm text-foreground/60 truncate">
              Admin ID: {adminId?.slice(0, 8)}...
            </p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <div className="hidden sm:block w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="hidden sm:inline text-xs text-foreground/60">Online</span>
          </div>
        </div>
      </div>
    </header>
  );
}
