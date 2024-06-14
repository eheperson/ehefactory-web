import * as THREE from 'three';
import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from "@react-three/fiber";

import vertexShader from '../assets/shaders/Generative2D.vs';
import fragmentShader from '../assets/shaders/Generative2D.fs';

const TestPlane: React.FC = () => {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const planeRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  const uniforms = React.useMemo(() => ({
    // TODO: this need to be dynamic, update it when canvas is resized :uResolution
    uResolution: { value: new THREE.Vector2(600, 600) },
    uTime: { value: 0.0 },
  }), []);

  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
    console.log("THREE size.width: ", size.width, "THREE size.height: ", size.height)
  });

  return (
    <mesh ref={planeRef}>
      <planeGeometry attach="geometry" args={[2, 2, 32, 32]} />
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
  // State to store window dimensions
  const maxSize = 600;
  const scale = 1.; // %100 of window;

  const [canvasSize, setCanvasSize] = useState(Math.min(window.innerWidth, maxSize) * scale);

  const handleResize = () => {
    const newSize: number = Math.min(window.innerWidth, maxSize) * scale;
    setCanvasSize(newSize);
    console.log("windowSize: ", window.innerWidth);
    console.log("canvasSizee: ", newSize);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ width: canvasSize, height: canvasSize, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Canvas
        camera={{ fov: 22, aspect: 1, far: 1000, near: 0.002 }}
        style={{ border: "2px solid rgba(100, 100, 100, 1.0)" }}>
        <ambientLight intensity={1.0} />
        <directionalLight position={[-1, 2, 2]} intensity={4} />
        <Suspense fallback={null}>
          <TestPlane />
        </Suspense>
      </Canvas>
    </div>
  );
};

const ShaderLab: React.FC = () => {
  return (
    <Scene />
  );
};

export default ShaderLab;
