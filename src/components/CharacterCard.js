export default function CharacterCard({ character }) {
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
        </div>
    );
}