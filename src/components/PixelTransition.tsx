"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NUM_ROWS = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const blockAnim = {
  initial: { opacity: 0 },
  open: (delay: [number, number]) => ({
    opacity: 1,
    transition: { duration: 0, delay: 0.02 * delay[1] },
  }),
  closed: (delay: [number, number]) => ({
    opacity: 0,
    transition: { duration: 0, delay: 0.02 * delay[0] },
  }),
};

export default function PixelTransition({ isActive }: { isActive: boolean }) {
  const [rows, setRows] = useState<[number, number][][]>([]);

  useEffect(() => {
    const blockSize = window.innerHeight * 0.1;
    const nbOfBlocks = Math.ceil(window.innerWidth / blockSize);

    const grid = Array.from({ length: NUM_ROWS }, (_, rowIndex) => {
      const shuffled = shuffle(Array.from({ length: nbOfBlocks }, (_, i) => i));
      return shuffled.map((randomIndex): [number, number] => [
        rowIndex + randomIndex,
        NUM_ROWS - rowIndex + randomIndex,
      ]);
    });

    setRows(grid);
  }, []);

  if (rows.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        pointerEvents: "none",
      }}
    >
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex", flex: 1 }}>
          {row.map((delay, blockIndex) => (
            <motion.div
              key={blockIndex}
              custom={delay}
              variants={blockAnim}
              initial="initial"
              animate={isActive ? "open" : "closed"}
              style={{
                flex: 1,
                height: "100%",
                backgroundColor: "#ffed29",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
