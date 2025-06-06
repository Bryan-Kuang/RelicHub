"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useNavigationLoading } from "./NavigationProvider";

export default function SearchBar() {
  const router = useRouter();
  const { startLoading } = useNavigationLoading();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      startLoading();
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索藏品..."
        className="flex-grow px-4 py-2 border border-r-0 border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
      />
      <button
        type="submit"
        className="bg-amber-700 text-white px-4 py-2 rounded-r-md hover:bg-amber-800 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </form>
  );
}
