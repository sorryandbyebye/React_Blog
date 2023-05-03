import React from 'react'
import { Float, Text } from '@react-three/drei';
export default function LoadingModel() {
  return (
    <>
      <Float speed={5}>
        <Text
          font='./bangers-v20-latin-regular.woff'
          fontSize={1}
          color='salmon'
          position-y={0}
          maxWidth={2}
          textAlign='center'>
          Loading
        </Text>
      </Float>
    </>
  )
}
