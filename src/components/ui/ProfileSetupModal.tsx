"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { categories } from "~/lib/mockData";

interface ProfileSetupModalProps {
  onClose: () => void;
  onSave: (bio: string, selectedCategories: string[]) => void;
}

export function ProfileSetupModal({ onClose, onSave }: ProfileSetupModalProps) {
  const [userBio, setUserBio] = useState("");
  const [userCategories, setUserCategories] = useState<string[]>([]);

  const toggleCategory = (catId: string) => {
    setUserCategories(prev =>
      prev.includes(catId)
        ? prev.filter(c => c !== catId)
        : [...prev, catId]
    );
  };

  const handleSave = () => {
    if (userBio && userCategories.length > 0) {
      onSave(userBio, userCategories);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Complete Your Profile</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <label className="block text-sm text-zinc-400 mb-2">What do you post about?</label>
          <textarea
            value={userBio}
            onChange={(e) => setUserBio(e.target.value)}
            placeholder="I build mini apps on Base and talk about crypto..."
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 resize-none h-24"
          />
        </div>

        {/* Categories */}
        <div className="mb-6">
          <label className="block text-sm text-zinc-400 mb-2">Select your categories (pick 1-5)</label>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  userCategories.includes(cat.id)
                    ? 'bg-violet-600 text-white'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {cat.emoji} {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={!userBio || userCategories.length === 0}
          className="w-full bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}
