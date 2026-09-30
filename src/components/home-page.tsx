import { useEffect, useState } from "react";
import {
  AGENT_DUTIES,
  CLUB_ACCOUNT,
  dmUrl,
  FLOORS,
  HANDLE,
  HOME_POSTS,
  LEDGER_KEY,
  MARKS,
  pickQuote,
  SEATS,
  STATS,
  SUPPLY,
  HOLDERS,
  TRAILS,
  TRUST_TOKEN,
  WORK,
  type Quote,
} from "@/lib/site-data";

type SavedNote = {
  email: string;
  message: string;
  role: string;
  at: string;
  quote: string;
  quoteUrl: string;
  dmUrl: string;
};

export function HomePage() {
  return (
    <>
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-5 pt-6 sm:px-8">
        {MARKS.map((mark) => {
          const external = mark.href.startsWith("http");
          return (
            <a
              key={mark.src}
              href={mark.href}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="w-0 min-w-0 flex-1"
            >
              <img src={mark.src} alt={mark.alt} className="sky-blend aspect-square h-auto w-full object-contain" />
            </a>
          );
        })}
      </div>
      <Opening />
      <Hero />
      <Thesis />
      <Provenance />
      <Agents />
      <Price />
      <BoardPreview />
      <Invitation />
    </>
  );
}
