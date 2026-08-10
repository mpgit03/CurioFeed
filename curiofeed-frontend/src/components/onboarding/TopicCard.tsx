import { Check, Sparkles } from "lucide-react";
import clsx from "clsx";

import { FeedTopic } from "@/types/feed";

interface TopicCardProps {
  topic: FeedTopic;
  selected: boolean;
  onToggle: (topicId: string) => void;
}

export default function TopicCard({
  topic,
  selected,
  onToggle,
}: TopicCardProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(topic.id)}
      aria-pressed={selected}
      className={clsx(
        "group w-full rounded-[24px] border p-5 text-left transition-all duration-200",
        selected
          ? "border-violet-500 bg-violet-50 shadow-[0_12px_40px_-24px_rgba(124,58,237,0.75)]"
          : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="rounded-2xl bg-slate-950 p-2.5 text-white">
          <Sparkles className="h-4 w-4" />
        </div>

        <div
          className={clsx(
            "flex h-7 w-7 items-center justify-center rounded-full border",
            selected
              ? "border-violet-500 bg-violet-500 text-white"
              : "border-slate-300 bg-white text-slate-400"
          )}
        >
          <Check className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <h3 className="text-base font-semibold text-slate-950">
          {topic.name}
        </h3>
        <p className="text-sm text-slate-600">
          {selected
            ? "Topic selected"
            : "Tap to add this topic to your feed"}
        </p>
      </div>
    </button>
  );
}
