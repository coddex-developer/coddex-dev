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
        <div className="relative flex items-center justify-center min-h-[100dvh] overflow-hidden">

            {/* Background Blur Glow */}
            <div
                className="
          absolute
        "
            />

            {/* FORM */}
            <Card className="relative w-full  border-none bg-transparent shadow-none">
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

                    <CardContent className="p-6 w-sm lg:w-xl">
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
                                    className="resize-none h-50"
                                />
                            </div>

                        </form>
                    </CardContent>

                    <CardFooter className="border-t border-border grid gap-10 grid-cols-2 p-6">
                        <Button variant={"outline"} type="button" className="w-full text-neutral-600 dark:text-neutral-200">
                            Cancelar
                        </Button>
                        <Button type="button" className="w-full bg-green-600 hover:bg-green-500 dark:text-neutral-100">
                            Enviar mensagem
                        </Button>
                    </CardFooter>
                </MagicCard>
            </Card>
        </div>
    )
}