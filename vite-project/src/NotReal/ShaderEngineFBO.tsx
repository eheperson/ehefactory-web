import * as THREE from 'three';
import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import FBOParticles from "./FBOParticles";

import vertexShader from '../assets/shaders/ShaderEngineFBO.vs';
import fragmentShader from '../assets/shaders/ShaderEngineFBO.fs';

const geometrySize = 200.0;

const getRandomDataSphere = (width: number, height: number) => {
  // we need to create a vec4 since we're passing the positions to the fragment shader
  // data textures need to have 4 components, R, G, B, and A
  const length = width * height * 4
  const data = new Float32Array(length);

  for (let i = 0; i < length; i++) {
    const stride = i * 4;

    const distance = Math.sqrt((Math.random())) * geometrySize;
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

    data[stride] = (Math.random() - 0.5) * geometrySize;
    data[stride + 1] = (Math.random() - 0.5) * geometrySize;
    data[stride + 2] = (Math.random() - 0.5) * geometrySize;
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
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });
  }, [size])
  return material;
};

const ShaderEngineFBO = () => {
  return (
    <div style={{ width: 600, height: 600, display: "flex", justifyContent: "center", alignItems: "center" }}>

      <Canvas
        camera={{ position: [1.5, 1.5, 2.5] }}>
        <ambientLight intensity={10} />
        <FBOParticles
          particleColorClose={new THREE.Vector3(0.34, 0.53, 0.96)}
          particleColorFar={new THREE.Vector3(0.34, 0.53, 0.96)}
          // particleColorFar={new THREE.Vector3(0.97, 0.70, 0.45)}
          particleRadius={4}
          particleSize={128 * 4}
          simulationHook={useSimulationMaterial}
        />
        {/* <axesHelper /> */}
        <OrbitControls />
      </Canvas>
    </div>
  );
};
export default ShaderEngineFBO;
