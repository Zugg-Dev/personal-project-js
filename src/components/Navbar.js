"use client";

import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {

    const [email, setEmail] = useState(null);

    useEffect(() => {
        const supabase = createClient();

        async function getUser() {
        const { data: { user } } = await supabase.auth.getUser();

        setEmail(user?.email || null);
    }
        getUser();
        const [data, {subscription} } =
            supabase.auth.onAuthStateChange((event, session) => {
                setEmail(session?.user?.email || null);
            });

        return () => subscription.unsubscribe();
    }, []);

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

                    {user ? (
                    <span className="text-gray-300">
                        {user.email}
                    </span>
                ) : (
                    <Link href="/login">
                        Sign In
                    </Link>
                )}

                </div>
            </div>
        </nav>
    );
}