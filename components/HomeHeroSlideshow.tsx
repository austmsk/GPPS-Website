'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

type Slide = { src: string; alt: string };

type Props = {
  images: Slide[];
  intervalMs?: number;   // time each slide is visible
  transitionMs?: number; // fade duration
  priorityFirst?: boolean;
  className?: string;
};

/**
 * HomeHeroSlideshow
 * - Smooth cross-fade between slides
 * - Pauses on hover
 * - Respects prefers-reduced-motion (disables auto-advance)
 * - Uses Next/Image for optimization and zero layout shift
 */
export default function HomeHeroSlideshow({
  images,
  intervalMs = 5000,
  transitionMs = 600,
  priorityFirst = true,
  className,
}: Props) {
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Init reduced motion (client only)
  useEffect(() => {
    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReduceMotion(mq.matches);
      const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
      mq.addEventListener?.('change', onChange);
      return () => mq.removeEventListener?.('change', onChange);
    }
  }, []);

  const start = () => {
    if (reduceMotion || timer.current || images.length <= 1) return;
    timer.current = setInterval(() => {
      setIdx((i) => (i + 1) % images.length);
    }, intervalMs);
  };

  const stop = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  useEffect(() => {
    start();
    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalMs, reduceMotion, images.length]);

  return (
    <section
      role="region"
      aria-label="Featured photos slideshow"
      className={`hero-slideshow ${className ?? ''}`}
      onMouseEnter={stop}
      onMouseLeave={start}
    >
      <div className="slides" aria-live="off">
        {images.map((img, i) => (
          <div
            key={img.src}
            className={`slide ${i === idx ? 'active' : ''}`}
            aria-hidden={i !== idx}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={priorityFirst && i === 0}
              sizes="(max-width: 1200px) 100vw, 1200px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div className="dots" role="tablist" aria-label="Slideshow controls">
          {images.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === idx}
              aria-current={i === idx ? 'true' : undefined}
              className={`dot ${i === idx ? 'active' : ''}`}
              onClick={() => setIdx(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        .hero-slideshow {
          position: relative;
          width: 100%;
          min-height: 52vh;
          border-radius: 8px;
          overflow: hidden;
          background: #000;
        }
        @media (max-width: 640px) {
          .hero-slideshow {
            min-height: 40vh;
          }
        }
        .slides {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: inherit;
        }
        .slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity ${transitionMs}ms ease-in-out;
          will-change: opacity;
        }
        .slide.active {
          opacity: 1;
        }
        .dots {
          position: absolute;
          left: 50%;
          bottom: 14px;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 2;
        }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,.9);
          background: rgba(255,255,255,.4);
          padding: 0;
          cursor: pointer;
        }
        .dot.active {
          background: #fff;
        }
      `}</style>
    </section>
  );
}
