"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import useMouse from "@/hooks/useMouse";

const vertexShader = `
  varying vec2 vUv;
  uniform vec2 uDelta;
  uniform float uAmplitude;

  void main() {
    vUv = uv;
    vec3 newPosition = position;
    float PI = 3.141592653589793;
    newPosition.x += sin(uv.y * PI) * uDelta.x * uAmplitude;
    newPosition.y += sin(uv.x * PI) * uDelta.y * uAmplitude;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uAlpha;

  void main() {
    vec4 tex = texture2D(uTexture, vUv);
    gl_FragColor = vec4(tex.rgb, tex.a * uAlpha);
  }
`;

const cardDefs = [
  { bg: "#fffde7", accent: "#ffed29", num: "01" },
  { bg: "#6767FF", accent: "#ffed29", num: "02" },
  { bg: "#FF6767", accent: "#ffed29", num: "03" },
];

function lerp(a: number, b: number, t: number) {
  return a * (1 - t) + b * t;
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

interface Props {
  activeCard: number | null;
}

export default function AboutModel({ activeCard }: Props) {
  const { viewport } = useThree();
  const mouse = useMouse();
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const prevMouse = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const currentDelta = useRef({ x: 0, y: 0 });
  const currentAlpha = useRef(0);
  const lastActiveCard = useRef<number | null>(null);

  const textures = useMemo(() => {
    return cardDefs.map(({ bg, accent, num }) => {
      const canvas = document.createElement("canvas");
      canvas.width = 480;
      canvas.height = 600;
      const ctx = canvas.getContext("2d")!;

      // Background gradient
      const { r, g, b } = hexToRgb(bg);
      const grad = ctx.createLinearGradient(0, 0, 480, 600);
      grad.addColorStop(0, bg);
      grad.addColorStop(
        1,
        `rgb(${Math.max(0, r - 70)},${Math.max(0, g - 70)},${Math.max(0, b - 70)})`
      );
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 480, 600);

      // Accent glow circle
      const { r: ar, g: ag, b: ab } = hexToRgb(accent);
      const glow = ctx.createRadialGradient(380, 520, 0, 380, 520, 220);
      glow.addColorStop(0, `rgba(${ar},${ag},${ab},0.35)`);
      glow.addColorStop(1, `rgba(${ar},${ag},${ab},0)`);
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, 480, 600);

      // Large number watermark
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 260px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(num, 240, 320);
      ctx.globalAlpha = 1;

      return new THREE.CanvasTexture(canvas);
    });
  }, []);

  useFrame(() => {
    if (!meshRef.current || !materialRef.current) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    const targetX = ((mouse.current.x / w) * 2 - 1) * (viewport.width / 2);
    const targetY = (-(mouse.current.y / h) * 2 + 1) * (viewport.height / 2);

    currentPos.current.x = lerp(currentPos.current.x, targetX, 0.08);
    currentPos.current.y = lerp(currentPos.current.y, targetY, 0.08);

    meshRef.current.position.x = currentPos.current.x;
    meshRef.current.position.y = currentPos.current.y;

    const deltaX = (mouse.current.x - prevMouse.current.x) / w;
    const deltaY = (mouse.current.y - prevMouse.current.y) / h;

    currentDelta.current.x = lerp(currentDelta.current.x, deltaX, 0.1);
    currentDelta.current.y = lerp(currentDelta.current.y, deltaY, 0.1);

    prevMouse.current = { x: mouse.current.x, y: mouse.current.y };

    materialRef.current.uniforms.uDelta.value.x = currentDelta.current.x;
    materialRef.current.uniforms.uDelta.value.y = currentDelta.current.y;

    const targetAlpha = activeCard !== null ? 1 : 0;
    currentAlpha.current = lerp(currentAlpha.current, targetAlpha, 0.08);
    materialRef.current.uniforms.uAlpha.value = currentAlpha.current;

    if (activeCard !== null && activeCard !== lastActiveCard.current) {
      materialRef.current.uniforms.uTexture.value = textures[activeCard];
      lastActiveCard.current = activeCard;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry
        args={[viewport.width * 0.26, viewport.height * 0.36, 32, 32]}
      />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        uniforms={{
          uTexture: { value: textures[0] },
          uDelta: { value: new THREE.Vector2(0, 0) },
          uAlpha: { value: 0 },
          uAmplitude: { value: 3.0 },
        }}
      />
    </mesh>
  );
}
