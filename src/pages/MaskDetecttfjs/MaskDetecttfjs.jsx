// Import dependencies
import React, { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
// import "./App.css";
import { drawRect } from "./utilities.js";
// import { linspace } from "@tensorflow/tfjs";

export default function MaskDetecttfjs() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  // var n = 0
  // const draw = false
  // Main function
  const runMask = async () => {
    // console.log(window.location);
    const net = await tf.loadGraphModel(`${window.location.origin}/assets/best_web_model/model.json`, { strict: false });
    //  Loop and detect hands
    setInterval(() => {
      // n++
      detect(net);
      // if (n > 60) {
      //   clearInterval(timer)
      //   n = 0
      //   runMask()
      // }
    }, 100);
    // setTimeout(() => {
    //   clearTimer(timer)
    // }, 1000)
  };
  // function clearTimer(timer) {
  //   clearInterval(timer)
  // }
  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // make detection2
      let [modelWeight, modelHeight] = net.inputs[0].shape.slice(1, 3);
      // console.log(modelWeight, modelHeight)
      let input = tf.tidy(() => tf.image.resizeBilinear(tf.browser.fromPixels(video), [modelWeight, modelHeight]).div(255.0).expandDims(0));
      // predict
      const obj = await net.executeAsync(input);
      input.dispose()
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);

      // obj.forEach((res) => {
      //   res.dispose()
      // })
    }
  };
  // eslint-disable-next-line
  // useEffect(() => {
  //   runMask()
  // }, [runMask]);
  runMask()
  // runMask()
  return (
    <div className="App">
      {/* <div><img ref={imgRef} src="./images/mask.jpg" alt="" /></div> */}

      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}
