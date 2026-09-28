"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { PART_CONFIGS, useHeroStore } from "./useHeroStore";

export function CameraRig() {
  const { camera, controls } = useThree() as {
    camera: THREE.PerspectiveCamera;
    controls?: {
      target: THREE.Vector3;
      autoRotate?: boolean;
      update: () => void;
    };
  };

  const activePart = useHeroStore((s) => s.activePart);
  const partPositions = useHeroStore((s) => s.partPositions);

  const desiredLookAt = useMemo(() => new THREE.Vector3(), []);
  const desiredCamPos = useMemo(() => new THREE.Vector3(), []);
  const fallbackLookAt = useRef(new THREE.Vector3(0, 0.25, 0));

  useFrame((_, delta) => {
    const config = PART_CONFIGS[activePart];
    const target = partPositions[activePart];

    if (activePart === "bike" || !target) {
      desiredLookAt.set(...config.targetPos);
      desiredCamPos.set(...config.cameraPos);
      if (controls) controls.autoRotate = true;
    } else {
      if (controls) controls.autoRotate = false;

      if (activePart === "tires") {
        desiredLookAt.set(target[0], target[1], target[2]);
        desiredCamPos.set(target[0] + 1.25, target[1] + 0.1, target[2] + 0.3);
      } else if (activePart === "headlight") {
        desiredLookAt.set(target[0], target[1], target[2]);
        desiredCamPos.set(target[0] + 0.5, target[1] + 0.1, target[2] - 1.1);
      } else if (activePart === "engine") {
        desiredLookAt.set(target[0], target[1], target[2]);
        desiredCamPos.set(target[0] + 1.3, target[1] + 0.1, target[2] + 0.2);
      } else if (activePart === "exhaust") {
        desiredLookAt.set(target[0], target[1], target[2]);
        desiredCamPos.set(target[0] + 1.2, target[1] + 0.1, target[2] + 0.5);
      }
    }

    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      desiredCamPos.x,
      3.5,
      delta
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      desiredCamPos.y,
      3.5,
      delta
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      desiredCamPos.z,
      3.5,
      delta
    );

    if (controls && controls.target) {
      controls.target.x = THREE.MathUtils.damp(
        controls.target.x,
        desiredLookAt.x,
        3.5,
        delta
      );
      controls.target.y = THREE.MathUtils.damp(
        controls.target.y,
        desiredLookAt.y,
        3.5,
        delta
      );
      controls.target.z = THREE.MathUtils.damp(
        controls.target.z,
        desiredLookAt.z,
        3.5,
        delta
      );
      controls.update();
    } else {
      fallbackLookAt.current.x = THREE.MathUtils.damp(
        fallbackLookAt.current.x,
        desiredLookAt.x,
        3.5,
        delta
      );
      fallbackLookAt.current.y = THREE.MathUtils.damp(
        fallbackLookAt.current.y,
        desiredLookAt.y,
        3.5,
        delta
      );
      fallbackLookAt.current.z = THREE.MathUtils.damp(
        fallbackLookAt.current.z,
        desiredLookAt.z,
        3.5,
        delta
      );
      camera.lookAt(fallbackLookAt.current);
    }

    if ("fov" in camera) {
      camera.fov = THREE.MathUtils.damp(camera.fov, config.fov, 3.5, delta);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
