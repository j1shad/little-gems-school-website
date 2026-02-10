"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Instances, Instance, Environment, Float } from "@react-three/drei"
import * as THREE from "three"

function Particles({ count = 40, temp = new THREE.Object3D() }) {
    const mesh = useRef<THREE.InstancedMesh>(null)

    // Generate random particles
    const particles = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            position: [
                (Math.random() - 0.5) * 15, // Spread x
                (Math.random() - 0.5) * 10, // Spread y
                (Math.random() - 0.5) * 10, // Spread z
            ],
            scale: Math.random() * 0.5 + 0.2,
            speed: Math.random() * 0.2,
        }))
    }, [count])

    // Animation frame
    useFrame((state) => {
        if (!mesh.current) return
        const t = state.clock.getElapsedTime()

        // Iterate through particles to animate them
        particles.forEach((particle, i) => {
            // Gentle floating motion
            const { position, scale, speed } = particle

            // Calculate floating position based on time
            const y = position[1] + Math.sin(t * speed + i) * 0.5

            temp.position.set(position[0], y, position[2])
            temp.scale.setScalar(scale)
            temp.updateMatrix()

            mesh.current!.setMatrixAt(i, temp.matrix)
        })

        mesh.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial
                color="#fbbf24" // Amber/Gold color for "Gems"
                emissive="#fbbf24"
                emissiveIntensity={0.5}
                roughness={0.5}
                transparent
                opacity={0.6}
            />
        </instancedMesh>
    )
}

export function FloatingParticles() {
    return (
        <div className="absolute inset-0 pointer-events-none z-0 opacity-50">
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Particles />
                <Environment preset="city" />
            </Canvas>
        </div>
    )
}
