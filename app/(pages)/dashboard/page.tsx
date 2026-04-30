import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
    return (
        <>
            <Card className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-screen bg-transparent w-full gap-0 rounded-0">
                <CardHeader className="py-4 border-b rounded-0">
                    <h1>Header</h1>
                </CardHeader>
                <CardContent className="flex-1 grid grid-cols-6 p-0">
                    <div className="h-full hidden md:flex md:col-span-1 sticky flex-col gap-8 justify-between py-8">
                        <ul className="list-none">
                            <li>Home</li>
                            <li>Projetos</li>
                            <li>Configurações</li>
                        </ul>
                        <div className="flex flex-col gap-2">
                            <hr className="bg-gray-100" />
                            <Link className="bg-linear-to-br w-11/12 mx-auto from-gray-700/50 to-blue-500/50 bg- rounded-2xl text-center py-1 block" href={"/"}>Sair</Link>
                        </div>
                    </div>
                    <div className="w-screen mx-auto bg-gray-800/50 col-span-6 md:col-span-5">
                        <h1>
                            Contents
                        </h1>
                    </div>
                </CardContent>
                <CardFooter className="py-4 border-t">
                    <h1>Footer</h1>
                </CardFooter>
            </Card>
        </>
    )
}