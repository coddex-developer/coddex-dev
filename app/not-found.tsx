import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <section className="w-full max-w-2xl rounded-2xl border border-cyan-500/25 bg-gradient-to-b from-cyan-500/15 to-transparent p-8 text-center">
        <p className="text-xl uppercase tracking-[0.2em] text-cyan-500">404</p>
        <h1 className="mt-2 text-4xl font-bold text-foreground">Oops página não encontrada!</h1>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          O link pode ter mudado ou não existe mais. Volte para a página inicial e continue navegando.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex rounded-lg bg-cyan-500/20 px-5 py-2 text-sm font-medium text-cyan-700 transition hover:bg-cyan-500/30 dark:text-cyan-200"
          >
            Voltar para home
          </Link>
        </div>
      </section>
    </main>
  )
}

