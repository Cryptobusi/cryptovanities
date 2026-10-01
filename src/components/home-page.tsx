import { useState } from "react";
import { MARKS } from "@/lib/site-data";
import { Opening, Hero, Thesis } from "@/components/home-front";
import { Provenance, Agents } from "@/components/home-mid";
import { Price } from "@/components/home-price";
import { BoardPreview, Invitation } from "@/components/home-end";

function openMark(href: string, onBack: () => void) {
  const child = window.open(href, "_blank");
  if (!child) {
    window.location.assign(href);
    return;
  }
  const watch = window.setInterval(() => {
    if (child.closed) {
      window.clearInterval(watch);
      onBack();
      window.focus();
    }
  }, 400);
}

function Marks() {
  const [live, setLive] = useState(false);

  function back() {
    setLive(true);
    window.focus();
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pt-6 sm:px-8">
      {live ? (
        <div className="flex items-center gap-2">
          {MARKS.map((mark) => (
            <button
              key={mark.src}
              type="button"
              onClick={() => openMark(mark.href, back)}
              className="w-0 min-w-0 flex-1"
            >
              <img src={mark.src} alt={mark.alt} className="sky-blend aspect-square h-auto w-full object-contain" />
            </button>
          ))}
        </div>
      ) : (
        <div className="relative mx-auto w-full max-w-3xl">
          <video
            src="/marks-slot.mp4"
            autoPlay
            muted
            playsInline
            onEnded={() => setLive(true)}
            className="w-full rounded-2xl"
          />
          <div className="absolute inset-x-[8%] top-[28%] bottom-[30%] grid grid-cols-4">
            {MARKS.map((mark) => (
              <button
                key={mark.src}
                type="button"
                aria-label={mark.alt}
                onClick={() => openMark(mark.href, back)}
                className="h-full"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function HomePage() {
  return (
    <>
      <Marks />
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
