import React from "react";
import Image from "next/image";
import { Timeline } from "../ui/timeline";

export default function TimelineComponent() {
    const data = [
        {
            title: "2022 — Início da jornada",
            content: (
                <div key={1}>
                    <p className="mb-8 text-xs md:text-sm text-neutral-800 dark:text-neutral-200">
                        Em 2022 iniciei meus estudos em programação, aprendendo lógica de
                        programação, fundamentos da web e estruturação de páginas utilizando
                        HTML, CSS e JavaScript. Foi o período onde desenvolvi minha base
                        técnica e compreensão sobre funcionamento da internet e aplicações
                        web.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <Image src="/skills/html5andJs.png" alt="HTML CSS" width={500} height={500}
                            className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />

                        <Image src="/skills/html5andJs.png" alt="JavaScript" width={500} height={500}
                            className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />

                        <Image src="/skills/html5andJs.png" alt="Logic" width={500} height={500}
                            className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />

                        <Image src="/skills/html5andJs.png" alt="Git" width={500} height={500}
                            className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />
                    </div>
                </div>
            ),
        },

        {
            title: "2023 — Primeiros projetos reais",
            content: (
                <div key={2}>
                    <p className="mb-6 text-xs md:text-sm text-neutral-800 dark:text-neutral-200">
                        Durante 2023 avancei para desenvolvimento prático criando meus
                        primeiros projetos completos. Aprendi versionamento com Git,
                        consumo de APIs REST e organização de código baseada em componentes.
                    </p>

                    <p className="mb-8 text-xs md:text-sm text-neutral-800 dark:text-neutral-200">
                        Nesse período comecei a compreender arquitetura de aplicações,
                        manipulação de estados e integração entre front-end e back-end.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <Image src="/skills/nextAndReact.png" alt="API" width={500} height={500}
                            className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />

                        <Image src="/skills/nextAndReact.png" alt="Projects" width={500} height={500}
                            className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />

                        <Image src="/skills/nextAndReact.png" alt="Git workflow" width={500} height={500}
                            className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />

                        <Image src="/skills/nextAndReact.png" alt="Responsive" width={500} height={500}
                            className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />
                    </div>
                </div>
            ),
        },

        {
            title: "2024 — Especialização em Front-End",
            content: (
                <div key={3}>
                    <p className="mb-8 text-xs md:text-sm text-neutral-800 dark:text-neutral-200">
                        Em 2024 direcionei meus estudos para o ecossistema React,
                        aprofundando conhecimentos em componentização, hooks,
                        responsividade e performance. Passei a desenvolver interfaces
                        modernas utilizando React, Next.js e TailwindCSS.
                    </p>

                    <div className="mb-8 text-xs md:text-sm text-neutral-700 dark:text-neutral-300 space-y-2">
                        <div>✅ React e arquitetura baseada em componentes</div>
                        <div>✅ Next.js e renderização híbrida</div>
                        <div>✅ TailwindCSS e design responsivo</div>
                        <div>✅ Consumo avançado de APIs</div>
                        <div>✅ Boas práticas de UI/UX</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Image src="/skills/jsAndTs.png" alt="React" width={500} height={500}
                            className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />

                        <Image src="/skills/jsAndTs.png" alt="NextJS" width={500} height={500}
                            className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />

                        <Image src="/skills/jsAndTs.png" alt="Tailwind" width={500} height={500}
                            className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />

                        <Image src="/skills/jsAndTs.png" alt="UI" width={500} height={500}
                            className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />
                    </div>
                </div>
            ),
        },

        {
            title: "2025 — Evolução Full Stack",
            content: (
                <div key={4}>
                    <p className="mb-8 text-xs md:text-sm text-neutral-800 dark:text-neutral-200">
                        Em 2025 ampliei minhas habilidades para o desenvolvimento Full Stack,
                        criando APIs, estruturando rotas no Next.js e aplicando conceitos de
                        tipagem com TypeScript. Passei a desenvolver aplicações completas,
                        conectando interface, regras de negócio e persistência de dados.
                    </p>

                    <div className="mb-8 space-y-2 text-xs md:text-sm text-neutral-700 dark:text-neutral-300">
                        <div>✅ TypeScript aplicado em projetos reais</div>
                        <div>✅ APIs REST e CRUD completos</div>
                        <div>✅ Organização escalável de projetos</div>
                        <div>✅ Context API e gerenciamento de estado</div>
                        <div>✅ Integração Front + Backend</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Image src="/skills/jsAndTs.png" alt="TypeScript" width={500} height={500}
                            className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />

                        <Image src="/skills/jsAndTs.png" alt="API REST" width={500} height={500}
                            className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />

                        <Image src="/skills/jsAndTs.png" alt="Fullstack" width={500} height={500}
                            className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />

                        <Image src="/skills/jsAndTs.png" alt="Database" width={500} height={500}
                            className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />
                    </div>
                </div>
            ),
        },

        {
            title: "2026 — Consolidação profissional",
            content: (
                <div key={5}>
                    <p className="mb-8 text-xs md:text-sm text-neutral-800 dark:text-neutral-200">
                        Atualmente foco na construção de aplicações modernas com alto nível
                        de qualidade visual, performance e arquitetura limpa. Busco evolução
                        contínua desenvolvendo projetos próprios, portfólio profissional e
                        soluções reais voltadas para presença digital e sistemas web.
                    </p>

                    <div className="mb-8 space-y-2 text-xs md:text-sm text-neutral-700 dark:text-neutral-300">
                        <div>✅ Arquitetura escalável em Next.js</div>
                        <div>✅ Animações e experiências modernas</div>
                        <div>✅ Performance e otimização</div>
                        <div>✅ Desenvolvimento orientado a produto</div>
                        <div>✅ Construção de marca profissional como desenvolvedor</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Image src="/skills/jsAndTs.png" alt="Portfolio" width={500} height={500}
                            className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />

                        <Image src="/skills/jsAndTs.png" alt="Performance" width={500} height={500}
                            className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />

                        <Image src="/skills/jsAndTs.png" alt="Animation" width={500} height={500}
                            className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />

                        <Image src="/skills/jsAndTs.png" alt="Future" width={500} height={500}
                            className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />
                    </div>
                </div>
            ),
        },
    ];
    return (
        <div className="relative w-full overflow-clip">
            <Timeline data={data} />
        </div>
    );
}
