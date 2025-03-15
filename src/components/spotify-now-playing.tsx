"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Pause, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import { Progress } from "./ui/progress"

// This would normally come from an API call to Spotify


export interface Track {
    name: string
    artists: string
    album: string
    albumArt: string
    url: string
    progress: number
    length_ms: number
    is_playing: boolean
}

const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};



export default function SpotifyNowPlaying() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [progressBar, setProgressBar] = useState(0)
    const [progress, setProgress] = useState("0:00")
    const [max, setMax] = useState("0:00")

    const [song, setSong] = useState<Track | null>(null);
    const [isLoading, setLoading] = useState(true)


    // Simulate progress bar movement
    useEffect(() => {
        // if (!isPlaying) return

        async function fetchSong() {
            const response = await fetch("/api/spotify");
            const data = await response.json();
            if (!data.error) {
                setSong(data)
                // setProgress(100)
            }
        }

        fetchSong()
        const interval = setInterval(fetchSong, 1000); // Refresh every 30s
        setProgressBar((song?.progress! / song?.length_ms!) * 100)

        setMax(formatTime(song?.length_ms!))
        setProgress(formatTime(song?.progress!))
        return () => clearInterval(interval);
    }, [song]);

    return (
        <Card className="overflow-hidden border-2 hover:border-green-500/50 transition-all duration-300 bg-background">
            <CardContent className="p-4">
                <div className="flex items-center gap-4">
                    <div className="relative flex-shrink-0">

                        <div className="relative size-16 rounded-md overflow-hidden">

                            <Image
                                src={song?.albumArt ?? "/vercel.svg"}
                                alt={`${song?.album} album cover`}
                                width={64}
                                height={64}
                                className="object-cover"
                            />
                        </div>

                    </div>

                    <div className="flex-grow min-w-0">
                        <div className="flex items-center justify-between">

                            <a
                                href={song?.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-green-500 transition-colors"
                            >
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">Open in Spotify</span>
                            </a>
                        </div>

                        <h3 className="font-medium truncate mt-1">{song?.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">{song?.artists}</p>

                        <div className="mt-2 space-y-1">

                            <Progress value={progressBar} className="w-full" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>{progress}</span>
                                <span>{max}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

