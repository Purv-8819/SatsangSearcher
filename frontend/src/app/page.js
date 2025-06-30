"use client";

import Image from "next/image";
import { useState } from "react";
import DropZone from "./components/dropzone";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <input
          value={searchTerm}
          type="text"
          placeholder="Placeholder"
          onChange={(e)=>setSearchTerm(e.target.value)}
           className="bg-amber-50 text-black" />

           <DropZone text="Upload Files Here"></DropZone>

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.baps.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/footer.png"
            alt="Home icon"
            width={200}
            height={200}
          />
        </a>
      </footer>
    </div>
  );
}
