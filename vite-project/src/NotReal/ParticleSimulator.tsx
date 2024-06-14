import * as THREE from "three";
import { useMemo, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";

import vertexShader from '../assets/shaders/ParticleSimulator.vs';
import fragmentShader from '../assets/shaders/ParticleSimulator.fs';

interface CustomGeometryParticlesProps {
  count: number;
}

const CustomGeometryParticles: React.FC<CustomGeometryParticlesProps> = (props) => {
  const { count } = props;
  const radius = 5;

  const points = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const distance = Math.sqrt(Math.random()) * radius;
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      let x = distance * Math.sin(theta) * Math.cos(phi)
      let y = distance * Math.sin(theta) * Math.sin(phi);
      let z = distance * Math.cos(theta);

      positions.set([x, y, z], i * 3);
    }

    return positions;
  }, [count]);

  const uniforms = useMemo(() => ({
    uTime: {
      value: 0.0
    },
    uRadius: {
      value: radius
    }
  }), [])

  useFrame((state) => {
    const { clock } = state;

    if (points.current && points.current.material instanceof THREE.ShaderMaterial) {
      points.current.material.uniforms.uTime.value = clock.elapsedTime;
    }

    // console.log("uTime  :", uniforms.uTime.value);
    // console.log("uRadius  :", uniforms.uRadius.value);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3} />
      </bufferGeometry>
      <shaderMaterial
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms} />
    </points>
  );
};

const ParticleSimulator: React.FC = () => {
  return (
    <div style={{ width: 600, height: 600, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Canvas camera={{ position: [2.0, 2.0, 2.0] }}>
        <ambientLight intensity={0.5} />
        <CustomGeometryParticles count={128 * 128} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default ParticleSimulator;