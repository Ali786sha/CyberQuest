import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Environment } from "@react-three/drei";
import * as THREE from "three";

interface LockMeshProps {
  unlocked: boolean;
  shaking: boolean;
}

const LockBody = () => (
  <RoundedBox args={[2, 1.8, 0.8]} radius={0.15} position={[0, -0.3, 0]}>
    <meshStandardMaterial color="#0a1628" metalness={0.8} roughness={0.2} />
  </RoundedBox>
);

const Shackle = ({ unlocked }: { unlocked: boolean }) => {
  const ref = useRef<THREE.Group>(null);
  const targetRot = unlocked ? -Math.PI / 4 : 0;
  const targetY = unlocked ? 0.6 : 0;

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, targetRot, 0.05);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, 0.8 + targetY, 0.05);
  });

  return (
    <group ref={ref} position={[0, 0.8, 0]}>
      {/* Left pillar */}
      <mesh position={[-0.5, 0.2, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
        <meshStandardMaterial color={unlocked ? "#00ff88" : "#00e5ff"} metalness={0.9} roughness={0.1} emissive={unlocked ? "#00ff88" : "#00e5ff"} emissiveIntensity={0.3} />
      </mesh>
      {/* Right pillar */}
      <mesh position={[0.5, 0.2, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
        <meshStandardMaterial color={unlocked ? "#00ff88" : "#00e5ff"} metalness={0.9} roughness={0.1} emissive={unlocked ? "#00ff88" : "#00e5ff"} emissiveIntensity={0.3} />
      </mesh>
      {/* Top arc */}
      <mesh position={[0, 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.12, 16, 32, Math.PI]} />
        <meshStandardMaterial color={unlocked ? "#00ff88" : "#00e5ff"} metalness={0.9} roughness={0.1} emissive={unlocked ? "#00ff88" : "#00e5ff"} emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
};

const Keyhole = () => (
  <group position={[0, -0.4, 0.41]}>
    <mesh>
      <circleGeometry args={[0.15, 32]} />
      <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.5} />
    </mesh>
    <mesh position={[0, -0.15, 0]}>
      <planeGeometry args={[0.1, 0.2]} />
      <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.5} />
    </mesh>
  </group>
);

const LockScene = ({ unlocked, shaking }: LockMeshProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const shakeRef = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.3;
    if (shaking) {
      shakeRef.current += delta * 40;
      groupRef.current.position.x = Math.sin(shakeRef.current) * 0.1;
    } else {
      shakeRef.current = 0;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 0, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      <LockBody />
      <Shackle unlocked={unlocked} />
      <Keyhole />
    </group>
  );
};

const Lock3D = ({ unlocked, shaking }: LockMeshProps) => (
  <div className="w-full h-48 sm:h-64">
    <Canvas camera={{ position: [0, 0.5, 4], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={1} color="#00ff88" />
      <pointLight position={[-3, -1, 2]} intensity={0.5} color="#00e5ff" />
      <LockScene unlocked={unlocked} shaking={shaking} />
      <Environment preset="night" />
    </Canvas>
  </div>
);

export default Lock3D;
