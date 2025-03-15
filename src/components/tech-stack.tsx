"use client"

import Image from "next/image"

interface Technology {
    name: string
    icon: string
}

interface TechStackProps {
    technologies: Technology[]
}

export default function TechStack({ technologies }: TechStackProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {technologies.map((tech, index) => (
                <div
                    key={index}
                >
                    <div className="relative size-12 overflow-hidden">
                        <Image
                            src={tech.icon || "/vercel.svg"}
                            alt={tech.name}
                            width={48}
                            height={48}
                            className="object-contain"
                        />
                    </div>
                    <span className="text-sm font-medium">{tech.name}</span>
                </div>
            ))}
        </div>
    )
}

