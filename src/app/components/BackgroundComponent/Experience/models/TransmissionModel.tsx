import { MeshTransmissionMaterial } from "@react-three/drei";
import { CubeModel } from "./CubeModel";

export function TransmissionModel() {
  return (
    <CubeModel>
      <MeshTransmissionMaterial
        clearcoat={1}
        thickness={0.1}
        anisotropicBlur={0.1}
        chromaticAberration={0.1}
        samples={8}
        resolution={512}
      />
    </CubeModel>
  );
}
