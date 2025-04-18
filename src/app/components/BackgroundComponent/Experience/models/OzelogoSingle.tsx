import * as THREE from 'three';
import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

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
 * Optimized Ozelogo component that maintains the parent-child relationship
 * between the Glass and Logo meshes while sharing geometry across instances
 */
export function OzelogoSingle(props: { scale?: number }) {
  const { scale = 0.8 } = props;
  const { nodes } = useGLTF('/models/Ozelogo.glb') as GLTFResult;

  // const transmissionConfig = useControls(
  //   'Glass',
  //   {
  //     transmission: { value: 1, min: 0, max: 1 },
  //     thickness: { value: 0.66, min: 0, max: 2 },
  //     roughness: { value: 0.1, min: 0, max: 1 },
  //     ior: { value: 1.5, min: 1, max: 2.3 },
  //     samples: { value: 3, min: 1, max: 32, step: 1 },
  //     resolution: { value: 1024, min: 64, max: 2048, step: 64 },
  //     chromaticAberration: { value: 0.03, min: 0, max: 1 },
  //     anisotropicBlur: { value: 1, min: 0, max: 1 },
  //     distortion: { value: 0, min: 0, max: 1 },
  //     distortionScale: { value: 0, min: 0, max: 1 },
  //     temporalDistortion: { value: 0.0, min: 0, max: 1 },
  //     clearcoat: { value: 0.369, min: 0, max: 1 },
  //   },
  //   { collapsed: false }
  // );

  // Memoize geometries to avoid unnecessary re-creation
  const memoizedGeometries = useMemo(
    () => ({
      glassGeometry: nodes.Glass.geometry,
      logoGeometry: nodes.Logo.geometry,
    }),
    [nodes]
  );

  return (
    <group scale={scale}>
      {/* Glass mesh */}
      <mesh
        geometry={memoizedGeometries.glassGeometry}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="white"
          metalness={0.1}
          roughness={1}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />

        {/* Logo mesh - nested inside the glass as in the original model */}
        {/* <mesh
          geometry={memoizedGeometries.logoGeometry}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={1}
            roughness={0.8}
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh> */}
      </mesh>
    </group>
  );
}

// Preload the model
useGLTF.preload('/models/Ozelogo.glb');
