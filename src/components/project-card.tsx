"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ProjectCardProps {
    title: string
    description: string
    githubLink: string
    projectLink: string
    tags: string[]
}

export default function ProjectCard({ title, description, githubLink, projectLink, tags }: ProjectCardProps) {

    return (
        <div

        >
            <Card className="overflow-hidden border-2 transition-all duration-300 hover:border-primary/50 h-full flex flex-col bg-background">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-bold">{title}</CardTitle>
                        <a
                            href={githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Github className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                        </a>
                    </div>
                    <CardDescription className="text-base">{description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="px-2 py-1 text-xs">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="pt-3 pb-4">
                    <Button asChild variant="outline" size="sm" className="w-full group">
                        <Link className="flex flex-row" href={projectLink}>View Project <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>

                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

