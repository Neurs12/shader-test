'use client';

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";

import vertexMainShader from "./shaders/vertex/main";
import vertexParsShader from "./shaders/vertex/pars";

import { useRef } from "react";
import { MeshStandardMaterial } from "three";

export default function Page() {
  return (
    <Canvas style={{width: "100vw", height: "100vh"}}>
      <OrbitControls />
      <Environment preset="city" background />
      <pointLight position={[10, 10, 10]} intensity={10} color="#fff" />
      <Flat />
    </Canvas>
  );
}

function Flat() {
  const shaderMaterial = useRef(null as unknown as MeshStandardMaterial);
  useFrame((state) => {
    if (typeof shaderMaterial.current.userData.shader !== "undefined") {
      shaderMaterial.current.userData.shader.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      <sphereGeometry args={[2, 1000, 1000]} />
      <meshStandardMaterial color={"#1F51FF"} ref={shaderMaterial}  onBeforeCompile={
        (shader) => {
          shaderMaterial.current.userData.shader = shader;

          shader.uniforms.uTime = { value: 0 };

          const parsVertex = `#include <displacementmap_pars_vertex>`;
          shader.vertexShader = shader.vertexShader.replace(
            parsVertex,
            parsVertex + vertexParsShader,
          );
          const mainVertex = `#include <displacementmap_vertex>`;
          shader.vertexShader = shader.vertexShader.replace(
            mainVertex,
            mainVertex + vertexMainShader,
          );
        }
      } />
    </mesh>
  );
}