import { Canvas, events, useFrame } from "@react-three/fiber";
import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { MeshWobbleMaterial, OrbitControls, useHelper } from "@react-three/drei";
import { Leva, useControls } from "leva"

interface TorusKnotProps {
    position: [number, number, number];
    size: [number, number, number, number, number];
    color: string;
    offset: number;
}

const TorusKnot: React.FC<TorusKnotProps & { offset: number }> = ({ position, size, color, offset }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state, delta) => {
        // meshRef.current!.rotation.x += delta*0.7;
        // meshRef.current!.rotation.y += delta*0.7;
        // meshRef.current!.position.z = Math.sin(state.clock.elapsedTime + offset)*0.7;
    });
    return (
        <mesh ref={meshRef} position={position} >
            <torusKnotGeometry args={size} />
            {/* <meshStandardMaterial color={color}/> */}
            <MeshWobbleMaterial color={color} speed={1} factor={2} />
        </mesh>
    );
}


const Scene: React.FC = () => {
    const directionalLightRef = useRef<THREE.DirectionalLight | null>(null);
    useHelper(directionalLightRef as React.MutableRefObject<THREE.Object3D>, THREE.DirectionalLightHelper, 0.5, 0x00ffff);

    const { lightColor, lightIntensity } = useControls({
        lightColor: '#0000ff',
        lightIntensity: {
            value: 0.5,
            min: 0,
            max: 5,
        },
    });

    const {color, radius, diameter, radialSegments, tubularSegments, p} = useControls({
        color: '#0000ff',
        radius: {
            value: 1.9,
            min: 0.1,
            max: 10,
            step: 0.1,
        },
        diameter: {
            value: 0.1,
            min: 0,
            max: 10,
            step: 0.01,
        },
        radialSegments: {
            value: 10000,
            min: 10,
            max: 10000,
            step: 10,
        },
        tubularSegments: {
            value: 97,
            min: 3,
            max: 100,
            step: 1,
        },
        p: {
            value: 45,
            min: 1,
            max: 100,
            step: 1,
        },
    });

    return (  
        <>
            <directionalLight
            position={[0, 0, 2]} 
            intensity={lightIntensity} 
            ref={directionalLightRef}
            color={lightColor}/>
            <ambientLight intensity={0.4} />
            <group position={[0,0,0]}>
                <TorusKnot
                position={[0, 0, 0]}
                size={[radius,diameter,radialSegments,tubularSegments,p]}
                color={color}
                offset={0} />
            </group>
            <OrbitControls enableZoom={true} enableRotate={true}/> 
        </>
    );
}

const ThreeFiberDreiLeva: React.FC = () => {

    return (
        <>
            <div className="leva__panel"> 
                <Leva fill />
            </div>
            <Canvas camera={{ position: [0, 0, 5] }}> 
                <Scene />
            </Canvas>
        </>
    );
}
 
export default ThreeFiberDreiLeva;