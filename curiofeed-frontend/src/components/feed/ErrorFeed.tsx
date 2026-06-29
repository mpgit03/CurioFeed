interface ErrorFeedProps {
  message?: string;
  onRetry:()=>void;
}

export default function ErrorFeed({
  message = "Something went wrong while loading your feed.",
  onRetry
}: ErrorFeedProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
      <h2 className="text-2xl font-semibold text-gray-900">
        Couldn't load your feed
      </h2>

      <p className="mt-3 max-w-md text-gray-500">
        {message}
      </p>

      <button
        onClick={onRetry}
        className="mt-8 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Try Again
      </button>
    </div>
  );
}