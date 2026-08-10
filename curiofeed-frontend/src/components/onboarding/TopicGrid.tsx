import { FeedTopic } from "@/types/feed";

import TopicCard from "@/components/onboarding/TopicCard";

interface TopicGridProps {
  topics: FeedTopic[];
  selectedTopicIds: string[];
  onToggle: (topicId: string) => void;
}

export default function TopicGrid({
  topics,
  selectedTopicIds,
  onToggle,
}: TopicGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {topics.map((topic) => (
        <TopicCard
          key={topic.id}
          topic={topic}
          selected={selectedTopicIds.includes(topic.id)}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
