import { useRef, useMemo, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

// Mouse position hook
function useMousePosition() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  return mousePos;
}

// Shared mouse ref for Three.js components
const mouseRef = { x: 0, y: 0 };

function MouseTracker() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  return null;
}

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  
  const { positions, connections } = useMemo(() => {
    const positions: number[] = [];
    const connections: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];
    const nodeCount = 80;
    const nodes: THREE.Vector3[] = [];
    
    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 25;
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 12;
      positions.push(x, y, z);
      nodes.push(new THREE.Vector3(x, y, z));
    }
    
    // Create connections between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < 4.5) {
          connections.push({ start: nodes[i], end: nodes[j] });
        }
      }
    }
    
    return { positions, connections };
  }, []);

  useFrame((state) => {
    // Smooth mouse following
    targetRotation.current.x = mouseRef.y * 0.3;
    targetRotation.current.y = mouseRef.x * 0.3;
    
    if (groupRef.current) {
      groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.02;
      groupRef.current.rotation.y += (targetRotation.current.y + state.clock.elapsedTime * 0.03 - groupRef.current.rotation.y) * 0.02;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Neural nodes - Cyan color */}
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
          size={0.2}
          color="#00e5ff"
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>
      
      {/* Connection lines - Purple/Cyan gradient effect */}
      {connections.slice(0, 100).map((conn, i) => (
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
          <lineBasicMaterial 
            color={i % 2 === 0 ? "#00e5ff" : "#a855f7"} 
            transparent 
            opacity={0.25} 
          />
        </line>
      ))}
    </group>
  );
}

function FloatingOrb({ position, color, scale, speed = 1 }: { position: [number, number, number]; color: string; scale: number; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPos = useRef(position);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Mouse-reactive floating
      const mouseInfluence = 0.5;
      meshRef.current.position.x = initialPos.current[0] + mouseRef.x * mouseInfluence;
      meshRef.current.position.y = initialPos.current[1] + Math.sin(state.clock.elapsedTime * speed + position[0]) * 0.8 + mouseRef.y * mouseInfluence;
      meshRef.current.position.z = initialPos.current[2];
      
      // Subtle rotation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          transparent
          opacity={0.5}
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
      ref.current.rotation.z = state.clock.elapsedTime * 0.08 + mouseRef.x * 0.2;
      ref.current.rotation.x = mouseRef.y * 0.1;
    }
  });
  
  return (
    <group ref={ref}>
      {[...Array(10)].map((_, i) => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI) / 5]}>
          <torusGeometry args={[5 + i * 0.6, 0.015, 8, 120]} />
          <meshBasicMaterial 
            color={i % 2 === 0 ? "#00e5ff" : "#a855f7"} 
            transparent 
            opacity={0.12 + (i * 0.01)} 
          />
        </mesh>
      ))}
    </group>
  );
}

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 200; i++) {
      positions.push(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15
      );
    }
    return new Float32Array(positions);
  }, []);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = mouseRef.y * 0.1;
      ref.current.position.x = mouseRef.x * 0.5;
      ref.current.position.y = mouseRef.y * 0.5;
    }
  });
  
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={200}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#e879f9"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <MouseTracker />
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={0.4} color="#00e5ff" />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color="#a855f7" />
      <pointLight position={[0, 5, 5]} intensity={0.2} color="#e879f9" />
      
      <Stars radius={60} depth={50} count={2500} factor={4} fade speed={0.8} />
      
      <NeuralNetwork />
      <DataStreams />
      <FloatingParticles />
      
      {/* Fusion colored orbs */}
      <FloatingOrb position={[-7, 3, -4]} color="#00e5ff" scale={0.9} speed={0.8} />
      <FloatingOrb position={[8, -2, -5]} color="#a855f7" scale={0.7} speed={1.2} />
      <FloatingOrb position={[0, 5, -7]} color="#00e5ff" scale={0.6} speed={1} />
      <FloatingOrb position={[-5, -4, -3]} color="#e879f9" scale={0.5} speed={1.4} />
      <FloatingOrb position={[6, 4, -6]} color="#a855f7" scale={0.5} speed={0.9} />
      <FloatingOrb position={[-3, 0, -8]} color="#00e5ff" scale={0.4} speed={1.1} />
    </>
  );
}

export function FuturisticBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 55 }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      
      {/* CSS overlay effects for fusion glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[hsl(185_100%_50%/0.08)] rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[hsl(270_80%_60%/0.1)] rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[hsl(300_70%_55%/0.05)] rounded-full blur-[120px]" />
      </div>
    </div>
  );
}