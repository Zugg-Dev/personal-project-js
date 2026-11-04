"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const supabase = createClient();
    const router = useRouter();

    async function handleLogin(event){
        event.preventDefault();

        const {data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            console.error(error.message);
            return;
        }

        router.push("/");    
    }

    return (
            <main className="h-screen bg-gray-950 text-white flex flex-col items-center justify-center">
            <div className="w-full max-w-md">

                <div className="text-center mb-8">
                    <h1 className="font-heading text-5xl tracking-wide">
                        Sign In To Your Account
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Reconnect to your account.
                    </p>
                </div>

                <form 
                onSubmit={handleLogin}
                className="bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-xl">

                    <label className="block mb-6 text-sm font-semibold text-gray-300">
                        Email Address
                        <input
                            className="w-full mt-2 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                 />
                    </label>

                    <label className="block mb-6 text-sm font-semibold text-gray-300">
                        Password
                        <input
                            className="w-full mt-2 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition"
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    <button
                        type="submit"
                        className="w-full mt-2 py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg font-semibold transition"
                    >
                        Sign In
                    </button>

                    <p className="text-center text-sm text-gray-400 mt-6">
                        New to ComicVerse?{" "}
                        <a href="/register" className="text-red-500 hover:text-red-400">
                            Create an account here
                        </a>
                    </p>
                </form>
            </div>
        </main>
    );
}