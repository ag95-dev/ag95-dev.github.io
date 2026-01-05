import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  const { positions, connections } = useMemo(() => {
    const positions: number[] = [];
    const connections: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];
    const nodeCount = 60;
    const nodes: THREE.Vector3[] = [];
    
    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 10;
      positions.push(x, y, z);
      nodes.push(new THREE.Vector3(x, y, z));
    }
    
    // Create connections between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < 4) {
          connections.push({ start: nodes[i], end: nodes[j] });
        }
      }
    }
    
    return { positions, connections };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Neural nodes */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={new Float32Array(positions)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#22d3ee"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      
      {/* Connection lines */}
      {connections.slice(0, 80).map((conn, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                conn.start.x, conn.start.y, conn.start.z,
                conn.end.x, conn.end.y, conn.end.z
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#06b6d4" transparent opacity={0.2} />
        </line>
      ))}
    </group>
  );
}

function FloatingOrb({ position, color, scale }: { position: [number, number, number]; color: string; scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function DataStreams() {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });
  
  return (
    <group ref={ref}>
      {[...Array(8)].map((_, i) => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI) / 4]}>
          <torusGeometry args={[6 + i * 0.5, 0.02, 8, 100]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.15} />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#22d3ee" />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color="#8b5cf6" />
      
      <Stars radius={50} depth={50} count={2000} factor={4} fade speed={1} />
      
      <NeuralNetwork />
      <DataStreams />
      
      <FloatingOrb position={[-6, 2, -3]} color="#06b6d4" scale={0.8} />
      <FloatingOrb position={[7, -1, -4]} color="#8b5cf6" scale={0.6} />
      <FloatingOrb position={[0, 4, -6]} color="#22d3ee" scale={0.5} />
      <FloatingOrb position={[-4, -3, -2]} color="#a855f7" scale={0.4} />
    </>
  );
}

export function FuturisticBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
