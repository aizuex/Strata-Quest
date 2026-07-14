import React, { useMemo, useRef, useState, useLayoutEffect, useEffect } from 'react';
import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera, RoundedBox, PresentationControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CubeProps } from '../types';
import stratalogoAsset from './stratalogo.png';

gsap.registerPlugin(ScrollTrigger);

const PHYSICS_FLOOR_Y = -5.0;

interface PhysicsState {
    active: boolean;
    velocities: THREE.Vector3[];
    offsets: THREE.Vector3[]; 
}

const WireframeShape: React.FC<{ position: [number, number, number], rotation?: [number, number, number], scale?: number, type: 'box' | 'sphere' | 'icosahedron' }> = ({ position, rotation = [0,0,0], scale = 1, type }) => {
    const ref = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);
    
    useLayoutEffect(() => {
        const mm = gsap.matchMedia();
        
        mm.add("(min-width: 1px)", () => {
             if (groupRef.current) {
                gsap.to(groupRef.current.position, {
                    y: -15,
                    scrollTrigger: {
                        trigger: "#hero-section",
                        start: "top top",
                        end: "bottom center",
                        scrub: 1
                    }
                });
                
                gsap.to(groupRef.current.scale, {
                    x: 0, y: 0, z: 0,
                    scrollTrigger: {
                        trigger: "#hero-section",
                        start: "top top",
                        end: "bottom center",
                        scrub: 1
                    }
                });
             }
        });
        
        return () => mm.revert();
    }, []);

    useFrame((state, delta) => {
        if(ref.current) {
            ref.current.rotation.x += delta * 0.2;
            ref.current.rotation.y += delta * 0.3;
        }
    });
    
    const geometry = useMemo(() => {
        switch (type) {
            case 'sphere': return new THREE.SphereGeometry(1, 16, 16);
            case 'icosahedron': return new THREE.IcosahedronGeometry(1, 0);
            case 'box': default: return new THREE.BoxGeometry(1, 1, 1);
        }
    }, [type]);
    return (
        <group ref={groupRef} position={position} rotation={new THREE.Euler(...rotation)} scale={scale}>
            <mesh ref={ref} geometry={geometry}>
                <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.08} />
            </mesh>
        </group>
    )
}

// Crystalline Network Node (Icosahedron)
const NetworkNode: React.FC<CubeProps & { innerRef?: React.Ref<THREE.Group>, onPointerDown?: (e: ThreeEvent<PointerEvent>) => void }> = ({ 
  position, 
  rotation = [0, 0, 0], 
  color, 
  scale = 1,
  innerRef,
  onPointerDown
}) => {
  const localRef = useRef<THREE.Group>(null);
  const ref = (innerRef || localRef) as React.MutableRefObject<THREE.Group>;
  const [hovered, setHovered] = useState(false);

  const baseMaterial = useMemo(() => new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness: 0.15,
      metalness: 0.85,
      emissive: new THREE.Color(color).multiplyScalar(0.2),
  }), [color]);

  useFrame((state, delta) => {
      if (ref.current) {
          const targetScale = hovered ? scale * 1.2 : scale;
          ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 10);
      }
  });

  return (
    <group 
        ref={ref} 
        position={position} 
        rotation={new THREE.Euler(...rotation)}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'grab'; }}
        onPointerOut={(e) => { setHovered(false); document.body.style.cursor = 'auto'; }}
        onPointerDown={(e) => { 
            if (onPointerDown) onPointerDown(e);
            document.body.style.cursor = 'grabbing'; 
        }}
        onPointerUp={() => { document.body.style.cursor = 'grab'; }}
    >
      <mesh material={baseMaterial}>
         <icosahedronGeometry args={[0.38, 0]} />
      </mesh>
    </group>
  );
};

