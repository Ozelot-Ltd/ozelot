import { useReducer, useMemo } from 'react';
import { Environment } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { EffectComposer, N8AO, Noise } from '@react-three/postprocessing';
import { Connector } from './physics/Connector';
import { Pointer } from './physics/Pointer';
import { SceneLighting, EnvironmentLighting } from './scene/Lighting';
import { useShuffleConfig } from '../../../hooks/useShuffleConfig';
import { OzelogoSingle } from './models/OzelogoSingle';
import * as THREE from 'three';

// Define a type that extends ShuffleItem with the properties that Connector component uses
interface ConnectorItem {
  color: string;
  roughness: number;
  accent?: boolean;
  position?: [number, number, number];
  scale?: number | [number, number, number];
}

// Let's go back to the original approach but optimize it
export const Experience = () => {
  const [accent] = useReducer(
    (state: number) => ++state % useShuffleConfig.accents.length,
    0
  );

  // Get the connectors configuration
  const connectors = useMemo(() => {
    // Create random positions for each connector
    const randFloat = THREE.MathUtils.randFloatSpread;
    return useShuffleConfig.shuffle(accent).map((item) => ({
      ...item,
      position: [randFloat(5), randFloat(5), randFloat(5) + 5] as [
        number,
        number,
        number,
      ],
    })) as ConnectorItem[];
  }, [accent]);

  return (
    <>
      <color attach="background" args={['#ebebeb']} />
      <SceneLighting />

      <Physics gravity={[0, 0, 0]} debug={false}>
        <Pointer />

        {/* Render connectors with individual OzelogoSingle components */}
        {connectors.map((props, i) => (
          <Connector key={i} {...props}>
            <OzelogoSingle scale={0.6} />
          </Connector>
        ))}
      </Physics>

      {/* Reduce effect quality for performance */}
      <EffectComposer enableNormalPass={false} multisampling={4}>
        <N8AO distanceFalloff={1} aoRadius={1} intensity={2} />
        <Noise opacity={0.05} />
      </EffectComposer>

      {/* Lower resolution for performance */}
      <Environment resolution={64}>
        <EnvironmentLighting />
      </Environment>
    </>
  );
};
