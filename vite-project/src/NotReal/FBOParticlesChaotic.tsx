import { OrbitControls, useFBO } from "@react-three/drei";
import { Canvas, useFrame, extend, createPortal } from "@react-three/fiber";
import React, { useMemo, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";


import vertexShader from '../assets/fboParticlesChaoticVertexShader.glsl';
import fragmentShader from '../assets/fboParticlesChaoticFragmentShader.glsl';
import simulationVertexShader from '../assets/fboSimulationChaoticVertexShader.glsl';
import simulationFragmentShader from '../assets/fboSimulationChaoticFragmentShader.glsl';


const getRandomData = (width:number, height:number) : Float32Array => {
  // we need to create a vec4 since we're passing the positions to the fragment shader
  // data textures need to have 4 components, R, G, B, and A
  const length = width * height * 4 
  const data = new Float32Array(length);
    
  for (let i = 0; i < length; i++) {
    const stride = i * 4;

    const distance = Math.sqrt(Math.random()) * 2.0;
    const theta = THREE.MathUtils.randFloatSpread(360); 
    const phi = THREE.MathUtils.randFloatSpread(360); 

    data[stride] =  distance * Math.sin(theta) * Math.cos(phi)
    data[stride + 1] =  distance * Math.sin(theta) * Math.sin(phi);
    data[stride + 2] =  distance * Math.cos(theta);
    data[stride + 3] =  1.0; // this value will not have any impact
  }
  return data;
}

const useSimulationMaterial = (size:number)  => { 
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
}

const FBOParticles: React.FC = () => {

  const size = 750;
  const simulationMaterial = useSimulationMaterial(size);
  const points = useRef<THREE.Points>(null);
  
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1);
  const positions = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]);
  const uvs = new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]);

  const renderTarget = useFBO(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    stencilBuffer: false,
    type: THREE.FloatType,
  });

  
  const particlesPosition = useMemo(() => {
    const length = size * size;
    const particles = new Float32Array(length * 3);
    for (let i = 0; i < length; i++) {
      let i3 = i * 3;
      particles[i3 + 0] = (i % size) / size; // No scaling factor
      particles[i3 + 1] = Math.floor(i / size) / size; // Use Math.floor for integer division
    }
    console.log("Particle positions length:", particles.length);
    return particles;
  }, [size]);
  
  const uniforms = useMemo(() => ({
    uPositions: {
      value: null,
    }
  }), []);

  useFrame((state) => {
    const { gl, clock } = state;

    gl.setRenderTarget(renderTarget);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    if (points.current && renderTarget.texture) {
      (points.current.material as THREE.ShaderMaterial).uniforms.uPositions.value = renderTarget.texture;
    }

    if (simulationMaterial) {
      simulationMaterial.uniforms.uTime.value = clock.elapsedTime;
    }

    console.log("Particle positions:", particlesPosition.length); 
    console.log("Elapsed time :", clock.elapsedTime);
  });
  return (
    <>
      {createPortal(
        <mesh>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-uv"
              count={uvs.length / 2}
              array={uvs}
              itemSize={2}
            />
          </bufferGeometry>
          <primitive object={simulationMaterial} attach="material" />
        </mesh>,
        scene
      )}
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
        />
      </points>
    </>
  );
};


const FBOParticlesChaotic: React.FC = () => {
  return (
    <Canvas camera={{ position: [1.5, 1.5, 2.5] }}>
      <ambientLight intensity={10} />
      <FBOParticles />
      <OrbitControls />
    </Canvas>
  );
};

export default FBOParticlesChaotic;
