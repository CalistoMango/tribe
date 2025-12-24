"use client";

import { Users } from "lucide-react";

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-zinc-800 p-4">
        <div className="max-w-lg mx-auto flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl">Tribe</span>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mb-6">
          <Users className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Find Your Tribe</h1>
        <p className="text-zinc-400 mb-8 max-w-sm">
          Discover your Farcaster community + earn USDC for quality replies. LLM-gated, no bots.
        </p>

        <button
          onClick={onLogin}
          className="bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 px-8 rounded-xl transition-colors flex items-center gap-2"
        >
          <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center text-xs">f</div>
          Sign in with Farcaster
        </button>

        <div className="mt-12 grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-violet-400">2.4K</div>
            <div className="text-zinc-500 text-sm">Users</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">$12.5K</div>
            <div className="text-zinc-500 text-sm">Paid Out</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-fuchsia-400">48K</div>
            <div className="text-zinc-500 text-sm">Replies</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 p-4 text-center text-zinc-500 text-sm">
        Built on Base - Powered by Farcaster
      </footer>
    </div>
  );
}
