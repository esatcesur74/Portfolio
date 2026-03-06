"use client";

import { useRef, useEffect, useCallback } from "react";

interface Props {
  brushSize?: number;
}

export default function PaintCanvas({ brushSize = 50 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPos = useRef<{ x: number; y: number } | null>(null);
  const animRef = useRef<number | null>(null);
  const alphaRef = useRef<number>(1);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    alphaRef.current = 1;
  }, []);

  useEffect(() => {
    initCanvas();
    const observer = new ResizeObserver(initCanvas);
    if (canvasRef.current) observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, [initCanvas]);

  const drawCircles = useCallback(
    (x: number, y: number, px: number, py: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.globalCompositeOperation = "destination-out";

      const dist = Math.sqrt((x - px) ** 2 + (y - py) ** 2);
      const steps = Math.max(1, Math.floor(dist / 4));

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const cx = px + (x - px) * t;
        const cy = py + (y - py) * t;

        ctx.beginPath();
        ctx.arc(cx, cy, brushSize, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    [brushSize]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (prevPos.current) {
        drawCircles(x, y, prevPos.current.x, prevPos.current.y);
      } else {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.globalCompositeOperation = "destination-out";
          ctx.beginPath();
          ctx.arc(x, y, brushSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      prevPos.current = { x, y };
    },
    [drawCircles, brushSize]
  );

  const handleMouseLeave = useCallback(() => {
    prevPos.current = null;
    if (animRef.current) cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 w-full h-full cursor-crosshair z-10"
      style={{ pointerEvents: "auto" }}
    />
  );
}
