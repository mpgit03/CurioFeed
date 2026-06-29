export default function LoadingFeed() {
  return (
    <div className="space-y-5">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-gray-200 p-6"
        >
          <div className="mb-4 h-4 w-24 rounded bg-gray-200"></div>

          <div className="mb-3 h-8 w-3/4 rounded bg-gray-200"></div>

          <div className="mb-2 h-4 w-full rounded bg-gray-200"></div>

          <div className="mb-2 h-4 w-5/6 rounded bg-gray-200"></div>

          <div className="mt-6 flex gap-2">
            <div className="h-7 w-24 rounded-full bg-gray-200"></div>
            <div className="h-7 w-20 rounded-full bg-gray-200"></div>
            <div className="h-7 w-28 rounded-full bg-gray-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
}