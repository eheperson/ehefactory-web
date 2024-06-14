import * as THREE from "three";
import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import FBOParticles from "./FBOParticles";

import simulationVertexShader from '../assets/shaders/FBOParticlesChaotic.vs';
import simulationFragmentShader from '../assets/shaders/FBOParticlesChaotic.fs';

const getRandomData = (width: number, height: number): Float32Array => {
  // we need to create a vec4 since we're passing the positions to the fragment shader
  // data textures need to have 4 components, R, G, B, and A
  const length = width * height * 4
  const data = new Float32Array(length);

  for (let i = 0; i < length; i++) {
    const stride = i * 4;

    const distance = Math.sqrt(Math.random()) * 2000.0;
    const theta = THREE.MathUtils.randFloatSpread(360);
    const phi = THREE.MathUtils.randFloatSpread(360);

    data[stride] = distance * Math.sin(theta) * Math.cos(phi)
    data[stride + 1] = distance * Math.sin(theta) * Math.sin(phi);
    data[stride + 2] = distance * Math.cos(theta);
    data[stride + 3] = 1.0; // this value will not have any impact
  }
  return data;
}

const useSimulationMaterial = (size: number) => {
  const material = useMemo(() => {
    const positionsTexture = new THREE.DataTexture(
      getRandomData(size, size),
      size,
      size,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    positionsTexture.needsUpdate = true;
    const simulationUniforms = {
      positions: { value: positionsTexture },
      uFrequency: { value: 0.25 },
      uTime: { value: 0 },
    };

    return new THREE.ShaderMaterial({
      uniforms: simulationUniforms,
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    });
  }, [size])
  return material;
}

const FBOParticlesChaotic: React.FC = () => {
  return (
    <div style={{ width: 600, height: 600, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Canvas camera={{ position: [1.5, 1.5, 2.5] }}>
        <ambientLight intensity={10} />
        <FBOParticles
          // particleColorClose={new THREE.Vector3(0.34, 0.53, 0.96)}
          // particleColorFar={new THREE.Vector3(0.34, 0.53, 0.96)}
          // particleColorFar={new THREE.Vector3(0.97, 0.70, 0.45)}
          particleRadius={5}
          particleSize={128}
          simulationHook={useSimulationMaterial}
        />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default FBOParticlesChaotic;
