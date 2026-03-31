"use client"
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Card } from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react";



export default function Page() {

    const [visible, setVisible] = useState(false)

    return (
        <>
            <div className="min-h-dvh w-full flex flex-col justify-center items-center">
                <Card className="w-full py-0 max-w-[min(95vw,640px)] sm:max-w-[520px] md:max-w-[640px] border-cyan-500/25 bg-card/95 shadow-[0_18px_60px_rgba(2,6,23,0.24)]">

                    <CardHeader className="relative rounded-t-xl border-b border-border bg-background/70 px-5 pt-4 text-center sm:px-6">

                        <CardTitle className="text-2xl">
                            Acesso Admin
                        </CardTitle>

                        <CardDescription>
                            Adicione as credênciais de acesso.
                        </CardDescription>

                    </CardHeader>

                    <CardContent className="max-h-[78vh] overflow-y-auto px-5 pt-6 pb-6 sm:px-6 sm:pb-6">

                        <form
                            className="grid gap-2 py-4 sm:gap-4"
                            aria-label="Formulário de acesso admin"
                        >

                            <div className="grid gap-2.5">
                                <Label htmlFor="username">Usuário</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    autoComplete="username"
                                    placeholder="Seu login"
                                    title="Palávra passe admin"
                                    required
                                />
                            </div>

                            <div className="grid gap-2.5">
                                <Label htmlFor="password">Senha</Label>
                                <div className="grid grid-cols-6 sm:grid-cols-8 gap-4">
                                    <Input
                                        type={ visible ? "text" : "password" }
                                        className="col-span-5 sm:col-span-7 w-full"
                                        id="password"
                                        name="password"
                                        autoComplete="password"
                                        placeholder="Senha de acesso"
                                        title="Senha de acesso admin"
                                        required
                                    />
                                    <Button onClick={() => setVisible(prev => !prev)} type="button" className="cursor-pointer col-span-1" variant={"outline"}>
                                        {visible ? <EyeOpenIcon /> : <EyeClosedIcon />}
                                    </Button>
                                </div>
                            </div>

                            <CardFooter className="px-0 pt-2 flex mt-2 flex-col-reverse gap-4 sm:grid sm:grid-cols-2 sm:gap-8 rounded-b-2xl">
                                <Link href={"/"}>
                                <Button type={"button"} className="w-full cursor-pointer" variant={"secondary"} title="Voltar para home">Voltar</Button>
                                </Link>
                                <Button
                                    type="submit"
                                    className="w-full bg-cyan-500 hover:bg-cyan-400 cursor-pointer text-white"
                                    variant={"default"}
                                    title="Fazer login"
                                >Login</Button>
                            </CardFooter>
                        </form>

                    </CardContent>
                </Card>
            </div>
        </>
    )
}