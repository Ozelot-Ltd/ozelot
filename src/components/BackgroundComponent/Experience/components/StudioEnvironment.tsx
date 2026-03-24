import { Environment, Lightformer } from '@react-three/drei';
import { ENVIRONMENT_CONFIG } from '../config/environmentConfig';

export const StudioEnvironment = () => {
  return (
    <Environment
      background={false}
      resolution={ENVIRONMENT_CONFIG.resolution}
      frames={ENVIRONMENT_CONFIG.frames}
    >
      {ENVIRONMENT_CONFIG.LIGHTFORMERS.map((lightformer, index) => (
        <Lightformer
          key={index}
          form={lightformer.form}
          intensity={lightformer.intensity}
          color={lightformer.color}
          position={lightformer.position}
          scale={lightformer.scale}
          target={lightformer.target}
        />
      ))}
    </Environment>
  );
};
