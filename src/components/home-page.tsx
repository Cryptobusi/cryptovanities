import { useState } from "react";
import { MARKS } from "@/lib/site-data";
import { Opening, Hero, Thesis } from "@/components/home-front";
import { Provenance, Agents } from "@/components/home-mid";
import { Price } from "@/components/home-price";
import { BoardPreview, Invitation } from "@/components/home-end";

function Marks() {
  const [live, setLive] = useState(false);
  return (
    <div className="mx-auto max-w-6xl px-5 pt-6 sm:px-8">
      {live ? (
        <div className="flex items-center gap-2">
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
      ) : (
        <video
          src="/marks-slot.mp4"
          autoPlay
          muted
          playsInline
          onEnded={() => setLive(true)}
          className="mx-auto w-full max-w-3xl rounded-2xl"
        />
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
