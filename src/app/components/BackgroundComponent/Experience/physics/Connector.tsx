import * as THREE from "three";
import { useRef, useMemo, ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { RapierRigidBody } from "@react-three/rapier";
import { CubeModel } from "../models/CubeModel";

interface ConnectorProps {
  position?: [number, number, number];
  children?: ReactNode;
  vec?: THREE.Vector3;
  scale?: number | [number, number, number];
  r?: (range: number) => number;
  accent?: boolean;
  color?: string;
  [key: string]: any; // For additional props
}

export function Connector({
  position,
  children,
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  accent,
  ...props
}: ConnectorProps) {
  const api = useRef<RapierRigidBody>(null);
  const pos = useMemo(() => position || [r(5), r(5), r(5) + 5], [position, r]);

  useFrame((state, delta) => {
    if (!api.current) return;

    delta = Math.min(0.1, delta);
    const floatForce = Math.sin(state.clock.elapsedTime) * 0.05;

    // Get current position
    const currentPos = api.current.translation();

    // Constrain position within bounds
    const boundedPos = new THREE.Vector3(
      THREE.MathUtils.clamp(currentPos.x, -7, 7),
      THREE.MathUtils.clamp(currentPos.y, -7, 7),
      THREE.MathUtils.clamp(currentPos.z, 0, 10)
    );

    // Calculate force towards center if outside bounds
    const centeringForce = new THREE.Vector3()
      .copy(boundedPos)
      .sub(currentPos)
      .multiplyScalar(0.5);

    // Apply forces with constraints
    api.current.setTranslation(boundedPos, true);
    api.current.applyImpulse(
      vec
        .copy(api.current.translation())
        .negate()
        .multiplyScalar(0.1)
        .add(new THREE.Vector3(0, floatForce, 0))
        .add(centeringForce)
        .clampLength(0, 1), // Limit maximum force
      true
    );
  });

  return (
    <RigidBody
      linearDamping={4}
      angularDamping={1}
      friction={0.2}
      position={pos}
      ref={api}
      colliders={false}
    >
      <CuboidCollider args={[0.38, 1.27, 0.38]} />
      <CuboidCollider args={[1.27, 0.38, 0.38]} />
      <CuboidCollider args={[0.38, 0.38, 1.27]} />
      {children ? children : <CubeModel {...props} />}
      {accent && (
        <pointLight intensity={4} distance={2.5} color={props.color} />
      )}
    </RigidBody>
  );
}
