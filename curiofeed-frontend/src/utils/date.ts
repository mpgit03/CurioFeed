export function formatRelativeTime(
  publishedAt: string
): string {
  const now = new Date();
  const published = new Date(publishedAt);

  const diff =
    now.getTime() - published.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  if (hours < 24) {
    return `${hours}h ago`;
  }

  if (days === 1) {
    return "Yesterday";
  }

  if (days < 7) {
    return `${days}d ago`;
  }

  return published.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}