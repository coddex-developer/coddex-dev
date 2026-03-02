"use client"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import { MagicCard } from "@/components/ui/magic-card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function FormComponent() {
  return (
    <div className="relative flex items-center justify-center min-h-[100dvh] overflow-hidden px-4">

      {/* Background Blur Glow */}
      <div
        className="
          absolute
          w-[600px]
          h-[600px]
          bg-green-600
          opacity-40
          blur-[160px]
          rounded-full
        "
      />

      {/* FORM */}
      <Card className="relative w-full max-w-md border-none bg-transparent shadow-none">
        <MagicCard
          className="
            p-0
            backdrop-blur-xl
            bg-white/70
            dark:bg-neutral-900/70
            shadow-[0_20px_60px_rgba(0,0,0,0.25)]
            rounded-2xl
          "
        >
          <CardHeader className="border-b border-border p-6 text-center">
            <CardTitle className="text-2xl">
              Entre em contato
            </CardTitle>

            <CardDescription>
              Envie uma mensagem e retornarei em breve
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <form className="grid gap-5">
              
              {/* Nome */}
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                />
              </div>

              {/* Mensagem */}
              <div className="grid gap-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea
                  id="message"
                  placeholder="Digite sua mensagem..."
                  rows={5}
                  className="resize-none"
                />
              </div>

            </form>
          </CardContent>

          <CardFooter className="border-t border-border p-6">
            <Button className="w-full bg-green-600 hover:bg-green-500">
              Enviar mensagem
            </Button>
          </CardFooter>
        </MagicCard>
      </Card>
    </div>
  )
}