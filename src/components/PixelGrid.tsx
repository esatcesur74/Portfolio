"use client";

import { useState, useEffect } from "react";

export default function PixelGrid() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const colorize = (el: HTMLDivElement) => {
    el.style.backgroundColor = "#ffed29";
    setTimeout(() => {
      el.style.backgroundColor = "transparent";
    }, 300);
  };

  const getBlocks = () => {
    const blockSize = windowWidth * 0.05;
    const nbOfBlocks = Math.ceil(window.innerHeight / blockSize);
    return [...Array(nbOfBlocks).keys()].map((_, index) => (
      <div
        key={index}
        onMouseEnter={(e) => colorize(e.currentTarget)}
        style={{ width: "100%", height: "5vw" }}
      />
    ));
  };

  if (windowWidth === 0) return null;

  return (
    <div
      className="absolute inset-0 flex overflow-hidden pointer-events-none"
      style={{ pointerEvents: "auto" }}
    >
      {[...Array(20).keys()].map((_, index) => (
        <div key={index} style={{ width: "5vw", flexShrink: 0 }}>
          {getBlocks()}
        </div>
      ))}
    </div>
  );
}
