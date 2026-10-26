"use client";

import CharacterCard from "../components/CharacterCard";
import Navbar from "../components/Navbar"

import { useEffect, useState } from "react";

export default function Home() {

  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function getCharacters() {
      const response = await fetch("/api/characters");
      const data = await response.json();

      setCharacters(data);
    }

    getCharacters();
  }, []);

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="font-heading text-4xl mb-8">
        Welcome To COMIC<span className="text-red-600">VERSE</span>
      </h1>

      <p className="text-2xl font-">
        Step into the world of comics! Discover iconic heroes,
        explore legendary characters, and find your favorites from across the comic universe.
        Whether you're a longtime fan or just getting started,
        there's always something new to discover.
      </p>

      <p className="mt-5 mb-2">
        Your next favorite character awaits.
      </p>

      <h1 className="font-heading text-5xl uppercase tracking-wide mb-8">
        Featured Characters
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
          />
        ))}
      </div>
    </main>
  );
}
