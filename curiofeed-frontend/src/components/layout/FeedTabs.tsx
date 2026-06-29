"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const feedTabs = [
  {
    label: "My Feed",
    href: "/my-feed",
  },
  {
    label: "Explore",
    href: "/explore",
  },
  {
    label: "India",
    href: "/india",
  },
  {
    label: "Following",
    href: "/following",
  },
];

export default function FeedTabs() {
  const pathname = usePathname();

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl gap-8 px-6 justify-center">
        {feedTabs.map((tab) => {
          const active = pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`relative py-4 text-sm font-medium transition-colors duration-200
                ${
                  active
                    ? "text-black"
                    : "text-gray-500 hover:text-black"
                }`}
            >
              {tab.label}

              {active && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-black" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}