"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { categories, mockUsers } from "~/lib/mockData";
import { UserCard } from "~/components/ui/UserCard";

export function DiscoverTab() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = mockUsers.filter(user => {
    const matchesCategory = !selectedCategory || user.categories.includes(selectedCategory);
    const matchesSearch = !searchQuery ||
      user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by username or bio..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500"
        />
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-sm text-zinc-400 mb-3 font-medium">Browse by category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-violet-600 text-white'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              {cat.emoji} {cat.name}
              <span className="ml-1 text-zinc-500 text-xs">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* User List */}
      <div>
        <h3 className="text-sm text-zinc-400 mb-3 font-medium">
          {selectedCategory
            ? `${categories.find(c => c.id === selectedCategory)?.name}s`
            : 'Featured users'}
        </h3>
        <div className="space-y-3">
          {filteredUsers.map(user => (
            <UserCard key={user.fid} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
