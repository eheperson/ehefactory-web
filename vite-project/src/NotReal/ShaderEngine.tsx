import { OrbitControls, Html, Tube } from "@react-three/drei";
import { Canvas, useFrame} from "@react-three/fiber";
import { useMemo, useRef, Suspense } from "react";
import { MathUtils } from "three";
import * as THREE from 'three';
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'


import vertexShader from '../assets/engineVertexShader.glsl';
import fragmentShader from '../assets/engineFragmentShader.glsl';

const Blob = () => {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<THREE.Mesh>(null);
  const hoverRef = useRef<boolean>(false);

  const uniforms = useMemo(
    () => ({
      u_intensity: {
        value: 0.5,
      },
      u_time: {
        value: 0.0,
      },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    const material = meshRef.current?.material as THREE.ShaderMaterial;
    if (material) {
      material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();
      material.uniforms.u_intensity.value = MathUtils.lerp(
        material.uniforms.u_intensity.value,
        hoverRef.current ? 0.5 : 0.0,
        0.02
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      scale={1}
      onPointerOver={() => (hoverRef.current = true)}
      onPointerOut={() => (hoverRef.current = false)}
    >
      <torusGeometry args={[4, 2, 32, 200]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
};


const ShaderEngine = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 10] }}
      gl={{
        powerPreference: "high-performance",
        alpha: false,
        antialias: false,
        stencil: false,
        depth: false
      }}
      >
      {/* <color attach="background" args={["#050505"]} />
      <fog color="#161616" attach="fog" near={8} far={30} /> */}
      <ambientLight intensity={10} />
      <directionalLight position={[-1, 2, 2]} intensity={4} />
      <Suspense fallback={<Html center>Loading.</Html>}>
        <Blob />
      </Suspense>
      {/* <axesHelper /> */}
      <OrbitControls />
      {/* <EffectComposer>
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        <DepthOfField focusDistance={0.5} focalLength={0.02} bokehScale={0.1} height={500} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
        <Noise opacity={0.02} />
      </EffectComposer> */}
    </Canvas>
  );
};

export default ShaderEngine;
