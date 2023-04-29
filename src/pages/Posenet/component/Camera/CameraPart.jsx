import React, { useRef } from 'react'
import Webcam from 'react-webcam'
import * as posenet from '@tensorflow-models/posenet'
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
  const runPosenet = async () => {
    const net = await posenet.load()
    console.log('posenet loaded');
    // 定时器
    setInterval(() => {
      detect(net)
    }, 100)
  }

  const drawPose = (predection, canvas) => {
    // console.log(canvas.canvas.width);
    if (predection.score > 0) {
      const keypoints = predection.keypoints
      // console.log(keypoints);
      props.mapJoints(keypoints)
      keypoints.forEach((point) => {
        // 镜像 

        const x = props.ifMirror ? canvas.canvas.width - point.position.x : point.position.x
        const y = point.position.y

        canvas.beginPath()
        canvas.arc(x, y, 5, 0, 3 * Math.PI)
        canvas.fillStyle = 'skyblue'
        canvas.fill()
      });
    }
  }

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

      const pose = await net.estimateSinglePose(video)

      // console.log(pose);
      drawPose(pose, canvasRef.current.getContext('2d'))

    }
  }
  runPosenet()
  return (
    <div
    // className="cam"
    >
      <Webcam
        ref={webcamRef}
        style={style}
        // className='webcam'
        mirrored={props.ifMirror}>

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
