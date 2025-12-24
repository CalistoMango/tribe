"use client";

import { Users, MessageSquare, DollarSign, Gift } from "lucide-react";
import { Tab } from "~/lib/types";

interface FooterProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const tabs = [
  { id: Tab.Discover, label: 'Discover', icon: Users },
  { id: Tab.Bounties, label: 'Bounties', icon: MessageSquare },
  { id: Tab.Earnings, label: 'Earnings', icon: DollarSign },
  { id: Tab.Referral, label: 'Referral', icon: Gift },
];

export const Footer: React.FC<FooterProps> = ({ activeTab, setActiveTab }) => (
  <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800">
    <div className="max-w-lg mx-auto flex">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center py-3 transition-colors ${
              isActive ? 'text-violet-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Icon className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  </nav>
);
