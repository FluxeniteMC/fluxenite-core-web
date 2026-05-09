"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshReflectorMaterial, OrbitControls, Sparkles, Torus, useTexture } from "@react-three/drei";
import { Bloom, DepthOfField, EffectComposer } from "@react-three/postprocessing";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { useMouseParallax } from "@/hooks/useMouseParallax";

type SceneVariant = "home" | "features" | "about" | "services" | "contact";

function MarbleMaterial() {
  const texture = useTexture("/textures/marble.svg");
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return <meshPhysicalMaterial map={texture} color="#eee4d8" roughness={0.38} metalness={0.02} clearcoat={0.7} clearcoatRoughness={0.16} />;
}

function FluxLogoMesh({ color = "#151515" }: { color?: string }) {
  return (
    <group rotation={[0, 0, 0]}>
      <mesh castShadow position={[0, 0.55, 0]}>
        <boxGeometry args={[1.35, 0.24, 0.22]} />
        <meshStandardMaterial color={color} metalness={0.55} roughness={0.25} />
      </mesh>
      <mesh castShadow position={[-0.5, 0, 0]}>
        <boxGeometry args={[0.25, 1.35, 0.22]} />
        <meshStandardMaterial color={color} metalness={0.55} roughness={0.25} />
      </mesh>
      <mesh castShadow position={[0.22, 0.03, 0]}>
        <boxGeometry args={[1, 0.22, 0.22]} />
        <meshStandardMaterial color={color} metalness={0.55} roughness={0.25} />
      </mesh>
    </group>
  );
}

function InstancedParticles() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(() => Array.from({ length: 90 }, (_, i) => ({
    x: (Math.random() - 0.5) * 9,
    y: Math.random() * 4 - 1,
    z: (Math.random() - 0.5) * 5,
    s: 0.015 + Math.random() * 0.035,
    o: i * 0.2
  })), []);
  useFrame(({ clock }: any) => {
    if (!ref.current) return;
    seeds.forEach((seed: any, i: number) => {
      dummy.position.set(seed.x, seed.y + Math.sin(clock.elapsedTime * 0.45 + seed.o) * 0.18, seed.z);
      dummy.scale.setScalar(seed.s);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, seeds.length]}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshBasicMaterial color="#d7bea0" transparent opacity={0.42} />
    </instancedMesh>
  );
}

function Composition({ variant }: { variant: SceneVariant }) {
  const group = useRef<THREE.Group>(null);
  const mouse = useMouseParallax(1);
  const isGold = variant === "about" || variant === "services";

  useFrame(({ camera, clock }: any) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.35, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1.4 - mouse.y * 0.25, 0.035);
    camera.lookAt(0, 0.4, 0);
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.elapsedTime * 0.25) * 0.08 + mouse.x * 0.08;
      group.current.position.y = Math.sin(clock.elapsedTime * 0.7) * 0.08;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.35}>
        <mesh receiveShadow castShadow position={[0, -1.08, 0]}>
          <cylinderGeometry args={[2.25, 2.35, 0.42, 96]} />
          <MarbleMaterial />
        </mesh>
        <mesh castShadow position={[0, -0.78, 0]}>
          <cylinderGeometry args={[1.7, 1.7, 0.16, 96]} />
          <meshStandardMaterial color="#c29a69" metalness={0.85} roughness={0.18} />
        </mesh>
        <Torus args={[1.58, 0.025, 16, 128]} rotation={[1.28, 0.18, 0.2]} position={[0, 0.35, 0]}>
          <meshPhysicalMaterial color="#f8f4ee" metalness={0.15} roughness={0.05} transmission={0.65} thickness={0.7} transparent opacity={0.52} />
        </Torus>
        <Torus args={[1.8, 0.018, 16, 128]} rotation={[1.42, -0.08, -0.25]} position={[0, 0.35, 0]}>
          <meshStandardMaterial color="#b98a55" metalness={0.9} roughness={0.18} />
        </Torus>
        <FluxLogoMesh color={isGold ? "#b98a55" : "#151515"} />
      </Float>
      <Float speed={1.6} floatIntensity={0.6}><mesh castShadow position={[2.7, 0.9, -0.6]}><sphereGeometry args={[0.48, 48, 48]} /><MarbleMaterial /></mesh></Float>
      <Float speed={1.9} floatIntensity={0.7}><mesh castShadow position={[-2.4, -0.35, 0.2]}><sphereGeometry args={[0.3, 48, 48]} /><meshStandardMaterial color="#b98a55" metalness={1} roughness={0.16} /></mesh></Float>
      <Float speed={1.3} floatIntensity={0.7}><mesh position={[2.15, -0.25, 0.8]}><sphereGeometry args={[0.22, 32, 32]} /><meshPhysicalMaterial color="#ffffff" transmission={0.86} roughness={0.03} thickness={0.65} transparent opacity={0.58} /></mesh></Float>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.32, 0]} receiveShadow>
        <planeGeometry args={[14, 9]} />
        <MeshReflectorMaterial blur={[360, 120]} resolution={512} mixBlur={1} mixStrength={8} depthScale={0.7} color="#efe7dd" metalness={0.06} roughness={0.45} />
      </mesh>
      <Sparkles count={35} scale={[6, 3, 3]} size={2.8} speed={0.25} color="#c5a178" />
      <InstancedParticles />
    </group>
  );
}

export default function FluxScene({ variant = "home" }: { variant?: SceneVariant }) {
  return (
    <div className="absolute inset-0 z-0 h-full w-full" aria-hidden="true">
      <Canvas shadows dpr={[1, 1.75]} camera={{ position: [0, 1.4, 5.4], fov: 38 }} gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={1.8} />
          <directionalLight castShadow position={[4, 5, 3]} intensity={3.2} shadow-mapSize={[1024, 1024]} />
          <spotLight castShadow position={[-3, 4, 4]} angle={0.45} penumbra={0.8} intensity={2.1} color="#fff3e3" />
          <Composition variant={variant} />
          <Environment preset="apartment" />
          <EffectComposer multisampling={0} enableNormalPass={false}>
            <Bloom intensity={0.22} luminanceThreshold={0.72} mipmapBlur />
            <DepthOfField focusDistance={0.035} focalLength={0.035} bokehScale={1.4} />
          </EffectComposer>
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
