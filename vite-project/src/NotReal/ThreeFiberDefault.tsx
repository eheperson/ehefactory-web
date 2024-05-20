import { Canvas, events, useFrame } from "@react-three/fiber";
import React, { useRef, useState } from 'react';
import * as THREE from 'three';



interface TorusKnotProps {
    position: [number, number, number];
    size: [number, number, number, number, number];
    color: string;
    offset: number;
}

const TorusKnot: React.FC<TorusKnotProps & { offset: number }> = ({ position, size, color, offset }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state, delta) => {
        meshRef.current!.rotation.x += delta*0.7;
        meshRef.current!.rotation.y += delta*0.7;
        meshRef.current!.position.z = Math.sin(state.clock.elapsedTime + offset) * 1.5;
    });
    return (
        <mesh ref={meshRef} position={position} >
            <torusKnotGeometry args={size} />
            <meshStandardMaterial color={color} wireframe/>
        </mesh>
    );
}



const ThreeFiberDefault = () => {
    return (  
        <>
            <Canvas camera={{ position: [0, 0, 10] }}>
                <directionalLight position={[0, 0, 2]} intensity={1} />
                <ambientLight intensity={0.8} />
                <group position={[0,0,-2]}>
                    <TorusKnot position={[0, 0, 0]} size={[5,0.5,1000,100,4]} color="red" offset={0} />
                </group>
            </Canvas>
        </>
    );
}
 
export default ThreeFiberDefault;