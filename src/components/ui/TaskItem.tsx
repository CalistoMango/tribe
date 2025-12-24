"use client";

import { Check } from "lucide-react";

interface TaskItemProps {
  done: boolean;
  label: string;
  onClick?: () => void;
  actionLabel?: string;
}

export function TaskItem({ done, label, onClick, actionLabel }: TaskItemProps) {
  return (
    <div className="flex items-center gap-3 bg-zinc-900/50 rounded-lg p-3">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${done ? 'bg-green-500' : 'bg-zinc-700'}`}>
        {done && <Check className="w-3 h-3 text-white" />}
      </div>
      <span className={`flex-1 text-sm ${done ? 'text-zinc-400 line-through' : 'text-white'}`}>{label}</span>
      {!done && actionLabel && (
        <button onClick={onClick} className="text-violet-400 text-sm font-medium hover:text-violet-300">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
