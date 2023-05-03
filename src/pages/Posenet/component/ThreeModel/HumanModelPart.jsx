import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'

const CONFIDENCE = 0.3

const getAngle = (p1, p2, c1, c2, m) => {
  if (p1['score'] > CONFIDENCE && p2['score'] > CONFIDENCE) {
    return (Math.atan2(p2['position']['y'] - p1['position']['y'], p2['position']['x'] - p1['position']['x']) + c1) * m;
  }
  return c2 * m
}

const normalize = (min, max, val) => {
  return ((val - min) / (max - min)) * Math.PI;
}

const getYRotation = (p1, p2, p3) => {
  if (p1['score'] > CONFIDENCE && p2['score'] > CONFIDENCE && p3['score'] > CONFIDENCE) {
    let e1 = Math.abs(p1['position']['x'] - p3['position']['x'])
    let e2 = Math.abs(p2['position']['x'] - p3['position']['x'])
    return normalize(-100, 100, e1 - e2) - Math.PI / 2;
  }
  return 0
}

const getZRotation = (p1, p2) => {
  if (p1['score'] > CONFIDENCE && p2['score'] > CONFIDENCE) {
    let e1 = Math.abs(p1['position']['y'])
    let e2 = Math.abs(p2['position']['y'])
    return normalize(-80, 80, e1 - e2) - Math.PI / 2;
  }
  return 0
}
export default function HumanModelPart(props) {
  let kp
  const group = useRef()
  const { nodes, materials } = useGLTF('./model.glb')
  // console.log(nodes.Ch36.skeleton.bones);
  // console.log(props.getJoints());
  nodes.Ch36.skeleton.bones[7].rotation.z = -Math.PI / 2
  nodes.Ch36.skeleton.bones[7].position.x = 6
  nodes.Ch36.skeleton.bones[7].position.z = 0
  nodes.Ch36.skeleton.bones[9].position.z = 0

  nodes.Ch36.skeleton.bones[31].rotation.z = Math.PI / 2
  nodes.Ch36.skeleton.bones[31].position.x = -6
  nodes.Ch36.skeleton.bones[31].position.z = 0
  nodes.Ch36.skeleton.bones[33].position.z = 0



  useFrame((state, delta) => {
    kp = props.getJoints()
    if (kp === undefined) {
      return
    }
    if (!props.ifMirror) {
      // Left arm & elbow
      nodes.Ch36.skeleton.bones[7].rotation.y = getAngle(kp[5], kp[7], 0, 0, -1)
      nodes.Ch36.skeleton.bones[9].rotation.x = getAngle(kp[7], kp[9], 0, 0, 1)

      //Right arm & elbow
      nodes.Ch36.skeleton.bones[31].rotation.y = getAngle(kp[8], kp[6], 0, 0, -1)
      nodes.Ch36.skeleton.bones[33].rotation.x = getAngle(kp[10], kp[8], 0, 0, -1)

      // Left leg & knee
      nodes.Ch36.skeleton.bones[55].rotation.z = getAngle(kp[11], kp[13], (Math.PI / 2), Math.PI, -1)
      //nodes.Ch36.skeleton.bones[56].rotation.z = getAngle(kp[15], kp[13], (Math.PI/2), 0, -1)

      // Right leg & knee
      nodes.Ch36.skeleton.bones[60].rotation.z = getAngle(kp[12], kp[14], (Math.PI / 2), Math.PI, -1)
      //nodes.Ch36.skeleton.bones[61].rotation.z = getAngle(kp[16], kp[14], (Math.PI/2), 0, -1)

      // Head 
      nodes.Ch36.skeleton.bones[5].rotation.y = getYRotation(kp[1], kp[2], kp[0])
      nodes.Ch36.skeleton.bones[5].rotation.z = getZRotation(kp[1], kp[2])
    } else {
      // mirror model 
      // Head   kp[1]:leftEyes    kp[2]:rightEyes     kp[0]:nose
      // y:正左负右 
      // 左右转头和侧头
      nodes.Ch36.skeleton.bones[5].rotation.y = getYRotation(kp[1], kp[2], kp[0])
      nodes.Ch36.skeleton.bones[5].rotation.z = getZRotation(kp[1], kp[2])


      // Left arm & elbow   kp[5]:shouder    kp[7]:elbow    kp[9]:wrist
      nodes.Ch36.skeleton.bones[7].rotation.y = getAngle(kp[8], kp[6], 0, 0, 1)
      nodes.Ch36.skeleton.bones[9].rotation.x = getAngle(kp[10], kp[8], 0, 0, -1)


      //Right arm & elbow   kp[6]:shouder    kp[8]:elbow    kp[10]:wrist
      nodes.Ch36.skeleton.bones[31].rotation.y = getAngle(kp[5], kp[7], 0, 0, 1)
      nodes.Ch36.skeleton.bones[33].rotation.x = getAngle(kp[7], kp[9], 0, 0, 1)

      // Left leg & knee
      nodes.Ch36.skeleton.bones[55].rotation.z = getAngle(kp[12], kp[14], (Math.PI / 2), Math.PI, -1)
      //nodes.Ch36.skeleton.bones[56].rotation.z = getAngle(kp[15], kp[13], (Math.PI/2), 0, -1)

      // Right leg & knee
      nodes.Ch36.skeleton.bones[60].rotation.z = getAngle(kp[11], kp[13], (Math.PI / 2), Math.PI, -1)
    }

  })
  return (
    <>
      <OrbitControls />
      <directionalLight position={[1, 2, 3]} />
      <ambientLight intensity={0.4} />

      <group ref={group} {...props} dispose={null} position={[0, -1, 0]}>
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorig1Hips} />
          <skinnedMesh geometry={nodes.Ch36.geometry} material={materials.Ch36_Body} skeleton={nodes.Ch36.skeleton} />
        </group>
      </group>
    </>

  )
}

useGLTF.preload('./model.glb')