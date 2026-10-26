export async function GET() {
    const apiKey = process.env.COMIC_VINE_KEY

    const response = await fetch(
        `https://comicvine.gamespot.com/api/characters/?api_key=${apiKey}&format=json&limit=10`,
        {
            headers: {
                "User-Agent": "ComicVerse"
            },
            cache: "no-store"
        }
    );

    if (!response.ok) {
        return Response.json(
            { error: "Failed to fetch characters" },
            { status: 502 }
        );
    }

    const data = await response.json();

    return Response.json(data.results);
}