
export async function GET(request) {
    const apiKey = process.env.COMIC_VINE_KEY;

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");

    let url = `https://comicvine.gamespot.com/api/characters/?api_key=${apiKey}&format=json&limit=10`;

    if (search) {
        url += `&filter=name:${encodeURIComponent(search)}`;
    }

    const response = await fetch(url, {
        headers: {
            "User-Agent": "ComicVerse"
        },
        cache: "no-store"
    });

    if (!response.ok) {
        return Response.json(
            { error: "Failed to fetch characters" },
            { status: 502 }
        );
    }

    const data = await response.json();

    return Response.json(data.results);
}
