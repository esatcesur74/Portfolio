"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import styles from "./Gallery3D.module.css";

const IMAGES = [
  { src: "/images/whoami.jpeg", alt: "Who am I" },
  { src: "/images/graduation.jpeg", alt: "Graduation" },
  { src: "/images/ekip.jpeg", alt: "Ekip" },
];

export interface Gallery3DHandle {
  goTo: (idx: number) => void;
}

const Gallery3D = forwardRef<Gallery3DHandle, { onSlideChange?: (index: number) => void }>(
  function Gallery3D({ onSlideChange }, ref) {
    const [current, setCurrent] = useState(0);

    useImperativeHandle(ref, () => ({
      goTo: (idx: number) => {
        setCurrent(idx);
      },
    }));

    useEffect(() => {
      onSlideChange?.(current);
    }, [current, onSlideChange]);

    const stageRef = useRef<HTMLDivElement>(null);
    const dragStart = useRef<number | null>(null);
    const wheelAccum = useRef(0);
    const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isAnimating = useRef(false);
    const currentRef = useRef(current);
    currentRef.current = current;

    const prev = () => setCurrent((c) => (c - 1 + IMAGES.length) % IMAGES.length);
    const next = () => setCurrent((c) => (c + 1) % IMAGES.length);

    useEffect(() => {
      const el = stageRef.current;
      if (!el) return;

      const handleWheel = (e: WheelEvent) => {
        const goingDown = e.deltaY > 0;
        const atEnd = currentRef.current === IMAGES.length - 1 && goingDown;
        const atStart = currentRef.current === 0 && !goingDown;

        // At boundary — let the event propagate so page snap can fire
        if (atEnd || atStart) {
          wheelAccum.current = 0;
          return;
        }

        e.preventDefault();
        e.stopPropagation();

        if (isAnimating.current) return;

        wheelAccum.current += e.deltaY;

        if (wheelTimer.current) clearTimeout(wheelTimer.current);
        wheelTimer.current = setTimeout(() => {
          wheelAccum.current = 0;
        }, 300);

        if (wheelAccum.current > 60) {
          wheelAccum.current = 0;
          isAnimating.current = true;
          setCurrent((c) => (c + 1) % IMAGES.length);
          setTimeout(() => { isAnimating.current = false; }, 1100);
        } else if (wheelAccum.current < -60) {
          wheelAccum.current = 0;
          isAnimating.current = true;
          setCurrent((c) => (c - 1 + IMAGES.length) % IMAGES.length);
          setTimeout(() => { isAnimating.current = false; }, 1100);
        }
      };

      el.addEventListener("wheel", handleWheel, { passive: false });
      return () => el.removeEventListener("wheel", handleWheel);
    }, []);

    const onPointerDown = (e: React.PointerEvent) => {
      dragStart.current = e.clientX;
    };

    const onPointerUp = (e: React.PointerEvent) => {
      if (dragStart.current === null) return;
      const delta = e.clientX - dragStart.current;
      if (delta < -40) next();
      else if (delta > 40) prev();
      dragStart.current = null;
    };

    return (
      <div className={styles.root}>
        <div
          ref={stageRef}
          className={styles.stage}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          {IMAGES.map((img, i) => {
            const offset = i - current;
            const wrappedOffset =
              offset > IMAGES.length / 2
                ? offset - IMAGES.length
                : offset < -IMAGES.length / 2
                ? offset + IMAGES.length
                : offset;

            const isActive = wrappedOffset === 0;
            const absOff = Math.abs(wrappedOffset);
            const visible = absOff <= 1;

            return (
              <div
                key={i}
                className={`${styles.card} ${isActive ? styles.cardActive : ""}`}
                style={{
                  transform: `
                    translateX(${wrappedOffset * 72}%)
                    translateZ(${isActive ? 0 : -120}px)
                    rotateY(${wrappedOffset * -22}deg)
                    scale(${isActive ? 1 : 0.78})
                  `,
                  opacity: visible ? (isActive ? 1 : 0.45) : 0,
                  pointerEvents: isActive ? "auto" : "none",
                  zIndex: isActive ? 2 : 1,
                }}
                onClick={() => !isActive && (wrappedOffset < 0 ? prev() : next())}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.alt} draggable={false} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

export default Gallery3D;
