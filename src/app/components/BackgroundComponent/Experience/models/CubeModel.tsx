import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { Mesh, MeshStandardMaterial } from 'three';
import { ReactNode } from 'react';

interface CubeModelProps {
  children?: ReactNode;
  color?: string;
  roughness?: number;
  position?: [number, number, number];
  [key: string]: any;
}

// test

export function CubeModel({
  children,
  color = 'white',
  roughness = 0,
  ...props
}: CubeModelProps) {
  const ref = useRef<Mesh & { material: MeshStandardMaterial }>(null);
  const initialY = props.position?.[1] || 0;

  useFrame((state, delta) => {
    if (!ref.current) return;

    // Color transition
    easing.dampC(ref.current.material.color, color, 0.2, delta);

    // Subtle floating motion
    ref.current.position.y =
      initialY + Math.sin(state.clock.elapsedTime) * 0.03;
    // Gentle rotation
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    ref.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.5) * 0.05;
  });

  return (
    <mesh ref={ref} castShadow receiveShadow scale={10} {...props}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial
        metalness={0.2}
        roughness={roughness}
        color={color}
      />
      {children}
    </mesh>
  );
}
