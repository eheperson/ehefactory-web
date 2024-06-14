import * as THREE from "three";
import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import FBOParticles from "./FBOParticles";

import simulationVertexShader from '../assets/shaders/FBOParticlesGeometric.vs';
import simulationFragmentShader from '../assets/shaders/FBOParticlesGeometric.fs';

const getRandomDataSphere = (width: number, height: number) => {
  // we need to create a vec4 since we're passing the positions to the fragment shader
  // data textures need to have 4 components, R, G, B, and A
  const length = width * height * 4
  const data = new Float32Array(length);

  for (let i = 0; i < length; i++) {
    const stride = i * 4;

    const distance = Math.sqrt((Math.random())) * 2.0;
    const theta = THREE.MathUtils.randFloatSpread(360);
    const phi = THREE.MathUtils.randFloatSpread(360);

    data[stride] = distance * Math.sin(theta) * Math.cos(phi)
    data[stride + 1] = distance * Math.sin(theta) * Math.sin(phi);
    data[stride + 2] = distance * Math.cos(theta);
    data[stride + 3] = 1.0; // this value will not have any impact
  }

  return data;
}

const getRandomDataBox = (width: number, height: number) => {
  var len = width * height * 4;
  var data = new Float32Array(len);

  for (let i = 0; i < data.length; i++) {
    const stride = i * 4;

    data[stride] = (Math.random() - 0.5) * 2.0;
    data[stride + 1] = (Math.random() - 0.5) * 2.0;
    data[stride + 2] = (Math.random() - 0.5) * 2.0;
    data[stride + 3] = 1.0;
  }
  return data;
};

const useSimulationMaterial = (size: number) => {
  const material = useMemo(() => {
    const positionsTextureA = new THREE.DataTexture(
      getRandomDataSphere(size, size),
      size,
      size,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    positionsTextureA.needsUpdate = true;

    const positionsTextureB = new THREE.DataTexture(
      getRandomDataBox(size, size),
      size,
      size,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    positionsTextureB.needsUpdate = true;

    const simulationUniforms = {
      positionsA: { value: positionsTextureA },
      positionsB: { value: positionsTextureB },
      uFrequency: { value: 0.5 },
      uTime: { value: 0 },
    };

    return new THREE.ShaderMaterial({
      uniforms: simulationUniforms,
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    });
  }, [size])
  return material;
};

const FBOParticlesGeometric: React.FC = () => {
  return (
    <div style={{ width: 600, height: 600, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Canvas camera={{ position: [1.5, 1.5, 2.5] }}>
        <ambientLight intensity={10} />
        <FBOParticles
          particleRadius={5}
          particleSize={750}
          simulationHook={useSimulationMaterial}
        />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default FBOParticlesGeometric;
