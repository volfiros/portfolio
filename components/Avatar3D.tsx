"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Float } from "@react-three/drei";
import * as THREE from "three";

function Model({
  introPhase,
  onIntroComplete,
  reducedMotion,
}: {
  introPhase: "enter" | "spin" | "settle" | "idle";
  onIntroComplete: () => void;
  reducedMotion: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/assets/avatar.glb");
  const startTime = useRef(Date.now());
  const settled = useRef(false);

  useFrame(() => {
    if (!group.current) return;
    const elapsed = (Date.now() - startTime.current) / 1000;

    if (reducedMotion) {
      group.current.scale.setScalar(1);
      group.current.position.set(0, 0, 0);
      if (!settled.current) {
        settled.current = true;
        onIntroComplete();
      }
      return;
    }

    // Phase 1: Fade in + scale up (0-0.5s)
    if (elapsed < 0.5) {
      const t = elapsed / 0.5;
      const eased = 1 - Math.pow(1 - t, 3);
      group.current.scale.setScalar(eased * 2);
      group.current.rotation.y = 0;
    }
    // Phase 2: Spin (0.5-1.5s)
    else if (elapsed < 1.5) {
      const t = (elapsed - 0.5) / 1.0;
      group.current.scale.setScalar(2);
      group.current.rotation.y = t * Math.PI * 2;
    }
    // Phase 3: Scale down + settle (1.5-3s)
    else if (elapsed < 3) {
      const t = (elapsed - 1.5) / 1.5;
      const eased = 1 - Math.pow(1 - t, 2);
      group.current.scale.setScalar(THREE.MathUtils.lerp(2, 1, eased));
      group.current.rotation.y = Math.PI * 2 + t * 0.2;
    }
    // Phase 4: Idle
    else {
      if (!settled.current) {
        settled.current = true;
        group.current.scale.setScalar(1);
        onIntroComplete();
      }
      group.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

function ParallaxRig({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera } = useThree();

  useFrame((state) => {
    if (reducedMotion) return;
    const targetX = state.pointer.x * 0.3;
    const targetY = state.pointer.y * 0.15;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY + 1, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Placeholder geometry when .glb fails to load
function PlaceholderModel({
  introPhase,
  onIntroComplete,
  reducedMotion,
}: {
  introPhase: "enter" | "spin" | "settle" | "idle";
  onIntroComplete: () => void;
  reducedMotion: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const startTime = useRef(Date.now());
  const settled = useRef(false);

  useFrame(() => {
    if (!group.current) return;
    const elapsed = (Date.now() - startTime.current) / 1000;

    if (reducedMotion) {
      group.current.scale.setScalar(1);
      if (!settled.current) {
        settled.current = true;
        onIntroComplete();
      }
      return;
    }

    if (elapsed < 0.5) {
      const t = elapsed / 0.5;
      group.current.scale.setScalar((1 - Math.pow(1 - t, 3)) * 2);
    } else if (elapsed < 1.5) {
      const t = (elapsed - 0.5) / 1.0;
      group.current.scale.setScalar(2);
      group.current.rotation.y = t * Math.PI * 2;
    } else if (elapsed < 3) {
      const t = (elapsed - 1.5) / 1.5;
      const eased = 1 - Math.pow(1 - t, 2);
      group.current.scale.setScalar(THREE.MathUtils.lerp(2, 1, eased));
    } else {
      if (!settled.current) {
        settled.current = true;
        group.current.scale.setScalar(1);
        onIntroComplete();
      }
      group.current.rotation.y += 0.003;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={group}>
        <mesh>
          <torusKnotGeometry args={[0.6, 0.2, 128, 16]} />
          <meshStandardMaterial
            color="#8b5cf6"
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function Avatar3DScene({
  reducedMotion,
  isOverlay,
  onIntroComplete,
}: {
  reducedMotion: boolean;
  isOverlay: boolean;
  onIntroComplete: () => void;
}) {
  const [introPhase, setIntroPhase] = useState<"enter" | "spin" | "settle" | "idle">("enter");
  const [usePlaceholder, setUsePlaceholder] = useState(false);

  // Try to preload the GLB
  useEffect(() => {
    try {
      useGLTF.preload("/assets/avatar.glb");
    } catch {
      setUsePlaceholder(true);
    }
  }, []);

  const ModelComponent = usePlaceholder ? PlaceholderModel : Model;

  return (
    <Canvas
      camera={{ position: [0, 1, 4], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: isOverlay ? "none" : "auto",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <ambientLight color="#a78bfa" intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-3, -2, 4]} intensity={0.3} color="#8b5cf6" />
      <ParallaxRig reducedMotion={reducedMotion} />
      <ModelComponent
        introPhase={introPhase}
        onIntroComplete={onIntroComplete}
        reducedMotion={reducedMotion}
      />
    </Canvas>
  );
}
