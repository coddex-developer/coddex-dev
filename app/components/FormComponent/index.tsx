"use client"

import { useMemo, useState } from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useIsOpen } from "@/app/contexts/isOpenContext"
import { siteConfig } from "@/app/config/site"

type FormData = {
  name: string
  email: string
  subject: string
  message: string
}

const initialForm: FormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
}

export function FormComponent() {
  const { setIsOpen } = useIsOpen()
  const [form, setForm] = useState<FormData>(initialForm)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const canSubmit = useMemo(
    () =>
      form.name.trim().length > 2 &&
      form.email.includes("@") &&
      form.subject.trim().length > 2 &&
      form.message.trim().length > 10,
    [form]
  )

  const onChange =
    (field: keyof FormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }))
      if (status !== "idle") setStatus("idle")
    }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canSubmit || loading) return

    let timeoutId: ReturnType<typeof setTimeout> | null = null
    try {
      setLoading(true)
      setStatus("idle")
      const controller = new AbortController()
      timeoutId = setTimeout(() => controller.abort(), 12000)

      const payload = {
        _subject: `Novo contato portfolio: ${form.subject}`,
        _replyto: form.email,
        source: "portfolio-web",
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: [
          `Nome: ${form.name}`,
          `Email: ${form.email}`,
          `Assunto: ${form.subject}`,
          "",
          "Mensagem:",
          form.message,
          "",
          `Origem: ${window.location.href}`,
          `Data: ${new Date().toISOString()}`,
        ].join("\n"),
      }

      const response = await fetch(siteConfig.forms.formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error("Falha ao enviar")
      }

      setStatus("success")
      setForm(initialForm)
    } catch {
      setStatus("error")
    } finally {
      if (timeoutId) clearTimeout(timeoutId)
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-[min(92vw,640px)] border-cyan-500/20 bg-card/90 p-0">
      <CardHeader className="border-b border-border bg-background/60 p-6 text-center">
        <CardTitle className="text-2xl text-foreground">Entre em contato</CardTitle>
        <CardDescription>Envie uma mensagem e retornarei em breve.</CardDescription>
      </CardHeader>

      <CardContent className="max-h-[78vh] overflow-y-auto p-4 sm:p-6">
        <form className="grid gap-4" onSubmit={onSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={form.name}
              onChange={onChange("name")}
              placeholder="Seu nome completo"
              className="text-foreground"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={onChange("email")}
              placeholder="voce@empresa.com"
              className="text-foreground"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="subject">Assunto</Label>
            <Input
              id="subject"
              value={form.subject}
              onChange={onChange("subject")}
              placeholder="Ex.: Landing page institucional"
              className="text-foreground"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="message">Mensagem</Label>
            <Textarea
              id="message"
              value={form.message}
              onChange={onChange("message")}
              placeholder="Descreva seu projeto, objetivo e prazo..."
              rows={6}
              className="h-36 resize-none text-foreground"
              required
            />
          </div>

          <div className="text-xs text-neutral-500">
            Contato alternativo: <span className="text-cyan-600 dark:text-cyan-300">{siteConfig.contactEmail}</span>
          </div>

          {status === "success" && (
            <p className="rounded-md border border-emerald-400/40 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-600 dark:text-emerald-300">
              Mensagem enviada com sucesso.
            </p>
          )}
          {status === "error" && (
            <p className="rounded-md border border-red-400/40 bg-red-400/10 px-3 py-2 text-xs text-red-600 dark:text-red-300">
              Nao foi possivel enviar agora. Tente novamente em instantes.
            </p>
          )}

          <CardFooter className="mt-1 grid grid-cols-1 gap-3 border-t border-border bg-background/50 px-0 pt-5 sm:grid-cols-2 sm:gap-4">
            <Button
              onClick={() => setIsOpen(false)}
              variant="outline"
              type="button"
              className="w-full cursor-pointer text-neutral-600 transition duration-200 hover:-translate-y-0.5 hover:text-cyan-600 dark:text-neutral-200 dark:hover:text-cyan-200"
            >
              Fechar
            </Button>
            <Button
              type="submit"
              disabled={!canSubmit || loading}
              className="w-full cursor-pointer bg-cyan-500 text-white transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Enviar mensagem"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}
