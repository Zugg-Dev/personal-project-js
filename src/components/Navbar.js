"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import LogoutButton from "./LogoutButton";

export default function Navbar() {

    const [email, setEmail] = useState(null);

    useEffect(() => {
        const supabase = createClient();

        async function getUser() {
            const { data: { user } } = await supabase.auth.getUser();

            setEmail(user?.email || null);
        }

        getUser();

        const { data: { subscription } } =
            supabase.auth.onAuthStateChange((event, session) => {
                setEmail(session?.user?.email || null);
            });

        return () => subscription.unsubscribe();

    }, []);

    return (
        <nav className="bg-gray-950 border-b border-red-600/40">
            <div className="flex items-center justify-between p-4">
                <Link href="/" className="text-2xl font-black text-white">
                    COMIC<span className="text-red-600">VERSE</span>
                </Link>

                <div className="flex gap-6">
                    <Link 
                    className="text-gray-300 hover:text-red-500 transition"
                    href="/">Home</Link>
                    <Link href="/search">Search</Link>
                    <Link href="/favorites">Favorites</Link>

                    {email ? (
    <div className="relative group">
        <button className="text-gray-300 hover:text-red-500 transition">
            {email}
            </button>

            <div className="absolute right-0 top-full hidden group-hover:block pt-2 z-50">
                <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl p-2 min-w-32">
                    <LogoutButton />
                </div>
            </div>
        </div>
    ) : (
        <Link
            href="/login"
            className="text-gray-300 hover:text-red-500 transition"
        >
            Sign In
        </Link>
    )}
                </div>
            </div>
        </nav>
    );
}