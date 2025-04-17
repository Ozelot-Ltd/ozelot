import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BallCollider, RigidBody } from "@react-three/rapier";
import { RapierRigidBody } from "@react-three/rapier";

interface PointerProps {
  vec?: THREE.Vector3;
}

export function Pointer({ vec = new THREE.Vector3() }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ mouse, viewport }) => {
    ref.current?.setNextKinematicTranslation(
      vec.set(
        (mouse.x * viewport.width) / 3,
        (mouse.y * viewport.height) / 3,
        0
      )
    );
  });

  return (
    <RigidBody
      position={[0, 0, 0]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[0.6]} />
    </RigidBody>
  );
}
