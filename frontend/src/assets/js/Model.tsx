import { ObjectMap, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three"; // Dùng tạm three, tối sẽ đọc doc chuyển sang fiber
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Object3DEventMap } from "three";
import { easing } from "maath"





/**
 * các object CÓ THỂ ĐIỀU CHỈNH cần đặt tên bắt đầu bằng 'object'
 *
 * ví dụ: object.001, object.002, ...
 *
 * bởi vì tên của object là DUY NHẤT nên không xảy ra trùng nhau
 * tên object cũng là key để get nodes trong threejs/fiber
 *
 */
export default function Model(props: { _id: string; model: GLTF & ObjectMap }) {
  // tải lên model
  const gltf = props.model;
  // mixer cho animation
  const mixer = useRef<THREE.AnimationMixer>();
  // set cua chatgpt
  const { set, gl } = useThree();
  // danh sách object có thể thay đổi thuộc tính
  const [objectList, setObjectList] = useState<
    THREE.Object3D<Object3DEventMap>[]
  >([]);



  useEffect(() => {
    if (gltf) {
      // tạo 1 list temp
      const newObjectList: THREE.Object3D<Object3DEventMap>[] = [];

      // Loop qua nodes ( object ) trong file gltf
      Object.keys(gltf.nodes).forEach((key) => {
        if (key.startsWith("object")) {
          newObjectList.push(gltf.nodes[key]); // thêm vào list nếu file bắt đầu bằng object
        }
      });
      // Update the state with the new list
      setObjectList((prevList) => [...prevList, ...newObjectList]);

      console.log(newObjectList); // Log the new objects added
    }

    gl.setClearColor(new THREE.Color(0xffffff)); // Set background thành màu trắng
  }, [gltf, gl]);


  useEffect(() => {
    if (gltf.cameras.length > 0) {
      const gltfCamera = gltf.cameras[0] as THREE.PerspectiveCamera; // Ép kiểu của gpt
      set({ camera: gltfCamera }); // Gán camera từ GLTF vào scene hiện tại
    }

    // Set animation cho GLTF (nếu có)
    if (gltf.animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(gltf.scene);
      gltf.animations.forEach((clip: any) => {
        mixer.current?.clipAction(clip).play();
      });
    }

    gltf.animations.forEach((clip) => {
      console.log(clip.tracks.map((track) => track.name)); // Xem animation track đang áp dụng cho object nào
    });


    // dừng animation
    return () => {
      mixer.current?.stopAllAction();
    };
  }, [gltf, set]); // use effect sẽ chạy nếu có sự thay đổi gltf hoặc set

  // Chạy animation mỗi frame
  useFrame((_, delta) => {
    mixer.current?.update(delta);
  });

  return (
    <>
      {/* ánh sáng */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 10, -5]}
        intensity={10}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* load model từ danh sách những model có thể thay đổi */}
      {objectList.map((obj, index) => (
        <primitive key={index} object={obj} />
      ))}

      {/* dùng chuột để điều khiển góc nhìn. sau này sẽ xoá đi hoặc sử dụng debug only*/}
      <OrbitControls />
    </>
  );
}
