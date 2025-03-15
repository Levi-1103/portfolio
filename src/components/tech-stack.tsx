"use client"

import Image from "next/image"
import { Card } from "./ui/card"

interface Technology {
    name: string
    icon: string
}

interface TechStackProps {
    technologies: Technology[]
}

export default function TechStack({ technologies }: TechStackProps) {
    return (
        <div className="flex flex-row justify-center gap-5">

            {technologies.map((tech, index) => (
                <Card className="items-center grow bg-background gap-2 aspect-square size-32"
                    key={index}
                >
                    <div className="overflow-hidden">
                        <Image
                            src={tech.icon}
                            alt={tech.name}
                            width={48}
                            height={48}
                            className="object-contain invert"
                        />
                    </div>
                    <span className="text-sm font-medium">{tech.name}</span>
                </Card>
            ))}
        </div>
    )
}

