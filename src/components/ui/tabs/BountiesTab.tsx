"use client";

import { useState } from "react";
import { Plus, Lock } from "lucide-react";
import { mockBounties } from "~/lib/mockData";
import { BountyCard } from "~/components/ui/BountyCard";
import { CreateBountyModal } from "~/components/ui/CreateBountyModal";

interface BountiesTabProps {
  allTasksDone: boolean;
}

export function BountiesTab({ allTasksDone }: BountiesTabProps) {
  const [showCreateBounty, setShowCreateBounty] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'browse' | 'my'>('browse');

  if (showCreateBounty) {
    return (
      <CreateBountyModal
        onClose={() => setShowCreateBounty(false)}
        onCreate={() => setShowCreateBounty(false)}
      />
    );
  }

  return (
    <div>
      {/* Create Bounty Button */}
      <button
        onClick={() => setShowCreateBounty(true)}
        className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mb-6"
      >
        <Plus className="w-5 h-5" />
        Create Bounty
      </button>

      {/* Sub-tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveSubTab('browse')}
          className={`flex-1 font-medium py-2 rounded-lg ${
            activeSubTab === 'browse'
              ? 'bg-violet-600 text-white'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
          }`}
        >
          Browse ({mockBounties.length})
        </button>
        <button
          onClick={() => setActiveSubTab('my')}
          className={`flex-1 font-medium py-2 rounded-lg ${
            activeSubTab === 'my'
              ? 'bg-violet-600 text-white'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
          }`}
        >
          My Bounties (2)
        </button>
      </div>

      {/* Bounty List */}
      {!allTasksDone ? (
        <div className="bg-zinc-900 rounded-xl p-6 text-center">
          <Lock className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <h3 className="font-semibold mb-1">Earning Locked</h3>
          <p className="text-zinc-400 text-sm mb-4">Complete all tasks above to browse and reply to bounties</p>
        </div>
      ) : (
        <div className="space-y-4">
          {mockBounties.map(bounty => (
            <BountyCard key={bounty.id} bounty={bounty} />
          ))}
        </div>
      )}
    </div>
  );
}
