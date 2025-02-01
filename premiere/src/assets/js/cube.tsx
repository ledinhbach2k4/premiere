/**
 * cần đọc thêm về three fiber ;-;
 * 
 * 
 */

import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useEffect, useRef } from "react";
import * as THREE from "three"; // dùng tạm three tối sẽ đọc doc chuyển sang fiber

export default function Model(props: { _id: string; vidProps: {} }) {
  // load model
  const gltf = useLoader(GLTFLoader, `/gltf/${props._id}.gltf`);
  const mixer = useRef<THREE.AnimationMixer | null>(null);

  // set cam
  const { camera } = useThree();

  /**
   * 
   * 
   *   set camera của scene thành camera có sẵn trong file gltf
   *   đồng thời load animation cho model
   * 
   * 
  */
  useEffect(() => {
    if (gltf.cameras && gltf.cameras.length > 0) {
      const gltfCamera = gltf.cameras[0];
      if (gltfCamera) {
        camera.copy(gltfCamera);
        camera.updateProjectionMatrix(); // Update the projection matrix
      } else {
        console.warn("No valid camera found in the GLTF model.");
      }
    } else {
      console.warn("No cameras found in the GLTF model.");
    }

    // set animation cho gltf
    mixer.current = new THREE.AnimationMixer(gltf.scene);
    gltf.animations.forEach((clip) => {
      mixer.current?.clipAction(clip).play(); // Play each animation clip
    });

    return () => {
      // Clean up the mixer on unmount
      mixer.current?.stopAllAction();
    };
  }, [gltf, camera]);

  // This will run on every frame
  useFrame((state, delta) => {
    if (mixer.current) {
      mixer.current.update(delta); 
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
      <group scale={[0.5, 0.5, 0.5]}> {/* Adjust the scale values as needed */}
        <primitive object={gltf.scene} />
      </group>
    </>
  );
}
