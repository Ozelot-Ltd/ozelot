import { Lightformer } from '@react-three/drei';

export function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <spotLight
        position={[10, 0, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <EnvironmentLighting />
    </>
  );
}

export function EnvironmentLighting() {
  return (
    <group rotation={[-Math.PI / 3, 0, 1]}>
      <Lightformer
        form="circle"
        intensity={4}
        rotation-x={Math.PI / 2}
        position={[0, 5, -9]}
        scale={2}
      />
      <Lightformer
        form="circle"
        intensity={2}
        rotation-y={Math.PI / 2}
        position={[-5, 1, -1]}
        scale={2}
      />
      <Lightformer
        form="circle"
        intensity={2}
        rotation-y={Math.PI / 2}
        position={[-5, -1, -1]}
        scale={2}
      />
      <Lightformer
        form="circle"
        intensity={2}
        rotation-y={-Math.PI / 2}
        position={[10, 1, 0]}
        scale={8}
      />
    </group>
  );
}
