import * as THREE from 'three';
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { useThree } from '@react-three/fiber';

type GLTFResult = GLTF & {
  nodes: {
    Glass: THREE.Mesh;
    Logo: THREE.Mesh;
  };
  materials: {
    Glass: THREE.MeshStandardMaterial;
    Logo: THREE.MeshStandardMaterial;
  };
};

/**
 * Optimized Ozelogo component with enhanced white metallic appearance
 */
export function OzelogoSingle(props: {
  scale?: number;
  rotation?: [number, number, number];
}) {
  const { scale = 0.8, rotation = [0, 0, 0] } = props;
  const { nodes } = useGLTF('/models/Ozelogo.glb') as GLTFResult;
  const { scene } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  // Create an environment map if not already in the scene
  useMemo(() => {
    if (!scene.environment) {
      const pmremGenerator = new THREE.PMREMGenerator(
        new THREE.WebGLRenderer({ antialias: true })
      );
      pmremGenerator.compileEquirectangularShader();

      // Create a simple environment with bright areas
      const envMap = pmremGenerator.fromScene(new THREE.Scene()).texture;
      scene.environment = envMap;
    }
  }, [scene]);

  // Optional: Subtle rotation for better light reflection
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  // Memoize geometries to avoid unnecessary re-creation
  const memoizedGeometries = useMemo(
    () => ({
      glassGeometry: nodes.Glass.geometry,
      logoGeometry: nodes.Logo.geometry,
    }),
    [nodes]
  );

  return (
    <group
      ref={groupRef}
      scale={scale}
      rotation={rotation as [x: number, y: number, z: number]}
    >
      {/* Main glass/metal part */}
      <mesh
        geometry={memoizedGeometries.glassGeometry}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0.9}
          roughness={0.15}
          envMapIntensity={1.5}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          reflectivity={1}
          emissive="#303030"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Logo part - uncomment and adjust if needed */}
      <mesh geometry={memoizedGeometries.logoGeometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={1}
          roughness={0.2}
          envMapIntensity={1.2}
          clearcoat={0.5}
          clearcoatRoughness={0.1}
          emissive="#404040"
          emissiveIntensity={0.15}
        />
      </mesh>
    </group>
  );
}
useGLTF.preload('/models/Ozelogo.glb');
