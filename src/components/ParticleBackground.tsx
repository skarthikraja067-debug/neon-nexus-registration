import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleNetwork = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const particleCount = 80;
  const connectionDistance = 2.5;
  
  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    
    return { positions: pos, velocities: vel };
  }, []);
  
  const linePositions = useMemo(() => {
    return new Float32Array(particleCount * particleCount * 6);
  }, []);
  
  useFrame((state) => {
    if (!particlesRef.current || !linesRef.current) return;
    
    const positionAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = positionAttr.array as Float32Array;
    
    // Update particle positions
    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3] += velocities[i * 3];
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      posArray[i * 3 + 2] += velocities[i * 3 + 2];
      
      // Boundary check
      if (Math.abs(posArray[i * 3]) > 7.5) velocities[i * 3] *= -1;
      if (Math.abs(posArray[i * 3 + 1]) > 7.5) velocities[i * 3 + 1] *= -1;
      if (Math.abs(posArray[i * 3 + 2]) > 4) velocities[i * 3 + 2] *= -1;
    }
    
    positionAttr.needsUpdate = true;
    
    // Update connections
    const lineArray = linePositions;
    let lineIndex = 0;
    
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = posArray[i * 3] - posArray[j * 3];
        const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
        const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (dist < connectionDistance) {
          lineArray[lineIndex++] = posArray[i * 3];
          lineArray[lineIndex++] = posArray[i * 3 + 1];
          lineArray[lineIndex++] = posArray[i * 3 + 2];
          lineArray[lineIndex++] = posArray[j * 3];
          lineArray[lineIndex++] = posArray[j * 3 + 1];
          lineArray[lineIndex++] = posArray[j * 3 + 2];
        }
      }
    }
    
    // Fill remaining with zeros
    for (let i = lineIndex; i < lineArray.length; i++) {
      lineArray[i] = 0;
    }
    
    const lineAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    (lineAttr.array as Float32Array).set(linePositions);
    lineAttr.needsUpdate = true;
    
    // Gentle rotation
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    linesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });
  
  return (
    <>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#00ffff"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount * particleCount * 2}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.15}
        />
      </lineSegments>
    </>
  );
};

const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <ParticleNetwork />
      </Canvas>
      <div className="absolute inset-0 cyber-grid pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
    </div>
  );
};

export default ParticleBackground;
