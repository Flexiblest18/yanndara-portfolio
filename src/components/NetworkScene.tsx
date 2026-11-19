'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, OrbitControls, Stars } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function NetworkMesh() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const nodes = useMemo(() => Array.from({ length: 42 }, (_, i) => {
    const phi = Math.acos(-1 + (2 * i) / 42);
    const theta = Math.sqrt(42 * Math.PI) * phi;
    return new THREE.Vector3(
      2.55 * Math.cos(theta) * Math.sin(phi),
      1.85 * Math.sin(theta) * Math.sin(phi),
      1.15 * Math.cos(phi),
    );
  }), []);
  const links = useMemo(() => nodes.flatMap((a, i) =>
    nodes.slice(i + 1).map((b, j) => ({ a, b, key: `${i}-${i + j + 1}` }))
      .filter(({ a, b }) => a.distanceTo(b) < 1.05)
  ), [nodes]);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.032;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.16) * 0.075;
    }
    if (core.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.055;
      core.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={group}>
      {links.map(({ a, b, key }) => <Line key={key} points={[a, b]} color="#0ea5e9" transparent opacity={0.2} lineWidth={0.65} />)}
      {nodes.map((point, i) => (
        <Float key={i} speed={0.55 + (i % 5) * 0.12} floatIntensity={0.14} rotationIntensity={0.12}>
          <mesh position={point}>
            <sphereGeometry args={[i % 7 === 0 ? 0.055 : 0.026, 12, 12]} />
            <meshBasicMaterial color={i % 7 === 0 ? '#bae6fd' : '#38bdf8'} />
          </mesh>
        </Float>
      ))}
      <mesh ref={core}>
        <icosahedronGeometry args={[0.23, 1]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.75} />
      </mesh>
      <mesh rotation={[Math.PI / 2.5, 0.2, 0.3]}>
        <torusGeometry args={[3.05, 0.006, 8, 140]} />
        <meshBasicMaterial color="#0284c7" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export default function NetworkScene() {
  return (
    <div className="pointer-events-auto absolute inset-0 -z-0 opacity-80" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 7.1], fov: 46 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.45} />
        <Stars radius={38} depth={22} count={650} factor={2} saturation={0} fade speed={0.25} />
        <NetworkMesh />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate autoRotate autoRotateSpeed={0.1} />
      </Canvas>
    </div>
  );
}
