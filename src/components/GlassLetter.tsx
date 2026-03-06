"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Text3D,
  MeshTransmissionMaterial,
  Environment,
  Center,
} from "@react-three/drei";
import * as THREE from "three";

function Letter() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      mouse.y * -0.4,
      0.06
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      mouse.x * 0.6,
      0.06
    );
  });

  return (
    <Center>
      <Text3D
        ref={meshRef}
        font="/fonts/helvetiker_bold.typeface.json"
        size={2.2}
        height={0.55}
        curveSegments={32}
        bevelEnabled
        bevelThickness={0.04}
        bevelSize={0.02}
        bevelSegments={10}
      >
        E
        <MeshTransmissionMaterial
          thickness={0.3}
          roughness={0}
          transmission={1}
          ior={1.2}
          chromaticAberration={0.04}
          backside
          backsideThickness={0.3}
          color="white"
          samples={16}
        />
      </Text3D>
    </Center>
  );
}

export default function GlassLetter() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ fov: 40, position: [0, 0, 9] }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Suspense fallback={null}>
          <Letter />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
