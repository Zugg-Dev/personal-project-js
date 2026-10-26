import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-gray-950 border-b border-red-600/30">
            <div className="flex items-center justify-between p-4">
                <Link href="/" className="text-2xl font-black text-white">
                    COMIC<span className="text-red-600">VERSE</span>
                </Link>

                <div className="flex gap-6">
                    <Link href="/">Home</Link>
                    <Link href="/search">Search</Link>
                    <Link href="/login">Login</Link>
                    <Link href="/favorites">Favorites</Link>

                </div>
            </div>
        </nav>
    );
}