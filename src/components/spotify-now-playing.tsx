"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import { Progress } from "./ui/progress"
import useSWR from 'swr'


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

    // Simulate progress bar movement
    useEffect(() => {
        async function fetchSong() {
            const response = await fetch("/api/spotify");
            const data = await response.json();
            if (!data.error) {
                setSong(data)
                setIsPlaying(data.is_playing)
            }
        }
        const interval = setInterval(fetchSong, 1000); // Refresh every 30s
        setProgressBar((song?.progress! / song?.length_ms!) * 100)
        setMax(formatTime(song?.length_ms!))
        setProgress(formatTime(song?.progress!))
        return () => clearInterval(interval);
    }, [song]);

    if (!isPlaying) {
        return (
            <Card className="overflow-hidden border-2 hover:border-green-500/50 transition-all duration-300 bg-background">
                <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-shrink-0">
                            <div className="relative size-16 rounded-md overflow-hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17.9 10.9C14.7 9 9.35 8.8 6.3 9.75c-.5.15-1-.15-1.15-.6c-.15-.5.15-1 .6-1.15c3.55-1.05 9.4-.85 13.1 1.35c.45.25.6.85.35 1.3c-.25.35-.85.5-1.3.25m-.1 2.8c-.25.35-.7.5-1.05.25c-2.7-1.65-6.8-2.15-9.95-1.15c-.4.1-.85-.1-.95-.5s.1-.85.5-.95c3.65-1.1 8.15-.55 11.25 1.35c.3.15.45.65.2 1m-1.2 2.75c-.2.3-.55.4-.85.2c-2.35-1.45-5.3-1.75-8.8-.95c-.35.1-.65-.15-.75-.45c-.1-.35.15-.65.45-.75c3.8-.85 7.1-.5 9.7 1.1c.35.15.4.55.25.85M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"></path></svg>
                            </div>

                        </div>

                        <div className="flex-grow min-w-0">
                            <div className="flex items-center justify-between">
                            </div>
                            <h3 className="font-medium truncate mt-1">No Song Playing</h3>
                            <div className="mt-2 space-y-1">
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (song) return (
        <Card className="overflow-hidden border-2 hover:border-green-500/50 transition-all duration-300 bg-background">
            <CardContent className="p-4">
                <div className="flex items-center gap-4">
                    <div className="relative flex-shrink-0">

                        <div className="size-16 rounded-md overflow-hidden justify-center border-2">

                            <Image
                                src={song.albumArt}
                                alt={`${song.album} album cover`}
                                width={64}
                                height={64}
                                className="object-cover"
                            />
                        </div>

                    </div>

                    <div className="flex-grow min-w-0">
                        <div className="flex items-center justify-between">

                            <div className="flex items-center gap-2">
                                <svg viewBox="0 0 24 24" width="16" height="16" className="text-green-500 fill-current">
                                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                                </svg>
                                <span className="text-xs text-muted-foreground">Now playing</span>
                            </div>
                            <a
                                href={song.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-green-500 transition-colors"
                            >
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">Open in Spotify</span>
                            </a>


                        </div>

                        <h3 className="font-medium truncate mt-1">{song.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">{song.artists}</p>

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
        </Card >
    )
}

