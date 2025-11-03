"use client";

import Link from "next/link";

export default function BackButton() {
  return (
    <Link
      href="/"
      aria-label="Back to main page"
      className="absolute left-4 top-4 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-card/80 hover:bg-card"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="w-4 h-4"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span className="text-sm">Back</span>
    </Link>
  );
}
