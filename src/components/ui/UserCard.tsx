"use client";

import { Sparkles, User } from "lucide-react";
import { type MockUser, getCategoryById } from "~/lib/mockData";

interface UserCardProps {
  user: MockUser;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-zinc-900 rounded-xl p-4 flex gap-3">
      <img src={user.pfp} alt="" className="w-12 h-12 rounded-full flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold truncate">{user.displayName}</span>
          {user.quotient >= 0.9 && <Sparkles className="w-4 h-4 text-yellow-400 flex-shrink-0" />}
        </div>
        <div className="text-sm text-zinc-400 truncate">@{user.username}</div>
        <div className="text-sm text-zinc-300 mt-1 line-clamp-2">{user.bio}</div>
        <div className="flex items-center gap-2 mt-2">
          {user.categories.map(catId => {
            const cat = getCategoryById(catId);
            return cat ? (
              <span key={catId} className="text-xs bg-zinc-800 px-2 py-1 rounded">
                {cat.emoji} {cat.name}
              </span>
            ) : null;
          })}
        </div>
      </div>
      <button className="text-violet-400 hover:text-violet-300 flex-shrink-0">
        <User className="w-5 h-5" />
      </button>
    </div>
  );
}
