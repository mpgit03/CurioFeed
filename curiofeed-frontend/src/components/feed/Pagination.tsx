

interface PaginationProps {
    page: number;
    hasMore: boolean;
    onPrevious: () => void;
    onNext: () => void;
}

export default function Pagination({
    page,
    hasMore,
    onPrevious,
    onNext,
}: PaginationProps) {
    return (
        <div className="flex items-center justify-center gap-4 mt-10">
    <button
        onClick={onPrevious}
        disabled={page === 1}
        className="rounded-xl border border-gray-200 px-5 py-2.5
                   text-sm font-medium transition-all
                   hover:bg-gray-100
                   disabled:cursor-not-allowed
                   disabled:opacity-40"
    >
        ← Previous
    </button>

    <div className="rounded-xl border bg-white px-5 py-2.5 shadow-sm">
        <span className="text-sm font-semibold">
            Page {page}
        </span>
    </div>

    <button
        onClick={onNext}
        disabled={!hasMore}
        className="rounded-xl border border-gray-200 px-5 py-2.5
                   text-sm font-medium transition-all
                   hover:bg-gray-100
                   disabled:cursor-not-allowed
                   disabled:opacity-40"
    >
        Next →
    </button>
</div>
    );
}