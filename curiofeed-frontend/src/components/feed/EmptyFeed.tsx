import Link from "next/link";

type EmptyFeedProps = {
  title: string;
  description: string;
  primaryAction: {
    href: string;
    label: string;
  };
  secondaryAction?: {
    href: string;
    label: string;
  };
};

export default function EmptyFeed({
  title,
  description,
  primaryAction,
  secondaryAction,
}: EmptyFeedProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
      <h2 className="text-2xl font-semibold text-gray-900">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-gray-500">
        {description}
      </p>

      <div className="mt-8 flex gap-4">
        <Link
          href={primaryAction.href}
          className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          {primaryAction.label}
        </Link>

        {secondaryAction && (
          <Link
            href={secondaryAction.href}
            className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium transition hover:bg-gray-50"
          >
            {secondaryAction.label}
          </Link>
        )}
      </div>
    </div>
  );
}