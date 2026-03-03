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
  whatsappDdd: string
  whatsappNumber: string
  subject: string
  message: string
}

const initialForm: FormData = {
  name: "",
  email: "",
  whatsappDdd: "11",
  whatsappNumber: "",
  subject: "",
  message: "",
}

const brazilDdds = [
  "11", "12", "13", "14", "15", "16", "17", "18", "19",
  "21", "22", "24", "27", "28",
  "31", "32", "33", "34", "35", "37", "38",
  "41", "42", "43", "44", "45", "46",
  "47", "48", "49",
  "51", "53", "54", "55",
  "61", "62", "64", "63", "65", "66", "67", "68", "69",
  "71", "73", "74", "75", "77", "79",
  "81", "82", "83", "84", "85", "86", "87", "88", "89",
  "91", "92", "93", "94", "95", "96", "97", "98", "99",
]

const genericNumbers = new Set([
  "000000000",
  "111111111",
  "222222222",
  "333333333",
  "444444444",
  "555555555",
  "666666666",
  "777777777",
  "888888888",
  "999999999",
  "123456789",
  "987654321",
])

function toDigits(value: string) {
  return value.replace(/\D/g, "")
}

function isValidWhatsapp(ddd: string, number: string) {
  const phone = toDigits(number)
  if (!brazilDdds.includes(ddd)) return false
  if (phone.length !== 9) return false
  if (phone[0] !== "9") return false
  if (genericNumbers.has(phone)) return false
  if (/^(\d)\1+$/.test(phone)) return false
  return true
}

export function FormComponent() {
  const { setIsOpen } = useIsOpen()
  const [form, setForm] = useState<FormData>(initialForm)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [triedSubmit, setTriedSubmit] = useState(false)

  const whatsappIsValid = useMemo(
    () => isValidWhatsapp(form.whatsappDdd, form.whatsappNumber),
    [form.whatsappDdd, form.whatsappNumber]
  )

  const canSubmit = useMemo(
    () =>
      form.name.trim().length > 2 &&
      form.email.includes("@") &&
      whatsappIsValid &&
      form.subject.trim().length > 2 &&
      form.message.trim().length > 10,
    [form, whatsappIsValid]
  )

  const onChange =
    (field: keyof FormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let value = event.target.value
      if (field === "whatsappNumber") {
        value = toDigits(value).slice(0, 9)
      }
      setForm((prev) => ({ ...prev, [field]: value }))
      if (status !== "idle") setStatus("idle")
    }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setTriedSubmit(true)
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
        whatsapp: `+55 (${form.whatsappDdd}) ${form.whatsappNumber}`,
        subject: form.subject,
        message: [
          `Nome: ${form.name}`,
          `Email: ${form.email}`,
          `WhatsApp: +55 (${form.whatsappDdd}) ${form.whatsappNumber}`,
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
      setTriedSubmit(false)
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
            <Label htmlFor="whatsappNumber">WhatsApp</Label>
            <div className="grid grid-cols-[120px_1fr] gap-2">
              <select
                id="whatsappDdd"
                value={form.whatsappDdd}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, whatsappDdd: event.target.value }))
                }
                className="h-10 rounded-md border border-input bg-background px-2 text-sm text-foreground"
              >
                {brazilDdds.map((ddd) => (
                  <option key={ddd} value={ddd}>
                    +55 ({ddd})
                  </option>
                ))}
              </select>
              <Input
                id="whatsappNumber"
                type="tel"
                inputMode="numeric"
                value={form.whatsappNumber}
                onChange={onChange("whatsappNumber")}
                placeholder="987654321"
                className="text-foreground"
                required
              />
            </div>
            <p className="text-[11px] text-muted-foreground">
              Use apenas numeros no contato. Exemplo: 987654321
            </p>
            {(triedSubmit || form.whatsappNumber.length > 0) && !whatsappIsValid && (
              <p className="rounded-md border border-red-500/50 bg-red-500/15 px-3 py-2 text-xs font-medium text-red-700 dark:text-red-300">
                Numero de WhatsApp invalido. Use DDD brasileiro e um numero real de 9 digitos.
              </p>
            )}
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
            <div className="rounded-md border border-emerald-400/50 bg-emerald-400/15 px-3 py-3 text-sm text-emerald-800 dark:text-emerald-300">
              <p className="font-semibold">Mensagem enviada com sucesso.</p>
              <p className="mt-1 font-medium">
                Obrigado pelo contato. Vou responder no seu WhatsApp ou email em breve com os proximos passos.
              </p>
            </div>
          )}
          {status === "error" && (
            <p className="rounded-md border border-red-500/50 bg-red-500/15 px-3 py-2 text-sm font-semibold text-red-700 dark:text-red-300">
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