const HeroFloatingNodes = () => {
    const groupRef = useRef<THREE.Group>(null);
    const { viewport } = useThree();
    
    const isMobile = viewport.width < 7;
    
    const pos1: [number, number, number] = isMobile ? [1.2, 3.5, 0] : [-2.5, 1.5, 2];
    const pos2: [number, number, number] = isMobile ? [-1.2, -3.5, 0] : [-6, -2.5, 2];
    const pos3: [number, number, number] = isMobile ? [1.2, -1.5, -2] : [-3.5, -2.8, 2.5];

    useLayoutEffect(() => {
        if(!groupRef.current) return;
        
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1px)", () => {
             gsap.to(groupRef.current!.position, {
                y: 10, 
                scrollTrigger: {
                    trigger: "#hero-section",
                    start: "top top",
                    end: "bottom center",
                    scrub: 1
                }
            });
        });
        return () => mm.revert();
    }, [isMobile]);

    return (
        <group ref={groupRef}>
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <NetworkNode position={pos1} color="#8B5CF6" scale={0.7} rotation={[0.5, 0.5, 0]} />
            </Float>
            <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.4}>
                <NetworkNode position={pos2} color="#111827" scale={0.6} rotation={[-0.2, 0.4, 0.2]} />
            </Float>
             <Float speed={1.3} rotationIntensity={0.6} floatIntensity={0.4}>
                <NetworkNode position={pos3} color="#00E5FF" scale={0.5} rotation={[0.1, -0.2, 0.1]} />
            </Float>
        </group>
    )
}

