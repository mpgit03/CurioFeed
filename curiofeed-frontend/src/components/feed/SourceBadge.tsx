interface SourceBadgeProps {
  source: string;
}

export default function SourceBadge({
  source,
}: SourceBadgeProps) {
  return (
    <span
      className="
        rounded-full
        bg-gray-100
        px-3
        py-1
        text-sm
        font-medium
        text-gray-600
      "
    >
      {source}
    </span>
  );
}