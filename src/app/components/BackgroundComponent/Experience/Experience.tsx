import { Stage, Float, Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import { ShirtM } from "./ShirtM";
import * as THREE from "three";
import { isClickedStore } from "@/app/stores/IsClickedStore";

function ShirtGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const isClicked = isClickedStore((state) => state.isClicked);
  const setIsAnimating = isClickedStore((state) => state.setIsAnimating);

  const targetPosition = useMemo<[number, number, number]>(() => {
    switch (isClicked) {
      case "studio":
      case "projects":
        return [5, 0.8, 0];
      case "records":
      case "contact":
        return [-5, 0.8, 0];
      case "services":
        return [0, 5, 0];
      default:
        return [0, 0.8, 0];
    }
  }, [isClicked]);

  const tempVec = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (groupRef.current) {
      const current = groupRef.current.position;
      const target = tempVec.set(...targetPosition);
      current.lerp(target, 0.1);
      const isAnimating = current.distanceTo(target) > 0.01;
      setIsAnimating(isAnimating);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.8, 0]} scale={1.2}>
      <Suspense fallback={null}>
        <Environment preset="warehouse" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 1.5, 4]} intensity={3.5} />
        <Float
          speed={5.75}
          rotationIntensity={0.2}
          floatIntensity={1}
          floatingRange={[-0.05, 0.05]}
        >
          <ShirtM />
        </Float>
        <Stage adjustCamera={false} />
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
    </Canvas>
  );
};
