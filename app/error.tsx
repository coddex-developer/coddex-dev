"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log profissional (pode integrar com Sentry depois)
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold">Algo deu errado</h2>

      {/* Em desenvolvimento você pode mostrar a mensagem */}
      {process.env.NODE_ENV === "development" && (
        <p className="text-sm text-red-500">{error.message}</p>
      )}

      <button
        onClick={() => reset()}
        className="rounded-md bg-black px-4 py-2 text-white hover:opacity-80"
      >
        Tentar novamente
      </button>
    </div>
  );
}