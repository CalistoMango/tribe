"use client";

import { Users } from "lucide-react";
import { useMiniApp } from "@neynar/react";

export function Header() {
  const { context } = useMiniApp();

  return (
    <header className="border-b border-zinc-800 p-4">
      <div className="max-w-lg mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl">Tribe</span>
        </div>
        {context?.user && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-zinc-700 overflow-hidden">
              {context.user.pfpUrl ? (
                <img src={context.user.pfpUrl} alt="You" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-zinc-400">
                  {context.user.username?.[0]?.toUpperCase()}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
