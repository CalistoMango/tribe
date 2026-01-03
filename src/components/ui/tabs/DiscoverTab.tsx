"use client";

import { useState, useMemo } from "react";
import { UserCard } from "~/components/ui/UserCard";
import { ProfileSetupModal } from "~/components/ui/ProfileSetupModal";
import { useCategories } from "~/hooks/useCategories";
import { useDiscoverUsers, useCategoryCounts } from "~/hooks/useDiscoverUsers";

interface DiscoverTabProps {
  userFid: number | null;
}

export function DiscoverTab({ userFid }: DiscoverTabProps) {
  const { categories, isLoading: categoriesLoading } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Memoize category IDs to prevent unnecessary refetches
  const categoryIds = useMemo(() => categories.map(c => c.id), [categories]);

  const { users, isLoading: usersLoading, refetch: refetchUsers } = useDiscoverUsers(selectedCategory, searchQuery);
  const { counts, refetch: refetchCounts } = useCategoryCounts(categoryIds);

  // Check if current user is already discoverable (from existing users list, no extra API call)
  const isUserDiscoverable = userFid ? users.some(u => u.fid === userFid) : false;

  return (
    <div>
      {/* Intro Card */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 mb-4">
        <p className="text-zinc-300 text-sm">
          Discover interesting people to follow and engage with. Browse by category to find creators, builders, and experts in topics you care about.
        </p>
        {userFid && !isUserDiscoverable && (
          <button
            onClick={() => setShowProfileModal(true)}
            className="text-violet-400 hover:text-violet-300 text-sm mt-2 font-medium"
          >
            Want to be featured here? Set up your profile →
          </button>
        )}
      </div>

      {/* Search - temporarily hidden
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
      */}

      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-sm text-zinc-400 mb-3 font-medium">Browse by category</h3>
        {categoriesLoading ? (
          <div className="flex flex-wrap gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 w-24 bg-zinc-800 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-violet-600 text-white'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {cat.emoji} {cat.display_name}
                <span className="ml-1 text-zinc-500 text-[10px]">{counts[cat.id] ?? 0}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* User List */}
      <div>
        <h3 className="text-sm text-zinc-400 mb-3 font-medium">
          {selectedCategory
            ? `${categories.find(c => c.id === selectedCategory)?.display_name}s`
            : 'Featured users'}
        </h3>
        <div className="space-y-3">
          {usersLoading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="bg-zinc-900 rounded-xl p-4 flex gap-3">
                <div className="w-12 h-12 rounded-full bg-zinc-800 animate-pulse flex-shrink-0" />
                <div className="flex-1">
                  <div className="h-4 w-32 bg-zinc-800 rounded animate-pulse mb-2" />
                  <div className="h-3 w-24 bg-zinc-800 rounded animate-pulse mb-2" />
                  <div className="h-3 w-full bg-zinc-800 rounded animate-pulse" />
                </div>
              </div>
            ))
          ) : users.length === 0 ? (
            <div className="bg-zinc-900 rounded-xl p-8 text-center text-zinc-500">
              {searchQuery
                ? 'No users found matching your search'
                : selectedCategory
                  ? 'No users in this category yet'
                  : 'No discoverable users yet'}
            </div>
          ) : (
            users.map(user => (
              <UserCard key={user.fid} user={user} />
            ))
          )}
        </div>
      </div>

      {/* Profile Setup Modal */}
      {showProfileModal && userFid && (
        <div className="fixed inset-0 z-50 bg-zinc-950">
          <ProfileSetupModal
            fid={userFid}
            onClose={() => setShowProfileModal(false)}
            onSave={() => {
              setShowProfileModal(false);
              refetchUsers();
              refetchCounts();
            }}
          />
        </div>
      )}
    </div>
  );
}
