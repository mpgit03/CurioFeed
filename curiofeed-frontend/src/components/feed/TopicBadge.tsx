interface TopicBadgeProps {
  topic: string;
}

export default function TopicBadge({
  topic,
}: TopicBadgeProps) {
  return (
    <span
      className="
        rounded-full
        border
        border-gray-200
        px-3
        py-1
        text-xs
        font-medium
        text-gray-600
      "
    >
      {topic}
    </span>
  );
}