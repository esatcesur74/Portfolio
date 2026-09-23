"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follow = followRef.current;
    if (!cursor || !follow) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let followX = x;
    let followY = y;
    let frame = 0;

    const onPointerMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      const projectLink = event.target instanceof Element
        ? event.target.closest<HTMLElement>(".project-link")
        : null;

      cursor.dataset.visible = "true";
      follow.dataset.visible = projectLink ? "true" : "false";
      follow.textContent = projectLink?.dataset.cursorLabel ?? "View project";
    };

    const onPointerLeave = () => {
      cursor.dataset.visible = "false";
      follow.dataset.visible = "false";
    };

    const animate = () => {
      followX += (x - followX) * 0.18;
      followY += (y - followY) * 0.18;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-3px, -3px)`;
      follow.style.transform = `translate3d(${followX + 18}px, ${followY + 18}px, 0)`;
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onPointerMove);
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="global-cursor" data-visible="false" aria-hidden="true">
        <svg viewBox="0 0 40 40">
          <path
            fill="currentColor"
            d="M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z"
          />
        </svg>
      </div>
      <div ref={followRef} className="project-cursor-follow" data-visible="false" aria-hidden="true" />
    </>
  );
}
