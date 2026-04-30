import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
    return (
        <>
            <Card className="relative min-h-screen w-full p-0 gap-0">
                <CardHeader className="py-4 border-b">
                    <h1>Header</h1>
                </CardHeader>
                <CardContent className="grid grid-cols-6 p-0">
                    <div className="min-h-screen col-span-1 px-3 flex flex-col gap-8 justify-between py-8">
                        <ul className="list-none">
                            <li>Home</li>
                            <li>Projetos</li>
                            <li>Configurações</li>
                        </ul>
                        <div className="flex flex-col gap-2">
                            <hr className="bg-gray-100" />
                            <Link className="bg-linear-to-br from-gray-700/50 to-blue-500/50 bg- rounded-2xl text-center py-1 block" href={"/"}>Sair</Link>
                        </div>
                    </div>
                    <div className="bg-yellow-500 col-span-5">
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