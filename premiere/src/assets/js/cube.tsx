import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three"; // Dùng tạm three, tối sẽ đọc doc chuyển sang fiber

export default function Model(props: { _id: string; vidProps: {} }) {
  // Load model
  const gltf = useGLTF(`/gltf/${props._id}.gltf`);
  // const gltf = useGLTF(`/test1.gltf`);
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const { set } = useThree();

  useEffect(() => {
    if (gltf.cameras.length > 0) {
      const gltfCamera = gltf.cameras[0] as THREE.PerspectiveCamera; // Ép kiểu
      gltfCamera.manual = true; // Để React Three Fiber không ghi đè camera
      set({ camera: gltfCamera }); // Gán camera từ GLTF vào scene
    }

    // Set animation cho GLTF (nếu có)
    if (gltf.animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(gltf.scene);
      gltf.animations.forEach((clip) => {
        mixer.current?.clipAction(clip).play();
      });
    }

    return () => {
      mixer.current?.stopAllAction();
    };
  }, [gltf, set]);

  // Chạy animation mỗi frame
  useFrame((_, delta) => {
    mixer.current?.update(delta);
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
      <pointLight position={[-5, 5, 5]} intensity={0.8} decay={2} distance={10} />
      
      <group scale={[1, 1, 1]}>
        <primitive object={gltf.scene} />
      </group>

      <OrbitControls />
    </>
  );
}
