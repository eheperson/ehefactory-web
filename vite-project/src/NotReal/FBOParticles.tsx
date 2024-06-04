import * as THREE from "three";
import React, { useMemo, useRef, useState } from "react";
import { OrbitControls, useFBO } from "@react-three/drei";
import { Canvas, useFrame, createPortal } from "@react-three/fiber";


import vertexShader from '../assets/fboParticlesVertexShader.glsl';
import fragmentShader from '../assets/fboParticlesFragmentShader.glsl';

interface FBOParticlesProps {
    particleSize: number;
    simulationHook: (size: number) => THREE.ShaderMaterial;
}

const FBOParticles: React.FC<FBOParticlesProps> = ({ particleSize, simulationHook }) => {
    const [size, setSize] = useState(particleSize);
    // const size = particleSize;
    const simulationMaterial = simulationHook(particleSize);
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

export default FBOParticles;