"use client";

import { Canvas } from "@react-three/fiber";
import AboutModel from "./AboutModel";

interface Props {
  activeCard: number | null;
}

export default function AboutScene({ activeCard }: Props) {
  return (
    <div
      className="fixed inset-0 z-30"
      style={{ pointerEvents: "none" }}
    >
      <Canvas
        style={{ pointerEvents: "none" }}
        onCreated={(state) => {
          state.events.disconnect?.();
        }}
      >
        <AboutModel activeCard={activeCard} />
      </Canvas>
    </div>
  );
}
