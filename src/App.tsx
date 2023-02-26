import {
  Box,
  Center,
  OrbitControls,
  Text3D,
  useMatcapTexture,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Group } from "three";
import "./App.css";
import "./index.css";

const Cube = () => {
  const scene = useRef<Group>(null!);
  const [hovered, setHovered] = useState(false);
  useFrame(() => {
    if (!scene.current) return;
    scene.current.rotation.y += 0.04;
    scene.current.rotation.x += 0.04;
    scene.current.rotation.z += 0.04;
  });

  return (
    <group ref={scene}>
      <Box
        onPointerEnter={() => setHovered(!hovered)}
        onPointerLeave={() => setHovered(!hovered)}
        scale={hovered ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      >
        <meshLambertMaterial
          attach="material"
          color={hovered ? "green" : "white"}
        />
      </Box>
      <directionalLight intensity={hovered ? 0.9 : 0.3} position={[0, 2, 3]} />
    </group>
  );
};

const Text = () => {
  // Matcaps from https://github.com/nidorx/matcaps
  const [matcapTexture] = useMatcapTexture("46804D_CBE9AC_90B57C_95D38F", 256);
  return (
    <>
      <group position={[0, 2, 0]}>
        <Center top>
          <Text3D
            font={"/font.typeface.json"}
            size={0.75}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.04}
            bevelSize={0.04}
            bevelOffset={0}
            bevelSegments={5}
          >
            MooNRakeR
            <meshMatcapMaterial matcap={matcapTexture} />
          </Text3D>
        </Center>
      </group>
      <group position={[0, -2, 0]}>
        <Center bottom>
          <Text3D
            font={"/font.typeface.json"}
            size={0.75}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.04}
            bevelSize={0.04}
            bevelOffset={0}
            bevelSegments={5}
          >
            WeB DeV
            <meshMatcapMaterial matcap={matcapTexture} />
          </Text3D>
        </Center>
      </group>
    </>
  );
};

function App() {
  return (
    <Canvas>
      <OrbitControls />
      <directionalLight intensity={0.5} />
      <Cube />
      <Text />
    </Canvas>
  );
}

export default App;
