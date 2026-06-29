import Link from "next/link";

export default function EmptyFeed() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
      <h2 className="text-2xl font-semibold text-gray-900">
        Your feed is empty
      </h2>

      <p className="mt-3 max-w-md text-gray-500">
        We couldn't find any articles matching your interests yet.
        Try updating your preferences or explore new topics.
      </p>

      <div className="mt-8 flex gap-4">
        <Link
          href="/explore"
          className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Explore Articles
        </Link>

        <Link
          href="/preferences"
          className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium transition hover:bg-gray-50"
        >
          Update Interests
        </Link>
      </div>
    </div>
  );
}