const StrataOrbits = () => {
    const mainGroupRef = useRef<THREE.Group>(null);
    const quantumCoreRef = useRef<THREE.Mesh>(null);
    const coreDiskRef = useRef<THREE.Mesh>(null);
    const quantumCoreGroupRef = useRef<THREE.Group>(null);
    const cubesRefs = useRef<THREE.Group[]>([]);
    const spinningRingRefs = useRef<THREE.Group[]>([]);
    
    const tl2Ref = useRef<gsap.core.Timeline | null>(null);
    const idleTimeline = useRef<gsap.core.Timeline | null>(null);
    
    const physics = useRef<PhysicsState>({ active: false, velocities: [], offsets: [] });
    const dragRef = useRef<number | null>(null);

    const { viewport, mouse, camera } = useThree();
    const [showLabels, setShowLabels] = useState(true);
    const [logoTexture, setLogoTexture] = useState<THREE.Texture | null>(null);

    // Scroll listener to toggle showLabels based on scroll height to avoid projection calculations on scroll
    useEffect(() => {
        const handleScroll = () => {
            setShowLabels(window.scrollY < 350);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Asynchronous texture load to prevent Suspense layout recalculations triggers
    useEffect(() => {
        const loader = new THREE.TextureLoader();
        loader.load(stratalogoAsset, (tex) => {
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.anisotropy = 16;
            tex.needsUpdate = true;
            setLogoTexture(tex);
        });
    }, []);

    // Concentric Orbit rings data with labels
    const ringsData = useMemo(() => [
        { id: 'ring-0', radius: 2.2, color: '#00E5FF', tilt: [0.7, 0.1, 0.2] as [number, number, number], speed: 0.8, label: 'AI Layer' },
        { id: 'ring-1', radius: 1.8, color: '#8B5CF6', tilt: [-0.5, 0.3, 0.4] as [number, number, number], speed: -0.6, label: 'Consensus Ledger' },
        { id: 'ring-2', radius: 1.4, color: '#D946EF', tilt: [0.3, -0.4, -0.3] as [number, number, number], speed: 1.0, label: 'Liquidity Core' },
        { id: 'ring-3', radius: 1.0, color: '#FFFFFF', tilt: [0.1, 0.5, -0.2] as [number, number, number], speed: -0.5, label: 'Infrastructure' }
    ], []);

    const nodesData = useMemo(() => {
        const nodes = [];
        const colors = ['#00E5FF', '#8B5CF6', '#FFFFFF', '#D946EF', '#94A3B8', '#F1F5F9'];
        
        // Dynamic labels for node names matching IT/Blockchain infra
        const nodeLabels: Record<string, string> = {
            '0-0': 'Validator #1',
            '0-2': 'Tensor Core',
            '1-1': 'Solidity VM',
            '1-3': 'MPC Vault',
            '2-0': 'AI Model v4',
            '2-2': 'Liquidity Pool',
            '3-1': 'Docker Host'
        };

        for (let ringIndex = 0; ringIndex < 4; ringIndex++) {
            const ring = ringsData[ringIndex];
            for (let i = 0; i < 4; i++) {
                const angle = (i * Math.PI) / 2;
                const colorIndex = (ringIndex + i) % colors.length;
                const key = `${ringIndex}-${i}`;
                
                nodes.push({
                    id: `node-${ringIndex}-${i}`,
                    ringIndex,
                    angle,
                    color: colors[colorIndex],
                    orbitPosition: new THREE.Vector3(),
                    nodeLabel: nodeLabels[key] || null
                });
            }
        }
        return nodes;
    }, [ringsData]);

    useEffect(() => {
        const totalItems = 20;
        for(let i=0; i<totalItems; i++) {
            physics.current.velocities.push(new THREE.Vector3(0,0,0));
            physics.current.offsets.push(new THREE.Vector3(0,0,0));
        }
    }, []);

    useEffect(() => {
        idleTimeline.current?.play();

        const st = ScrollTrigger.create({
            trigger: "#details-section",
            start: "center center", 
            onEnter: () => {
                 idleTimeline.current?.pause();
            },
            onLeaveBack: () => {
                 idleTimeline.current?.play();
            }
        });
        return () => st.kill();
    }, []);
    
    useEffect(() => {
        const handlePointerUp = () => {
            dragRef.current = null;
        };
        window.addEventListener('pointerup', handlePointerUp);
        return () => window.removeEventListener('pointerup', handlePointerUp);
    }, []);

    const handleNodePointerDown = (index: number, e: ThreeEvent<PointerEvent>) => {
        if (!physics.current.active) return;
        e.stopPropagation();
        // @ts-ignore
        e.target.setPointerCapture(e.pointerId);
        dragRef.current = index;
    };

    useFrame((state, delta) => {
        if (quantumCoreRef.current) {
            quantumCoreRef.current.rotation.y += delta * 0.4;
            quantumCoreRef.current.rotation.x += delta * 0.2;
        }
        if (coreDiskRef.current) {
            coreDiskRef.current.rotation.y += delta * 0.7;
        }

        const isExploded = tl2Ref.current && tl2Ref.current.progress() > 0.01;
        const time = state.clock.getElapsedTime();

        // Spin the child meshes procedurally (never GSAP target)
        if (!physics.current.active) {
            spinningRingRefs.current.forEach((mesh, i) => {
                if (mesh) {
                    const ring = ringsData[i];
                    mesh.rotation.y += delta * ring.speed * 0.25;
                }
            });
        }

        // Snapping safety fallback on parent rings
        if (!physics.current.active && !isExploded) {
            cubesRefs.current.forEach((mesh, i) => {
                if (mesh) {
                    if (i < 4) {
                        mesh.position.set(0, 0, 0);
                        const ring = ringsData[i];
                        mesh.rotation.set(ring.tilt[0], ring.tilt[1], ring.tilt[2]);
                    } else {
                        const nodeIndex = i - 4;
                        const node = nodesData[nodeIndex];
                        const ring = ringsData[node.ringIndex];
                        const currentAngle = node.angle + time * ring.speed * 0.5;
                        
                        const basePos = new THREE.Vector3(
                            Math.cos(currentAngle) * ring.radius,
                            0,
                            Math.sin(currentAngle) * ring.radius
                        );
                        
                        const euler = new THREE.Euler(...ring.tilt);
                        basePos.applyEuler(euler);
                        mesh.position.copy(basePos);
                    }
                }
            });
        }

        if (!physics.current.active) return;

        const vec = new THREE.Vector3(mouse.x, mouse.y, 0.5);
        vec.unproject(camera);
        const dir = vec.sub(camera.position).normalize();
        const distanceToFloor = (PHYSICS_FLOOR_Y - camera.position.y) / dir.y;
        const mouseWorldPos = camera.position.clone().add(dir.multiplyScalar(distanceToFloor));
        
        const repulsionRadius = 4.0; 
        const repulsionForce = 45.0; 
        const drag = 0.96; 
        const worldWidth = viewport.width / 2;

        cubesRefs.current.forEach((mesh, i) => {
            if (!mesh) return;
            const velocity = physics.current.velocities[i];
            
            const currentWorldPos = new THREE.Vector3();
            mesh.getWorldPosition(currentWorldPos);
            const meshFloorPos = new THREE.Vector3(currentWorldPos.x, PHYSICS_FLOOR_Y, currentWorldPos.z);
            const mouseFloorPos = new THREE.Vector3(mouseWorldPos.x, PHYSICS_FLOOR_Y, mouseWorldPos.z);

            if (dragRef.current === i) {
                 const targetPos = mouseFloorPos.clone();
                 targetPos.y = PHYSICS_FLOOR_Y + (i < 4 ? 0.6 : 0.3);
                 
                 const moveDiff = targetPos.clone().sub(mesh.position);
                 velocity.copy(moveDiff.multiplyScalar(10));
                 mesh.position.lerp(targetPos, 0.2);
                 
                 cubesRefs.current.forEach((otherMesh, j) => {
                    if (i === j || !otherMesh) return;
                    const otherPos = new THREE.Vector3();
                    otherMesh.getWorldPosition(otherPos);
                    const dist = mesh.position.distanceTo(otherPos);
                    const minDist = i < 4 || j < 4 ? 2.0 : 1.0;
                    if (dist < minDist) {
                         const pushDir = otherPos.clone().sub(mesh.position).normalize();
                         const force = (minDist - dist) * 30.0;
                         physics.current.velocities[j].add(pushDir.multiplyScalar(force * delta));
                    }
                 });
                 return;
            }

            if (dragRef.current === null) {
                const distToMouse = meshFloorPos.distanceTo(mouseFloorPos);
                if (distToMouse < repulsionRadius) {
                    const forceDir = meshFloorPos.clone().sub(mouseFloorPos).normalize();
                    const force = (1 - distToMouse / repulsionRadius) * repulsionForce;
                    velocity.add(forceDir.multiplyScalar(force * delta));
                }
            }

            cubesRefs.current.forEach((otherMesh, j) => {
                if (i === j || !otherMesh) return;
                const otherPos = new THREE.Vector3();
                otherMesh.getWorldPosition(otherPos);
                
                const dist = currentWorldPos.distanceTo(otherPos);
                const minDist = i < 4 || j < 4 ? 1.6 : 0.8;
                if (dist < minDist) {
                    const pushDir = currentWorldPos.clone().sub(otherPos).normalize();
                    pushDir.x += (Math.random() - 0.5) * 0.1;
                    pushDir.z += (Math.random() - 0.5) * 0.1;
                    const force = (minDist - dist) * 15.0;
                    velocity.add(pushDir.multiplyScalar(force * delta));
                }
            });
            
            const safeBoundary = Math.max(2, worldWidth - 1); 
            if (mesh.position.x > safeBoundary) {
                 velocity.x *= -0.8;
                 mesh.position.x = safeBoundary;
            } else if (mesh.position.x < -safeBoundary) {
                 velocity.x *= -0.8;
                 mesh.position.x = -safeBoundary;
            }

            mesh.position.x += velocity.x * delta;
            mesh.position.z += velocity.z * delta;
            mesh.position.y += Math.sin(state.clock.elapsedTime * 3 + i) * 0.003; 
            
            velocity.multiplyScalar(drag); 
        });
    });

    useLayoutEffect(() => {
        if (!mainGroupRef.current) return;

        const mm = gsap.matchMedia();

        mm.add({
            isMobile: "(max-width: 799px)",
            isDesktop: "(min-width: 800px)"
        }, (context) => {
            const { isMobile } = context.conditions as { isMobile: boolean };
            const screenWidth = viewport.width;

            const startPos: [number,number,number] = isMobile ? [0, -2.8, 0] : [2.2, 0, 0];
            const startScale = isMobile ? 0.65 : 0.95;
            
            mainGroupRef.current!.position.set(...startPos);
            mainGroupRef.current!.scale.set(startScale, startScale, startScale);
            mainGroupRef.current!.rotation.set(0.3, -0.5, 0);

            if (idleTimeline.current) idleTimeline.current.kill();
            
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.2, defaults: { ease: "power2.inOut" } });
            idleTimeline.current = tl;
            tl.to(mainGroupRef.current!.rotation, { y: Math.PI * 2, duration: 20, ease: "none" });

            const centerPosDetails: [number,number,number] = isMobile ? [0, 0.5, 0] : [0, -2.5, 0];
            const detailScale = isMobile ? 0.6 : 0.9;

            const tl1 = gsap.timeline({
                scrollTrigger: {
                    trigger: "#hero-section",
                    start: "top top", 
                    endTrigger: "#details-section",
                    end: "center center",
                    scrub: 1.2,
                    immediateRender: false, 
                }
            });
            
            tl1.to(mainGroupRef.current!.rotation, {
                x: 0.2, y: Math.PI * 0.45, z: 0, duration: 1, ease: "power2.inOut"
            }, 0)
            .to(mainGroupRef.current!.position, {
                x: centerPosDetails[0], y: centerPosDetails[1], z: centerPosDetails[2], ease: "power1.inOut"
            }, 0)
            .to(mainGroupRef.current!.scale, {
                x: detailScale, y: detailScale, z: detailScale, ease: "power1.inOut"
            }, 0);

            const centerPosBreakdown = [0, 0, 0];
            const breakdownScale = isMobile ? 0.55 : 0.8;

            const tl2 = gsap.timeline({
                scrollTrigger: {
                    trigger: "#details-section",
                    start: "bottom bottom",
                    endTrigger: "#breakdown-section",
                    end: "center center",
                    scrub: 1,
                }
            });
            tl2Ref.current = tl2;

            tl2.to(mainGroupRef.current!.position, {
                x: centerPosBreakdown[0], y: centerPosBreakdown[1], z: centerPosBreakdown[2],
                ease: "power2.inOut"
            }, 0)
            .to(mainGroupRef.current!.scale, {
                 x: breakdownScale, y: breakdownScale, z: breakdownScale,
                 ease: "power2.inOut"
            }, 0)
            .to(mainGroupRef.current!.rotation, {
                x: 0.5, y: Math.PI * 2.25, z: 0.2, 
                ease: "power2.inOut"
            }, 0);

            const ringTargetsY = [2.0, 0.7, -0.7, -2.0];
            cubesRefs.current.forEach((mesh, i) => {
                if(!mesh) return;
                
                if (i < 4) {
                    tl2.to(mesh.position, {
                        x: 0, y: ringTargetsY[i], z: 0, ease: "power2.inOut"
                    }, 0);
                    tl2.to(mesh.rotation, {
                        x: Math.PI / 2, y: 0, z: 0, ease: "power2.inOut"
                    }, 0);
                } else {
                    const nodeIndex = i - 4;
                    const group = Math.floor(nodeIndex / 4);
                    
                    const directions = [
                        [-4.2, 2.5, 0.5],  
                        [4.2, 2.5, 0.5],   
                        [-4.2, -2.5, 0.5], 
                        [4.2, -2.5, 0.5]   
                    ];
                    
                    const dir = directions[group];
                    const scatterRange = 0.5;
                    const targetX = dir[0] + (Math.random() - 0.5) * scatterRange;
                    const targetY = dir[1] + (Math.random() - 0.5) * scatterRange;
                    const targetZ = dir[2] + (Math.random() - 0.5) * scatterRange;

                    tl2.to(mesh.position, {
                        x: targetX, y: targetY, z: targetZ, ease: "power2.out"
                    }, 0);
                }
            });

            const tl3 = gsap.timeline({
                scrollTrigger: {
                    trigger: "#breakdown-section",
                    start: "center center", 
                    endTrigger: "#footer-section",
                    end: "bottom bottom",
                    scrub: 1.5,
                    onLeave: () => { physics.current.active = true; },
                    onEnterBack: () => { 
                        physics.current.active = false; 
                        physics.current.velocities.forEach(v => v.set(0,0,0)); 
                    }
                }
            });

            cubesRefs.current.forEach((mesh, i) => {
                if (!mesh) return;
                
                const dropRange = Math.max(2, screenWidth * 0.8);
                const dropTargetX = (Math.random() - 0.5) * dropRange; 
                const dropTargetZ = (Math.random() - 0.5) * 6; 
                const dropTargetY = PHYSICS_FLOOR_Y + Math.random() * 1.5; 
                
                let parentYOffset = 0;
                if (i < 4) {
                    parentYOffset = ringTargetsY[i];
                } else {
                    const nodeIndex = i - 4;
                    const group = Math.floor(nodeIndex / 4);
                    const directionsY = [2.5, 2.5, -2.5, -2.5];
                    parentYOffset = directionsY[group];
                }

                const finalLocalY = dropTargetY - parentYOffset;
                const randRot = Math.random() * Math.PI * 6;

                tl3.to(mesh.position, {
                    x: dropTargetX, y: finalLocalY, z: dropTargetZ,
                    ease: "bounce.out", duration: 2, 
                }, i * 0.01); 
                tl3.to(mesh.rotation, {
                    x: randRot, y: randRot, z: randRot, ease: "power1.out"
                }, "<");
            });
        });

        return () => mm.revert();
    }, [ringsData, nodesData, viewport.width]); 

    const addToRefs = (el: THREE.Group | null) => {
        if (el && !cubesRefs.current.includes(el)) cubesRefs.current.push(el);
    };
    
    cubesRefs.current = [];
    spinningRingRefs.current = [];

    return (
        <group ref={mainGroupRef}>
             <PresentationControls
                global={false}
                cursor={true}
                snap={true}
                speed={2}
                zoom={1}
                rotation={[0, 0, 0]}
                polar={[-Infinity, Infinity]}
                azimuth={[-Infinity, Infinity]}
             >
                <group>
                     {/* The Central Glowing Refractive glass core with inner spinning Logo Disk */}
                     {!physics.current.active && (
                         <group ref={quantumCoreGroupRef}>
                             <mesh ref={quantumCoreRef} position={[0, 0, 0]}>
                                 <sphereGeometry args={[0.66, 32, 32]} />
                                 <meshPhysicalMaterial 
                                     color="#00E5FF"
                                     emissive="#8B5CF6"
                                     emissiveIntensity={0.6}
                                     roughness={0.1}
                                     metalness={0.1}
                                     transmission={0.8}
                                     thickness={0.6}
                                     ior={1.4}
                                     transparent
                                     opacity={0.3}
                                 />
                             </mesh>
                             
                             {logoTexture && (
                                 <mesh ref={coreDiskRef} position={[0, 0, 0]}>
                                     <circleGeometry args={[0.48, 64]} />
                                     <meshStandardMaterial 
                                         map={logoTexture} 
                                         transparent={true} 
                                         roughness={0.1} 
                                         metalness={0.7} 
                                         side={THREE.DoubleSide} 
                                     />
                                 </mesh>
                             )}
                         </group>
                     )}

                     {/* 4 Concentric Orbit Torus Rings with floating info labels */}
                     {ringsData.map((ring, i) => (
                          <group key={ring.id} ref={addToRefs} rotation={new THREE.Euler(...ring.tilt)}>
                               <group ref={(el) => { if (el) spinningRingRefs.current[i] = el; }}>
                                   <mesh>
                                        <torusGeometry args={[ring.radius, 0.025, 16, 100]} />
                                        <meshStandardMaterial 
                                             color={ring.color} 
                                             roughness={0.1} 
                                             metalness={0.9} 
                                             emissive={ring.color}
                                             emissiveIntensity={0.3}
                                        />
                                   </mesh>
                               </group>
                               {/* Floating Info HUD label */}
                               {showLabels && !physics.current.active && (
                                    <Html position={[ring.radius, 0.15, 0]} distanceFactor={6} center>
                                         <div className="px-3 py-1 rounded-full border border-white/20 bg-slate-950/85 backdrop-blur-md text-[9px] sm:text-[10px] font-mono font-bold text-white uppercase tracking-widest whitespace-nowrap select-none pointer-events-none shadow-lg transition-all duration-300">
                                              <span style={{ color: ring.color }} className="mr-1.5 animate-pulse">●</span>
                                              {ring.label}
                                          </div>
                                     </Html>
                               )}
                          </group>
                     ))}

                     {/* 16 Orbiting Crystalline Nodes */}
                     {nodesData.map((node, i) => (
                          <group key={node.id}>
                               <NetworkNode 
                                   innerRef={addToRefs} 
                                   position={[0,0,0]} 
                                   color={node.color} 
                                   scale={0.8}
                                   onPointerDown={(e) => handleNodePointerDown(4 + i, e)} 
                                   {...{ userData: { id: node.id } }} 
                               />
                               {/* Floating Node Info tag */}
                               {showLabels && !physics.current.active && node.nodeLabel && (
                                    <Html position={[0, 0.55, 0]} distanceFactor={6} center>
                                         <div className="px-2.5 py-0.5 rounded border border-white/10 bg-slate-900/80 backdrop-blur-md text-[8px] sm:text-[9px] font-mono text-neutral-300 uppercase tracking-widest whitespace-nowrap select-none pointer-events-none shadow-md">
                                              {node.nodeLabel}
                                          </div>
                                     </Html>
                               )}
                          </group>
                     ))}
                </group>
             </PresentationControls>
        </group>
    );
};

const ThreeScene: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-auto">
      <Canvas dpr={[1, 1.5]} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={35} />
        
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 7]} intensity={1.5} />
        <directionalLight position={[-5, 5, -2]} intensity={1} color="#bfdbfe" />
        <spotLight position={[0, 5, -10]} intensity={0.5} color="#ffffff" />

        <StrataOrbits />
        <HeroFloatingNodes />

        {/* Background Decorative Elements */}
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
            <WireframeShape position={[0, 4, -5]} type="box" scale={1.5} rotation={[0.5, 0.5, 0]} />
        </Float>
        <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3}>
                <WireframeShape position={[6, -4, -2]} type="sphere" scale={1.2} />
        </Float>
        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
                <WireframeShape position={[-5, 5, -8]} type="icosahedron" scale={2} />
        </Float>
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default ThreeScene;