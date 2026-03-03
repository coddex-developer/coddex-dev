"use client"

import Link from "next/link"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="pt-BR">
      <body className="m-0 min-h-screen bg-background px-4 text-foreground">
        <main className="flex min-h-screen items-center justify-center">
          <section className="w-full max-w-2xl rounded-2xl border border-red-500/35 bg-gradient-to-b from-red-500/15 to-transparent p-8 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-red-500">Erro global</p>
            <h1 className="mt-2 text-3xl font-bold">Falha inesperada na aplicacao</h1>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              Um erro critico aconteceu. Tente recarregar ou voltar para a pagina inicial.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={reset}
                className="rounded-lg bg-red-500/20 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-500/30 dark:text-red-300"
              >
                Recarregar
              </button>
              <Link
                href="/"
                className="rounded-lg bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-700 transition hover:bg-cyan-500/30 dark:text-cyan-200"
              >
                Ir para home
              </Link>
            </div>
          </section>
        </main>
      </body>
    </html>
  )
}

