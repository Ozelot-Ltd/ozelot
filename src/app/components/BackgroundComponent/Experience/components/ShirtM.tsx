import { useFrame, useGraph } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { WiggleRig } from "wiggle/rig";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";
import React from "react";
import type { GLTF } from "three-stdlib";
import { useShirtInteraction } from "@/app/hooks/useShirtInteraction";
import { SCENE_CONFIG } from "../config/sceneConfig";
import { BoneConfig } from "@/types";

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
};

// Bone configuration for wiggle effects
const BONE_CONFIGS: BoneConfig[] = [
  { name: "Root", skip: true },
  { name: "Shoulder_1", skip: true },
  { name: "Shoulder_2", skip: true },
  {
    name: "Spine 1",
    wiggleConfig: { velocity: 0.12, stiffness: 0.15, damping: 0.15 },
  },
  {
    name: "Spine 2",
    wiggleConfig: { velocity: 0.12, stiffness: 0.15, damping: 0.15 },
  },
  {
    name: "Spine 3",
    wiggleConfig: { velocity: 0.12, stiffness: 0.15, damping: 0.15 },
  },
  {
    name: "Arm 1",
    wiggleConfig: { velocity: 0.15, stiffness: 0.15, damping: 0.15 },
  },
  {
    name: "Arm 2",
    wiggleConfig: { velocity: 0.15, stiffness: 0.15, damping: 0.15 },
  },
  {
    name: "Arm 1_end",
    wiggleConfig: { velocity: 0.25, stiffness: 0.95, damping: 0.75 },
  },
  {
    name: "Arm 2_end",
    wiggleConfig: { velocity: 0.25, stiffness: 0.95, damping: 0.75 },
  },
  {
    name: "Spine 3_end",
    wiggleConfig: { velocity: 0.25, stiffness: 0.95, damping: 0.75 },
  },
];

export const ShirtM = () => {
  const { scene } = useGLTF("/models/ShirtT-transformed.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone) as unknown as GLTFResult;
  const groupRef = useRef<THREE.Group>(null);
  const wiggleRigRef = useRef<WiggleRig | null>(null);

  // Use the custom interaction hook
  const {
    isDragging,
    isSpinning,
    currentPosition,
    baseRotationY,
    totalSpinRotation,
    targetX,
    targetY,
    targetZ,
    handlePointerDown,
  } = useShirtInteraction();

  // Initialize wiggle rig
  useEffect(() => {
    if (!groupRef.current) return;

    // Find SkinnedMesh
    let skinnedMesh: THREE.SkinnedMesh | null = null;
    skinnedMesh = groupRef.current.getObjectByName(
      "Shirt"
    ) as THREE.SkinnedMesh;

    if (!skinnedMesh) {
      groupRef.current.traverse((child) => {
        if (child instanceof THREE.SkinnedMesh && !skinnedMesh) {
          skinnedMesh = child;
        }
      });
    }

    if (!skinnedMesh || !skinnedMesh.skeleton) {
      console.warn("No SkinnedMesh or skeleton found");
      return;
    }

    console.log(
      "Found skeleton with",
      skinnedMesh.skeleton.bones.length,
      "bones"
    );

    // Configure wiggle parameters on bones
    const bones = skinnedMesh.skeleton.bones;
    bones.forEach((bone, index) => {
      // Skip the root bone and primary shoulder bones
      if (index === 0) return;

      // Find configuration for this bone
      const config = BONE_CONFIGS.find((c) => c.name === bone.name);

      if (config?.skip) {
        return;
      }

      // Apply wiggle settings
      const wiggleConfig = config?.wiggleConfig || {
        velocity: 0.12,
        stiffness: 0.2,
        damping: 0.85,
      };

      bone.userData.wiggleVelocity = wiggleConfig.velocity;
      bone.userData.wiggleStiffness = wiggleConfig.stiffness;
      bone.userData.wiggleDamping = wiggleConfig.damping;
    });

    try {
      wiggleRigRef.current = new WiggleRig(skinnedMesh.skeleton);
      console.log("WiggleRig created successfully");
    } catch (error) {
      console.error("Failed to create WiggleRig:", error);
    }

    return () => {
      if (wiggleRigRef.current) {
        wiggleRigRef.current.dispose();
      }
    };
  }, [nodes]);

  // Animation frame updates
  useFrame((_, delta) => {
    if (wiggleRigRef.current) {
      // Smooth wiggle update with enhanced intensity during drag or spin
      let wiggleIntensity = 1.0;
      if (isDragging) {
        wiggleIntensity = 1.3;
      } else if (isSpinning) {
        wiggleIntensity = 1.4;
      }
      wiggleRigRef.current.update(delta * wiggleIntensity);
    }

    if (groupRef.current) {
      // Apply position and rotation based on current state
      if (isDragging && !isSpinning) {
        // Direct position update during drag for 60fps performance
        groupRef.current.position.set(
          currentPosition.current.x,
          currentPosition.current.y,
          currentPosition.current.z
        );
      } else {
        // Smooth spring interpolation when returning to center or spinning
        const springX = targetX.get();
        const springY = targetY.get();
        const springZ = targetZ.get();

        // Lerp current position to spring target for smooth transition
        const lerpSpeed = isSpinning ? 4 : 8;

        if (!isSpinning) {
          currentPosition.current.x = THREE.MathUtils.lerp(
            currentPosition.current.x,
            springX,
            delta * lerpSpeed
          );
          currentPosition.current.y = THREE.MathUtils.lerp(
            currentPosition.current.y,
            springY,
            delta * lerpSpeed
          );
          currentPosition.current.z = THREE.MathUtils.lerp(
            currentPosition.current.z,
            springZ,
            delta * lerpSpeed
          );
        }

        groupRef.current.position.set(
          currentPosition.current.x,
          currentPosition.current.y,
          currentPosition.current.z
        );
      }

      // Always apply rotation
      groupRef.current.rotation.set(
        0,
        baseRotationY.current + totalSpinRotation.current,
        0
      );
    }
  });

  return (
    <group
      ref={groupRef}
      scale={SCENE_CONFIG.SHIRT.modelScale}
      onPointerDown={handlePointerDown}
    >
      <group>
        <primitive object={nodes.Root || Object.values(nodes)[0]} />
        {/* Render the SkinnedMesh properly */}
        {Object.entries(nodes).map(([name, node]) => {
          if (node instanceof THREE.SkinnedMesh) {
            return (
              <skinnedMesh
                key={name}
                geometry={node.geometry}
                material={node.material}
                skeleton={node.skeleton}
                castShadow
                receiveShadow
              />
            );
          }
          return null;
        })}
      </group>
    </group>
  );
};
