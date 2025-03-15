import ProjectCard from "@/components/project-card";
import SpotifyNowPlaying from "@/components/spotify-now-playing";
import TechStack from "@/components/tech-stack";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Github, Linkedin } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between p-10">
          <div className="flex items-center gap-6 md:gap-10">
            <a href="#" className="font-bold tracking-tight">
              Levente Istvan
            </a>
            <nav className="hidden md:flex gap-6">
              <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
                Home
              </a>
              <a href="#projects" className="text-sm font-medium transition-colors hover:text-primary">
                Projects
              </a>
              {/* <a href="#guestbook" className="text-sm font-medium transition-colors hover:text-primary">
                Guestbook
              </a> */}
              <a href="#tech" className="text-sm font-medium transition-colors hover:text-primary">
                Tech
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 hover:bg-muted transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 hover:bg-muted transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            {/* <ThemeToggle /> */}
          </div>
        </div>
      </header>

      <main className="p-10">
        {/* Hero Section */}
        <section className="space-y-6 pb-12 pt-6">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="relative size-32 md:size-40 overflow-hidden rounded-full border-4 border-primary/20 shadow-xl">
              <Image
                src="/gopher.png"
                alt="Levi's profile picture"
                width={160}
                height={160}
                className="object-cover"
                priority
              />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Software Developer
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Hi, I'm Levi <span className="animate-wave inline-block">👋</span>
              </h1>
              <p className="max-w-[42rem] text-muted-foreground text-lg md:text-xl">
                Software developer passionate about backend development and self-hosting.
              </p>
              <p className="max-w-[42rem] text-muted-foreground">
                Constantly experimenting, learning, and improving to build efficient solutions.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <Button>Contact Me</Button>
                <Button variant="outline">
                  Resume
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Spotify Now Playing */}
              <div className="mt-6">
                <SpotifyNowPlaying />
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="space-y-6 py-8">
          <div className="flex items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-bold tracking-tight">Things I've Built</h2>
              <p className="text-muted-foreground mt-2">A collection of projects I've worked on.</p>
            </div>
            <Button variant="outline" size="sm">
              View All
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <ProjectCard
              title="drive_clone"
              description="File hosting service made with Next.js"
              link="https://github.com"
              tags={["Next.js", "TypeScript", "TailwindCSS", "Postgres", "Drizzle", "Auth.js", "Codify"]}
            />

            <ProjectCard
              title="me_site"
              description="This is my portfolio site"
              link="https://github.com"
              tags={["Astro", "React", "Tailwind", "Docker"]}
            />
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="tech" className="space-y-6 py-8 md:py-12 border-t">
          <h2 className="text-3xl font-bold tracking-tight">Tech I Use</h2>

          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-3">
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>
            <TabsContent value="frontend" className="mt-6">
              <TechStack
                technologies={[
                  { name: "React", icon: "/react.svg" },
                  { name: "TypeScript", icon: "/typescript.svg" },
                  { name: "Tailwind CSS", icon: "/tailwind.svg" },
                  { name: "Next.js", icon: "/nextjs.svg" },
                  { name: "Astro", icon: "/astro.svg" },
                ]}
              />
            </TabsContent>
            <TabsContent value="backend" className="mt-6">
              <TechStack
                technologies={[
                  { name: "Golang", icon: "/go.svg" },
                  { name: "Python", icon: "/python.svg" },
                  { name: "PostgreSQL", icon: "/postgres.svg" },
                  { name: "Docker", icon: "/docker.svg" },
                  { name: "Drizzle", icon: "/drizzle.svg" },
                ]}
              />
            </TabsContent>
            <TabsContent value="tools" className="mt-6">
              <TechStack
                technologies={[
                  // { name: "VS Code", icon: "/vercel.svg" },
                  { name: "Git", icon: "/git.svg" },
                  { name: "GitHub", icon: "/github.svg" },

                ]}
              />
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>



  );
}
