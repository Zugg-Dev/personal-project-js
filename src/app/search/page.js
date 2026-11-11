
"use client";

import { useState } from "react";
import CharacterCard from "@/components/CharacterCard";

export default function SearchPage() {

    const [search, setSearch] = useState("");
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);

    async function handleSearch() {
        if (!search.trim()) return;

        setLoading(true);

        const response = await fetch(
            `/api/characters?search=${encodeURIComponent(search)}`
        );

        const data = await response.json();

        setCharacters(data);
        setLoading(false);
    }

    return (
        <main className="min-h-screen bg-gray-950 text-white p-8">

            <div className="max-w-6xl mx-auto">

                <h1 className="text-4xl font-bold mb-6">
                    Search Characters
                </h1>

                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Search for a character..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700"
                    />

                    <button
                        onClick={handleSearch}
                        className="bg-red-600 hover:bg-red-700 px-6 rounded-lg"
                    >
                        Search
                    </button>
                </div>

                {loading && (
                    <p className="mt-6 text-gray-400">
                        Searching characters...
                    </p>
                )}

                {!loading && characters.length === 0 && search && (
                    <p className="mt-6 text-gray-400">
                        No characters found.
                    </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

                    {characters.map((character) => (
                        <CharacterCard
                            key={character.id}
                            character={character}
                        />
                    ))}

                </div>

            </div>
        </main>
    );
}
