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
import { useIsOpen } from "@/app/contexts/isOpenContext"

export function FormComponent() {
    const { setIsOpen } = useIsOpen()
    return (
        <>
            <Card className="w-sm md:w-lg lg:max-w-xl backdrop-blur-4xl p-0">
                <CardHeader className="border-b dark:bg-gray-900/60 border-border p-6 text-center">
                    <CardTitle className="text-2xl dark:dark:text-neutral-200">
                        Entre em contato
                    </CardTitle>

                    <CardDescription>
                        Envie uma mensagem e retornarei em breve
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-5">
                        <div className="grid gap-2">
                            <Label className="dark:text-neutral-200" htmlFor="name">Nome</Label>
                            <Input
                                id="name"
                                placeholder="Seu nome"
                                className="dark:text-neutral-200" />
                        </div>
                        <div className="grid gap-2">
                            <Label className="dark:text-neutral-200" htmlFor="message">Mensagem</Label>
                            <Textarea
                                id="message"
                                placeholder="Digite sua mensagem..."
                                rows={5}
                                className="resize-none h-30 lg:h-40 dark:text-neutral-200"
                            />
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="border-t dark:bg-gray-900/60 border-border grid gap-7 md:gap-10 grid-cols-2 p-6">
                    <Button onClick={() => setIsOpen(false)} variant={"outline"} type="button" className=" hover:-translate-y-0.5 hover:text-neutral-600 transition duration-200 cursor-pointer w-full text-neutral-600 dark:dark:text-neutral-200">
                        Cancelar
                    </Button>
                    <Button type="button" className="hover:-translate-y-0.5 transition duration-200 cursor-pointer w-full bg-green-600 dark:bg-slate-600 hover:bg-green-500 dark:hover:bg-slate-500 dark:text-neutral-100">
                        Enviar mensagem
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}