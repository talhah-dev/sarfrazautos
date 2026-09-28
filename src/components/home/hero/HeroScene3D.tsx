"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { BikeModel } from "./BikeModel";
import { CameraRig } from "./CameraRig";

function LoaderFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-20">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
          Loading 
        </span>
      </div>
    </div>
  );
}

export default function HeroScene3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "150px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-auto">
      <Suspense fallback={<LoaderFallback />}>
        <Canvas
          shadows
          frameloop={isVisible ? "always" : "never"}
          dpr={[1, 1.5]}
          camera={{ position: [4.2, 0.4, 0.9], fov: 30 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <color attach="background" args={["#080808"]} />
          <ambientLight intensity={1.8} />

          <directionalLight
            position={[5, 7, 5]}
            intensity={3.2}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0001}
          />

          <directionalLight
            position={[-5, 4, -4]}
            intensity={3.5}
            color="#ef4444"
          />

          <directionalLight
            position={[0, -4, 4]}
            intensity={0.8}
            color="#ffffff"
          />

          <pointLight position={[0, 2, 2]} intensity={2.2} color="#ffffff" />
          <pointLight position={[-2, 1, 0]} intensity={1.8} color="#fca5a5" />

          <BikeModel />
          <CameraRig />

          <OrbitControls
            makeDefault
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.6}
            maxPolarAngle={Math.PI / 2 + 0.05}
            minPolarAngle={Math.PI / 3}
            dampingFactor={0.05}
          />

          <ContactShadows
            position={[0, -0.45, 0]}
            opacity={0.8}
            scale={7}
            blur={1.6}
            far={3}
            frames={1}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
