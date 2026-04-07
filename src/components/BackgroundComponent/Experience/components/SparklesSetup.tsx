import { Sparkles } from "@react-three/drei";
import { SPARKLES_CONFIG } from "../config/sparklesConfig";

interface SparklesSetupProps {
  type: "shirt" | "background";
}

export const SparklesSetup = ({ type }: SparklesSetupProps) => {
  const config =
    type === "shirt" ? SPARKLES_CONFIG.SHIRT : SPARKLES_CONFIG.BACKGROUND;

  return (
    <Sparkles
      count={config.count}
      size={config.size}
      speed={config.speed}
      opacity={config.opacity}
      color={config.color}
      scale={config.scale}
      position={config.position}
      noise={config.noise}
    />
  );
};
