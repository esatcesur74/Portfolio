"use client";

import { useEffect, useRef } from "react";

const CELL_VW = 0.03;

export default function PixelGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cols = 0;
    let rows = 0;
    let cells: HTMLDivElement[] = [];
    let lastIdx = -1;

    const rebuild = () => {
      const cellPx = window.innerWidth * CELL_VW;
      cols = Math.ceil(window.innerWidth / cellPx);
      rows = Math.ceil(window.innerHeight / cellPx);

      container.innerHTML = "";
      cells = [];

      container.style.gridTemplateColumns = `repeat(${cols}, ${cellPx}px)`;
      container.style.gridTemplateRows    = `repeat(${rows}, ${cellPx}px)`;

      for (let i = 0; i < cols * rows; i++) {
        const cell = document.createElement("div");
        cell.style.width  = `${cellPx}px`;
        cell.style.height = `${cellPx}px`;
        cell.style.transition = "background-color 0.35s ease";
        container.appendChild(cell);
        cells.push(cell);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const cellPx = window.innerWidth * CELL_VW;
      const col = Math.floor(e.clientX / cellPx);
      const row = Math.floor(e.clientY / cellPx);
      const idx = row * cols + col;

      if (idx === lastIdx || !cells[idx]) return;
      lastIdx = idx;

      const cell = cells[idx];
      cell.style.backgroundColor = "#ffffff";
      setTimeout(() => {
        cell.style.backgroundColor = "";
      }, 400);
    };

    rebuild();
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", rebuild);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", rebuild);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        display: "grid",
        pointerEvents: "none",
        zIndex: 9998,
        mixBlendMode: "difference",
      }}
    />
  );
}
