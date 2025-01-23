import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Scene(props) {
  const gltf = useLoader(GLTFLoader, '/test.gltf');

  const ref = useRef();

  // This will run on every frame
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01; // Adjust the speed of rotation here
    }
  });

  return (
    <mesh ref={ref} {...props}>
      {/* Your model geometry and material go here */}
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );

  return <primitive object={gltf.scene} />
}

