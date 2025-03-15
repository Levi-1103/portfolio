const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;


const basic = Buffer.from(
    `${client_id}:${client_secret}`
).toString('base64');

export const getAccessToken = async () => {
    try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: 'POST',
            headers: {
                Authorization: `Basic ${basic}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refresh_token!,
            }),
        });
        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.log(error)
    }

};


async function getCurrentlyPlaying(accessToken: string) {
    const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (response.status === 204) return null; // No song playing
    return response.json();
}

export async function GET(request: Request) {

    try {
        const accessToken = await getAccessToken();
        const song = await getCurrentlyPlaying(accessToken);
        if (!song) return Response.json({ error: "No song playing" }, { status: 200 });



        return Response.json({
            name: song.item.name,
            artists: song.item.artists.map((artist: any) => artist.name).join(", "),
            album: song.item.album.name,
            albumArt: song.item.album.images[0]?.url,
            url: song.item.external_urls.spotify,
            progress: song.progress_ms,
            length_ms: song.item.duration_ms,
            is_playing: song.is_playing,

        });

    } catch (error) {
        return Response.json({ error: "Failed to fetch song" }, { status: 500 });
    };
}