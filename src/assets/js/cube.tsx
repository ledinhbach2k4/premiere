import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Scene(props) {
  const gltf = useLoader(GLTFLoader, "/test.gltf");

  const ref = useRef();

  // This will run on every frame
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01; // Adjust the speed of rotation here
    }
  });

  return (
    <>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight
          position={[-5, 5, 5]}
          intensity={0.8}
          decay={2}
          distance={10}
        />
      <mesh ref={ref} {...props.props}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </>
  );
}
