"use client";

import { ProtectedRoute } from "@/app/components/ProtectedRoute";
import { DashboardSidebar } from "@/app/components/DashboardSidebar";
import { DashboardHeader } from "@/app/components/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <DashboardSidebar />

        <div className="lg:pl-64">
          <DashboardHeader />

          <main className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
