import { Center, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Group, TorusKnotGeometry } from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { createSculpture, createSculptureWithGeometry } from "shader-park-core";
import { spCode, spText } from "./spCode";
import "./App.css";
import "./index.css";

const Torus = () => {
  const scene = useRef<Group>(null!);
  // const [hovered, setHovered] = useState(false);

  let geometry = new TorusKnotGeometry(10, 3, 192, 96);
  geometry.computeBoundingSphere();
  geometry.center();

  let params = { time: 0 };

  let torus = createSculptureWithGeometry(geometry, spCode, () => ({
    time: params.time,
  }));

  useFrame(() => {
    if (!scene.current) return;
    scene.current.rotation.y += 0.04;
    scene.current.rotation.x += 0.04;
    scene.current.rotation.z += 0.04;
    params.time += 0.01;
  });

  return (
    <group ref={scene}>
      <primitive object={torus} position={[0, 0, 0]} scale={[0.1, 0.1, 0.1]} />
    </group>
  );
};

const Text = () => {
  const loader = new FontLoader();
  const three = useThree();

  let params = { time: 0 };

  useFrame(() => {
    params.time += 0.01;
  });

  loader.load("/font.typeface.json", function (font) {
    let geometry = new TextGeometry("MooNRakeR", {
      font: font,
      size: 1,
      height: 0.1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.1,
      bevelOffset: 0,
      bevelSegments: 1,
    });
    geometry.computeBoundingSphere();
    geometry.center();

    let mesh = createSculptureWithGeometry(geometry, spText, () => ({
      time: params.time,
      size: 15,
      gyroidSteps: 0.01,
    }));

    mesh.position.set(0, 2.3, 0);

    const group = new Group();
    group.add(mesh);

    three.scene.add(group);
  });

  return (
    <>
      <group position={[0, 2, 0]}></group>
    </>
  );
};

function App() {
  return (
    <Canvas>
      <OrbitControls />
      <Center>
        <Torus />
        <Text />
      </Center>
    </Canvas>
  );
}

export default App;
