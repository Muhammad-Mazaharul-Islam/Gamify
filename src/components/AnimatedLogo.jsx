import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import logo from '../assets/logo.png';

const Sphere = ({ position, color, size }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.position.y += Math.sin(time * 2 + position[0] * 10) * 0.002;
      
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.3, 1.3, 1.3), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={hovered ? "#00FFD1" : color}
        emissiveIntensity={hovered ? 0.5 : 0.1}
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
  );
};

const Logo3DStructure = () => {
  const groupRef = useRef();
  const { camera, mouse } = useThree();
  const [logoData, setLogoData] = useState(null);

  useEffect(() => {
    // Load and process logo image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = logo;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const size = 64;
      canvas.width = size;
      canvas.height = size;

      ctx.drawImage(img, 0, 0, size, size);
      const imageData = ctx.getImageData(0, 0, size, size);
      setLogoData(imageData);
    };
  }, []);

  const spheres = useMemo(() => {
    if (!logoData) return [];

    const data = logoData.data;
    const size = logoData.width;
    const sphereArray = [];
    const gap = 3;
    const depth = 10;

    for (let y = 0; y < size; y += gap) {
      for (let x = 0; x < size; x += gap) {
        const index = (y * size + x) * 4;
        const alpha = data[index + 3];

        if (alpha > 100) {
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];

          // Create multiple layers for 3D depth
          for (let z = 0; z < depth; z++) {
            const posX = (x / size - 0.5) * 8;
            const posY = -(y / size - 0.5) * 8;
            const posZ = (z / depth - 0.5) * 3;

            const opacity = 1 - (z / depth) * 0.7;
            
            sphereArray.push({
              position: [posX, posY, posZ],
              color: new THREE.Color(
                (r / 255) * opacity,
                (g / 255) * opacity,
                (b / 255) * opacity
              ),
              size: 0.08 - (z / depth) * 0.03,
            });
          }
        }
      }
    }

    return sphereArray;
  }, [logoData]);

  useFrame((state) => {
    if (groupRef.current) {
      // Auto rotate
      groupRef.current.rotation.y += 0.003;
      
      // Mouse interaction
      const targetRotationX = mouse.y * 0.3;
      const targetRotationY = mouse.x * 0.3;
      
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.05;
    }
  });

  if (!logoData) return null;

  return (
    <group ref={groupRef}>
      {spheres.map((sphere, index) => (
        <Sphere key={index} {...sphere} />
      ))}
      
      {/* Ambient particles for effect */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={200}
            array={new Float32Array(
              Array.from({ length: 200 * 3 }, () => (Math.random() - 0.5) * 20)
            )}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#00FFD1"
          transparent
          opacity={0.3}
          sizeAttenuation
        />
      </points>
    </group>
  );
};

const AnimatedLogo = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00FFD1" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} color="#00FFD1" />
        
        <Logo3DStructure />
      </Canvas>
    </div>
  );
};

export default AnimatedLogo;
