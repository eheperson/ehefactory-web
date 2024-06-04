import * as THREE from 'three';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";

interface CubeProps {
    position: [number, number, number];
    size: [number, number, number];
    color: string;
    offset: number;
}

const Cube: React.FC<CubeProps & { offset: number }> = ({ position, size, color, offset }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state, delta) => {
        meshRef.current!.rotation.x += delta;
        meshRef.current!.rotation.y -= delta;
        meshRef.current!.rotation.z += delta;
        meshRef.current!.position.x = Math.sin(state.clock.elapsedTime + offset) * 3;
        meshRef.current!.position.y = Math.cos(state.clock.elapsedTime + offset) * 3;
        meshRef.current!.position.z = Math.sin(state.clock.elapsedTime + offset) * 3;
    });
    return (
        <mesh ref={meshRef} position={position}>
            <boxGeometry args={size} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
}

interface SphereProps {
    position: [number, number, number];
    size: [number, number, number];
    color: string;
    offset: number;
}

const Sphere: React.FC<SphereProps & { offset: number }> = ({ position, size, color, offset }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state, delta) => {
        meshRef.current!.rotation.x += delta;
        meshRef.current!.rotation.y -= delta;
        meshRef.current!.rotation.z += delta;
        meshRef.current!.position.x = Math.sin(state.clock.elapsedTime + offset) * 3;
        meshRef.current!.position.y = Math.cos(state.clock.elapsedTime + offset) * 3;
        meshRef.current!.position.z = Math.sin(state.clock.elapsedTime + offset) * 3;
    });
    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={size} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
}

interface TorusProps {
    position: [number, number, number];
    size: [number, number, number, number];
    color: string;
    offset: number;
}
export const Torus: React.FC<TorusProps & { offset: number }> = ({ position, size, color, offset }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state, delta) => {
        meshRef.current!.rotation.x += delta;
        meshRef.current!.rotation.y -= delta;
        meshRef.current!.rotation.z += delta;
        meshRef.current!.position.x = Math.sin(state.clock.elapsedTime + offset) * 3;
        meshRef.current!.position.y = Math.cos(state.clock.elapsedTime + offset) * 3;
        meshRef.current!.position.z = Math.sin(state.clock.elapsedTime + offset) * 3;
    });
    return (
        <mesh ref={meshRef} position={position}>
            <torusGeometry args={size} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
}

interface TorusKnotProps {
    position: [number, number, number];
    size: [number, number, number, number, number];
    color: string;
    offset: number;
}

const TorusKnot: React.FC<TorusKnotProps & { offset: number }> = ({ position, size, color, offset }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state, delta) => {
        meshRef.current!.rotation.x += delta;
        meshRef.current!.rotation.y -= delta;
        meshRef.current!.rotation.z += delta;
        meshRef.current!.position.x = Math.sin(state.clock.elapsedTime + offset) * 3;
        meshRef.current!.position.y = Math.cos(state.clock.elapsedTime + offset) * 3;
        meshRef.current!.position.z = Math.sin(state.clock.elapsedTime + offset) * 3;
    });
    return (
        <mesh ref={meshRef} position={position}>
            <torusKnotGeometry args={size} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
}

interface SphereMeshProps {
    position: [number, number, number];
    size: [number, number, number];
    color: string;
}

const SphereMesh: React.FC<SphereMeshProps> = ({ position, size, color }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    useFrame((state, delta) => {
        const speed = isHovered ? delta : 0;
        meshRef.current!.rotation.x += speed;
        meshRef.current!.rotation.y -= speed;
        meshRef.current!.rotation.z += speed;

        meshRef.current!.position.z = isHovered ? Math.sin(state.clock.elapsedTime) * 3 : 0;

    });

    return (
        <mesh ref={meshRef} position={position}
            onPointerEnter={(event) => { event.stopPropagation(), setIsHovered(true) }}
            onPointerLeave={() => setIsHovered(false)}
            onClick={() => setIsClicked(!isClicked)}
            scale={isClicked ? 2 : 1}>
            <sphereGeometry args={size} />
            <meshStandardMaterial color={isHovered ? "orange" : color} wireframe />
        </mesh>
    );
}

const ThreeFiberBasics = () => {
    return (
        <>
            <Canvas camera={{ position: [0, 0, 10] }}>
                <directionalLight position={[0, 0, 2]} intensity={1} />
                <ambientLight intensity={0.8} />
                <group position={[0, 0, 0]}>
                    <Cube position={[-3, 3, 0]} size={[1, 1, 1]} color="red" offset={-2} />
                    <Sphere position={[3, 3, 0]} size={[1, 30, 30]} color="green" offset={-1} />
                    <Torus position={[-3, -3, 0]} size={[1, 0.5, 30, 30]} color="blue" offset={1} />
                    <TorusKnot position={[3, -3, 0]} size={[1, 0.4, 30, 30, 2]} color="yellow" offset={2} />
                </group>
                <SphereMesh position={[0, 0, 0]} size={[1.5, 30, 30]} color="white" />
            </Canvas>
        </>
    );
}

export default ThreeFiberBasics;