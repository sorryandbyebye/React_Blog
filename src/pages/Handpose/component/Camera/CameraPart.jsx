import React, { useRef } from 'react'
import Webcam from 'react-webcam'
import * as handpose from '@tensorflow-models/handpose'
import * as tf from "@tensorflow/tfjs"; //必须要引用，是深度学习网络的后台
export default function CameraPart(props) {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)

  const style = {
    position: "absolute",
    // float: 'left',
    marginLeft: "auto",
    marginRight: "auto",
    margin: 'auto',
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: 9,
    width: 320,
    height: 240
  }
  const runHandpose = async () => {
    const net = await handpose.load()
    console.log('handpose loaded');
    // 定时器
    setInterval(() => {
      detect(net)
    }, 100)
  }

  const drawHand = (predection, canvas) => {
    // console.log(canvas.canvas.width);
    try {
      if (predection[0].handInViewConfidence) {
        const keypoints = predection[0].landmarks
        // console.log(keypoints);
        props.mapJoints(keypoints)
        keypoints.forEach((point) => {
          // 镜像 
          const x = canvas.canvas.width - point[0]
          const y = point[1]

          canvas.beginPath()
          canvas.arc(x, y, 5, 0, 3 * Math.PI)
          canvas.fillStyle = 'skyblue'
          canvas.fill()
        });
      }
    } catch (error) {
      // console.log(error);
    }

  }

  // const fingerJoints={
  //   thumb:[0,1,2,3,4],
  //   indexFinger:[0,5,6,7,8],
  //   middleFinger:[0,9,10,11,12],
  //   ringFinger:[0,13,14,15,16],
  //   pinky:[0,17,18,19,20],

  // }
  const detect = async (net) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight

      webcamRef.current.video.width = videoWidth
      webcamRef.current.video.height = videoHeight

      canvasRef.current.width = videoWidth
      canvasRef.current.height = videoHeight

      const hand = await net.estimateHands(video)

      // console.log(hand);
      drawHand(hand, canvasRef.current.getContext('2d'))

    }
  }
  runHandpose()
  return (
    <div
    // className="cam"
    >
      <Webcam
        ref={webcamRef}
        style={style}
        mirrored={true}

      >

      </Webcam>
      <canvas
        ref={canvasRef}
        // className='canvascam'
        style={style}
      >

      </canvas>
    </div>
  )
}
