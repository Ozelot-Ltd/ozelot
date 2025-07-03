import { Stage, Float, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ShirtM } from "./ShirtM";

export const Experience = () => {
  return (
    <>
      <Canvas shadows camera={{ position: [0, 1, 7], fov: 30 }}>
        <color attach="background" args={["#ebebeb"]} />
        <fog attach="fog" args={["#ebebeb", 5, 20]} />
        <group position-y={0.8} scale={1.2}>
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
      </Canvas>
    </>
  );
};
