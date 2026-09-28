"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useGLTF, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useHeroStore } from "./useHeroStore";

export function BikeModel() {
  const { scene } = useGLTF("/models/bike.glb");
  const groupRef = useRef<THREE.Group>(null);
  const activePart = useHeroStore((s) => s.activePart);
  const setPartPosition = useHeroStore((s) => s.setPartPosition);

  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const materials = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];

        materials.forEach((mat) => {
          if (!mat) return;
          const m = mat as THREE.MeshStandardMaterial;

          const name = m.name.toLowerCase();

          if (
            m.name === "vehicle_paint1" ||
            m.name.includes("PRIMARY") ||
            m.name === "carbon fiber red"
          ) {
            m.color.set("#dc2626");
            m.metalness = 0.35;
            m.roughness = 0.12;
            m.transparent = false;
            m.opacity = 1.0;
            m.depthWrite = true;
            m.map = null;
            if ("clearcoat" in m) {
              (m as any).clearcoat = 1.0;
              (m as any).clearcoatRoughness = 0.05;
            }
            m.needsUpdate = true;
          } else if (name.includes("exhaust")) {
            m.color.set("#e4e4e7");
            m.metalness = 0.95;
            m.roughness = 0.18;
            m.transparent = false;
            m.depthWrite = true;
            m.map = null;
            m.needsUpdate = true;
          } else if (name.includes("brake") || name.includes("bikedisc")) {
            m.color.set("#cbd5e1");
            m.metalness = 0.9;
            m.roughness = 0.2;
            m.transparent = false;
            m.depthWrite = true;
            m.map = null;
            m.needsUpdate = true;
          } else if (name.includes("tyre") || name.includes("tire")) {
            m.color.set("#171717");
            m.metalness = 0.05;
            m.roughness = 0.85;
            m.transparent = false;
            m.depthWrite = true;
            m.map = null;
            m.needsUpdate = true;
          } else if (name.includes("glass")) {
            m.color.set("#0f172a");
            m.transparent = true;
            m.opacity = 0.35;
            m.roughness = 0.05;
            m.metalness = 0.1;
            m.map = null;
            m.needsUpdate = true;
          } else if (m.name === "rgbab60000ff") {
            m.color.set("#ef4444");
            m.emissive.set("#dc2626");
            m.emissiveIntensity = 2.0;
            m.transparent = false;
            m.map = null;
            m.needsUpdate = true;
          } else if (m.name.includes("decal_logo")) {
            m.transparent = true;
            m.needsUpdate = true;
          } else {
            m.color.set("#18181b");
            m.metalness = 0.75;
            m.roughness = 0.28;
            m.transparent = false;
            m.opacity = 1.0;
            m.depthWrite = true;
            m.map = null;
            m.needsUpdate = true;
          }
        });
      }
    });

    const tempBox = new THREE.Box3();
    const tempVec = new THREE.Vector3();

    const checkPart = (
      name: string,
      partKey: "engine" | "tires" | "headlight" | "exhaust"
    ) => {
      const obj = scene.getObjectByName(name);
      if (obj) {
        tempBox.setFromObject(obj);
        tempBox.getCenter(tempVec);
        setPartPosition(partKey, [tempVec.x, tempVec.y, tempVec.z]);
      }
    };

    const timer = setTimeout(() => {
      checkPart("engineblock", "engine");
      checkPart("wheel_lf", "tires");
      checkPart("headlight_l", "headlight");
      checkPart("exhaust_1", "exhaust");
    }, 120);

    return () => clearTimeout(timer);
  }, [scene, setPartPosition]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (activePart === "bike") {
      groupRef.current.rotation.y += delta * 0.1;
    } else {
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        0,
        3.5,
        delta
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.25, 0]} scale={1.35}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

useGLTF.preload("/models/bike.glb");
