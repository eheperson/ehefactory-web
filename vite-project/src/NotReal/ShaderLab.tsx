import React, {useRef, Suspense} from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import vertexShader from '../assets/labVertexShader.glsl';
import fragmentShader from '../assets/labFragmentShader.glsl';
import imageFile from '../assets/flyd-xcG3Yg6iCQg-unsplash.jpg';

const TestPlane: React.FC = () => {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const [image] = useLoader(THREE.TextureLoader, [imageFile]);


  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  const uniforms = React.useMemo(() => ({
    uColor: {value: new THREE.Color(0.8, 1.0, 0.4)},
    uTime: {value: 0.0},
    uTexture: {value: image},
  }),[]);

  return (
    <mesh>
      <planeGeometry attach="geometry" args={[0.4, 0.6, 32, 32]} />
      <pointLight position={[10, 10, 10]} />
      <shaderMaterial
        ref={shaderRef}
        wireframe={false}
        attach="material"
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

const Scene: React.FC = () => {
  return (
    <>
      <Canvas
        camera={{fov:10}}
        style={{ width: "100vw", height: "100vh" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[-1, 2, 2]} intensity={4} />
        <Suspense fallback={null}>
          <TestPlane />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </>
  );
}

const ShaderLab: React.FC = () => {
  return (
    <Scene />
  );
};

export default ShaderLab;
