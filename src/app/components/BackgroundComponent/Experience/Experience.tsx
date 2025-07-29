import { Stage, Float } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import { ShirtM } from "./ShirtM";
import * as THREE from "three";
import { isClickedStore } from "@/app/stores/IsClickedStore";
import { Perf } from "r3f-perf";

function ShirtGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const isClicked = isClickedStore((state) => state.isClicked);
  const setIsAnimating = isClickedStore((state) => state.setIsAnimating);
  const { viewport } = useThree();

  // Calculate offscreen positions based on viewport width
  // Adding extra distance to ensure it's fully offscreen on any monitor size
  const offscreenX = useMemo(
    () => Math.max(viewport.width * 0.7, 8),
    [viewport.width]
  );
  const offscreenY = useMemo(
    () => Math.max(viewport.height * 0.7, 6),
    [viewport.height]
  );

  const targetPosition = useMemo<[number, number, number]>(() => {
    switch (isClicked) {
      case "studio":
      case "projects":
        return [offscreenX, 0.8, 0]; // Right side exit
      case "records":
      case "contact":
        return [-offscreenX, 0.8, 0]; // Left side exit
      case "services":
        return [0, offscreenY, 0]; // Top exit
      default:
        return [0, 0.8, 0]; // Center position
    }
  }, [isClicked, offscreenX, offscreenY]);

  const tempVec = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (groupRef.current) {
      const current = groupRef.current.position;
      const target = tempVec.set(...targetPosition);

      // Check if returning to center
      const isReturningToCenter =
        targetPosition[0] === 0 &&
        targetPosition[1] === 0.8 &&
        targetPosition[2] === 0;

      // Use faster, constant lerp factor when returning to center
      let lerpFactor;
      if (isReturningToCenter) {
        lerpFactor = 0.2; // Much faster return to center
      } else {
        // For moving away, keep the smoother, distance-based lerp
        const distance = current.distanceTo(target);
        const viewportFactor = Math.min(
          1,
          5 / (viewport.width + viewport.height)
        );
        lerpFactor = Math.min(0.1, (0.05 + distance * 0.02) * viewportFactor);
      }

      current.lerp(target, lerpFactor);

      // Consider animation complete when very close to target
      const isAnimating = current.distanceTo(target) > 0.01;
      setIsAnimating(isAnimating);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.8, 0]} scale={1.2}>
      <Suspense fallback={null}>
        <directionalLight position={[3, 1.5, 4]} intensity={2.5} />
        <Float
          speed={5.75}
          rotationIntensity={0.2}
          floatIntensity={1}
          floatingRange={[-0.05, 0.05]}
        >
          <ShirtM />
        </Float>
        <Stage adjustCamera={false} environment="warehouse" />
      </Suspense>
    </group>
  );
}

export const Experience = () => {
  return (
    <Canvas shadows camera={{ position: [0, 1, 7], fov: 30 }}>
      <color attach="background" args={["#ebebeb"]} />
      <fog attach="fog" args={["#ebebeb", 5, 20]} />
      <ShirtGroup />
      <Perf position="top-left" />
    </Canvas>
  );
};
