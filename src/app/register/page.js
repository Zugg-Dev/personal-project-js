"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const supabase = createClient();

    async function handleRegistry(event){
        event.preventDefault();

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            console.log(error.message);
            return
        }

        console.log("User registered successfully:", data);
    }

return (
    <main className="h-screen bg-gray-950 text-white flex flex-col items-center justify-center">
            <div className="w-full max-w-md">

                <div className="text-center mb-8">
                    <h1 className="font-heading text-5xl tracking-wide">
                        Create Your Account
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Join ComicVerse!
                    </p>
                </div>

                <form 
                onSubmit={handleRegistry}
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
                            onChange={(e) => setEmail(e.target.value)}                    />
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
                        Create Account
                    </button>

                    <p className="text-center text-sm text-gray-400 mt-6">
                        Already have an account?{" "}
                        <a href="/login" className="text-red-500 hover:text-red-400">
                            Sign in
                        </a>
                    </p>

                </form>
            </div>
        </main>
    );

}