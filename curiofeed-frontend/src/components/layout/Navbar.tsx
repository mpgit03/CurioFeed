'use client'

import Link from "next/link";
import { Search } from "lucide-react";

import {
  UserButton,
  useUser,
} from "@clerk/nextjs";





export default function Navbar() {

  const { isSignedIn } = useUser();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-20 max-w-6xl items-center gap-8 px-6">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight"
        >
          CurioFeed
        </Link>

        {/* Search */}
        <div className="relative flex-1">

          <Search
            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search articles, topics or sources..."
            className="
              w-full
              rounded-full
              border
              border-gray-200
              bg-gray-50
              py-2.5
              pl-11
              pr-4
              text-sm
              outline-none
              transition-all
              focus:border-black
              focus:bg-white
            "
          />

        </div>

        {/* User */}

        {isSignedIn ? (

          <UserButton />

        ) : (

          <div className="flex items-center gap-3">

            <Link
              href="/sign-in"
              className="
                rounded-full
                px-4
                py-2
                text-sm
                font-medium
                text-gray-700
                hover:bg-gray-100
              "
            >
              Sign In
            </Link>

            <Link
              href="/sign-up"
              className="
                rounded-full
                bg-black
                px-5
                py-2
                text-sm
                font-medium
                text-white
                hover:bg-gray-800
              "
            >
              Get Started
            </Link>

          </div>

        )}

      </div>
    </header>
  );
}