"use client"

import { useEffect, useMemo, useRef, useState } from "react"
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
import { X, Send } from "lucide-react"
import { toast } from "sonner"

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
  "11","12","13","14","15","16","17","18","19",
  "21","22","24","27","28",
  "31","32","33","34","35","37","38",
  "41","42","43","44","45","46",
  "47","48","49",
  "51","53","54","55",
  "61","62","63","64","65","66","67","68","69",
  "71","73","74","75","77","79",
  "81","82","83","84","85","86","87","88","89",
  "91","92","93","94","95","96","97","98","99",
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

function formatWhatsapp(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 9)

  if (!digits) return ""
  if (digits.length <= 1) return digits
  if (digits.length <= 5) return `${digits[0]} ${digits.slice(1)}`
  return `${digits[0]} ${digits.slice(1,5)}-${digits.slice(5)}`
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
  const { isOpen, setIsOpen } = useIsOpen()
  const formRef = useRef<HTMLFormElement | null>(null)

  const [form, setForm] = useState<FormData>(initialForm)
  const [loading, setLoading] = useState(false)
  const [triedSubmit, setTriedSubmit] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const syncFromDom = () => {
      const formEl = formRef.current
      if (!formEl) return

      const data = new FormData(formEl)
      const next: FormData = {
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        whatsappDdd: String(data.get("whatsappDdd") ?? "11"),
        whatsappNumber: String(data.get("whatsappNumber") ?? ""),
        subject: String(data.get("subject") ?? ""),
        message: String(data.get("message") ?? ""),
      }

      setForm((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(next)) return prev
        return next
      })
    }

    const rafId = requestAnimationFrame(syncFromDom)
    return () => cancelAnimationFrame(rafId)
  }, [isOpen])

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
        value = formatWhatsapp(value)
      }

      setForm((prev) => ({ ...prev, [field]: value }))
    }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault()
    setTriedSubmit(true)

    if (!canSubmit || loading) return

    let timeoutId: ReturnType<typeof setTimeout> | null = null

    try {

      setLoading(true)

      const controller = new AbortController()
      timeoutId = setTimeout(() => controller.abort(), 12000)

      const payload = {
        _subject: `Novo contato portfólio: ${form.subject}`,
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

      if (!response.ok) throw new Error()

      toast.success("Mensagem enviada com sucesso!", {
        description: "Responderei em breve pelo WhatsApp ou email.",
      })

      setForm(initialForm)
      setTriedSubmit(false)

      setTimeout(() => {
        setIsOpen(false)
      }, 1500)

    } catch {

      toast.error("Falha ao enviar mensagem", {
        description: "Tente novamente em alguns instantes.",
      })

    } finally {
      if (timeoutId) clearTimeout(timeoutId)
      setLoading(false)
    }
  }

  return (
    <Card className="w-full py-0 max-w-[min(95vw,640px)] sm:max-w-[520px] md:max-w-[640px] border-cyan-500/25 bg-card/95 shadow-[0_18px_60px_rgba(2,6,23,0.24)]">

      <CardHeader className="relative rounded-t-lg border-b border-border bg-background/70 px-5 pt-4 text-center sm:px-6">

        <Button
          type="button"
          aria-label="Fechar formulário de contato"
          onClick={() => setIsOpen(false)}
          className="absolute cursor-pointer right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-muted/40 text-muted-foreground hover:border-cyan-500/40 hover:text-cyan-600"
        >
          <X size={16} />
        </Button>

        <CardTitle className="text-2xl">
          Entre em contato
        </CardTitle>

        <CardDescription>
          Envie uma mensagem e retornarei em breve.
        </CardDescription>

      </CardHeader>

      <CardContent className="max-h-[78vh] overflow-y-auto px-5 pb-4 sm:px-6 sm:pb-6">

        <form
          className="grid gap-2 sm:gap-4"
          onSubmit={onSubmit}
          aria-label="Formulário de contato"
          ref={formRef}
        >

          {/* honeypot anti spam */}
          <input
            type="text"
            name="company"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid gap-2.5">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={onChange("name")}
              placeholder="Seu nome completo"
              required
            />
          </div>

          <div className="grid gap-2.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={onChange("email")}
              placeholder="voce@empresa.com"
              required
            />
          </div>

          <div className="grid gap-2.5">
            <Label htmlFor="whatsappNumber">WhatsApp</Label>

            <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[120px_1fr] gap-2">

              <select
                name="whatsappDdd"
                value={form.whatsappDdd}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, whatsappDdd: e.target.value }))
                }
                className="h-9 rounded-md border px-2 text-sm"
              >
                {brazilDdds.map((ddd) => (
                  <option key={ddd} value={ddd}>
                    +55 ({ddd})
                  </option>
                ))}
              </select>

              <Input
                id="whatsappNumber"
                name="whatsappNumber"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                value={form.whatsappNumber}
                onChange={onChange("whatsappNumber")}
                placeholder="9 9999-9999"
                required
              />

            </div>

            {(triedSubmit || form.whatsappNumber.length > 0) && !whatsappIsValid && (
              <p className="text-xs text-red-500">
                Número de WhatsApp inválido.
              </p>
            )}
          </div>

          <div className="grid gap-2.5">
            <Label htmlFor="subject">Assunto</Label>
            <Input
              id="subject"
              name="subject"
              value={form.subject}
              onChange={onChange("subject")}
              placeholder="Ex.: Landing page institucional"
              required
            />
          </div>

          <div className="grid gap-2.5">
            <Label htmlFor="message">Mensagem</Label>
            <Textarea
              id="message"
              name="message"
              value={form.message}
              onChange={onChange("message")}
              placeholder="Descreva seu projeto..."
              rows={4}
              required
            />
          </div>

          <CardFooter className="px-0 pt-2">
            <Button
              type="submit"
              disabled={!canSubmit || loading}
              className="w-full bg-cyan-500 hover:bg-cyan-400"
            >
              <Send size={16} />
              {loading ? "Enviando mensagem..." : "Enviar mensagem"}
            </Button>
          </CardFooter>

        </form>

      </CardContent>
    </Card>
  )
}
