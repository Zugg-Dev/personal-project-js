"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function CharacterCard({ character }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const supabase = createClient();

    async function handleFavorite() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        alert("Please log in to favorite characters.");
        return;
    }

    if (isFavorite) {
        await supabase
            .from("favorites")
            .delete()
            .eq("user_id", user.id)
            .eq("character_id", character.id);

            setIsFavorite(false);
        } else {
            await supabase
                .from("favorites")
                .insert({
                    user_id: user.id,
                    character_id: character.id,
                    character_name: character.name,
                    character_image: character.image?.medium_url
                });

            setIsFavorite(true);
        }
    }
    return (
        <div className="rounded-xl bg-gray-900 p-4 text-white">
            <img
                src={character.image?.medium_url}
                alt={character.name}
                className="h-64 w-full rounded-lg object-cover"
            />

            <h2 className="font-heading text-2xl uppercase tracking-wide text-white">
                {character.name}
            </h2>

            <p className="text-sm leading-6 text-gray-400 ">{character.deck}</p>

            <p>Publisher: {character.publisher?.name}</p>

            <button
                onClick={handleFavorite}
                className="mt-3 rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700"
            >
                {isFavorite ? "Remove Favorite" : "Add to Favorites"}
            </button>
        </div>

        
    );
}