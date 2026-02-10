"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { MeshTransmissionMaterial, Float, Environment } from "@react-three/drei"
import * as THREE from "three"

function Gem() {
    const mesh = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (!mesh.current) return
        const t = state.clock.getElapsedTime()

        // Slow, elegant rotation
        mesh.current.rotation.x = Math.cos(t / 4) / 2
        mesh.current.rotation.y = Math.sin(t / 4) / 2
        mesh.current.position.y = Math.sin(t / 1.5) / 10
    })

    return (
        <group>
            <mesh ref={mesh}>
                <icosahedronGeometry args={[1, 0]} />
                <MeshTransmissionMaterial
                    backside
                    samples={16}
                    resolution={512}
                    transmission={1}
                    roughness={0.0}
                    clearcoat={1}
                    clearcoatRoughness={0.0}
                    thickness={3.5}
                    ior={1.5}
                    chromaticAberration={1} // Adds a nice "gem" dispersion effect
                    anisotropy={20}
                    distortion={0.5}
                    distortionScale={0.5}
                    temporalDistortion={0.2}
                    color="#fbbf24" // Subtle golden tint
                    background={new THREE.Color("#ffffff")}
                />
            </mesh>
        </group>
    )
}

export function FloatingGem() {
    return (
        <div className="absolute right-0 top-0 h-[300px] w-[300px] pointer-events-none md:h-[500px] md:w-[500px] opacity-40 mix-blend-multiply">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={2} />
                <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                    <Gem />
                </Float>
                <Environment preset="studio" />
            </Canvas>
        </div>
    )
}
