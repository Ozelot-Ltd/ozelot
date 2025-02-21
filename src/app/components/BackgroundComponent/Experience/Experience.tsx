import { useReducer, useMemo } from "react";
import { Environment } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import { Connector } from "./physics/Connector";
import { Pointer } from "./physics/Pointer";
import { SceneLighting, EnvironmentLighting } from "./scene/Lighting";
import { useShuffleConfig } from "../../../hooks/useShuffleConfig";
import { TransmissionModel } from "./models/TransmissionModel";

export const Experience = () => {
  const [accent, click] = useReducer(
    (state: number) => ++state % useShuffleConfig.accents.length,
    0
  );
  const connectors = useMemo(() => useShuffleConfig.shuffle(accent), [accent]);

  return (
    <>
      <color attach="background" args={["#ebebeb"]} />
      <SceneLighting />

      <Physics gravity={[0, 0, 0]} debug={false}>
        <Pointer />
        {connectors.map((props, i) => (
          <Connector key={i} {...props} />
        ))}
        <Connector position={[10, 10, 5]}>
          <TransmissionModel />
        </Connector>
      </Physics>

      <EffectComposer enableNormalPass={false} multisampling={8}>
        <N8AO distanceFalloff={1} aoRadius={1} intensity={4} />
      </EffectComposer>
      <Environment resolution={256}>
        <EnvironmentLighting />
      </Environment>
    </>
  );
};
