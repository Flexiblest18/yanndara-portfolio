
"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Center,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

// Start downloading the model early.
// The model will be cached and reused by both Canvas instances.
useGLTF.preload("/models/profile.glb");

function Model() {
  const { scene } = useGLTF("/models/profile.glb");

  // Create an independent Object3D copy for each Canvas.
  const clonedScene = useMemo(() => {
    return scene.clone(true);
  }, [scene]);

  // Automatically adjust model size.
  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = box.getSize(new THREE.Vector3());

    const maxDimension = Math.max(
      size.x,
      size.y,
      size.z
    );

    return maxDimension > 0 ? 3.5 / maxDimension : 1;
  }, [clonedScene]);

  return (
    <Center>
      <primitive object={clonedScene} scale={scale} />
    </Center>
  );
}

function LoadingModel() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color="#38bdf8"
        wireframe
      />
    </mesh>
  );
}

export default function ObjProfile() {
  return (
    <div className="h-full w-full overflow-hidden">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 45,
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <ambientLight intensity={1.5} />

        <directionalLight
          position={[3, 4, 5]}
          intensity={2}
        />

        <pointLight
          position={[-3, -2, 2]}
          intensity={1}
          color="#38bdf8"
        />

        <Suspense fallback={<LoadingModel />}>
          <Model />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={false}
          rotateSpeed={1}
        />
      </Canvas>
    </div>
  );
}
