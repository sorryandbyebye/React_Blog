import React, { Suspense } from 'react';
import CameraPart from './component/Camera/CameraPart';
import HumanModelPart from './component/ThreeModel/HumanModelPart';
import { Canvas } from '@react-three/fiber';
import LoadingModel from '../../components/LoadingModel';
import { Leva, useControls } from 'leva';
import { Perf } from 'r3f-perf'


function Posenet() {
  let kp
  // const [kp, setKp] = useState([])

  // 子传父，自定义方法
  const mapJoints = (keypoints) => {
    kp = keypoints
  }
  // 父传子，自定义属性
  const getJoints = () => {
    return kp;
  }

  const cameraSetting = {
    fov: 60,
    near: 0.1,
    far: 200,
    position: [0, 0, 2]
  }
  const { ifMirror } = useControls('镜像', {
    ifMirror: true
  })
  const { perfVisiable } = useControls('显示页面信息', {
    perfVisiable: true
  })
  return (
    <>
      <div className="App">
        <Canvas>
          {perfVisiable ? <Perf position='top-left' /> : null}
        </Canvas>
        <Leva collapsed={false} />
        <div
          className="cam"
          style={{
            overflow: 'hidden',

          }}
        >
          <CameraPart mapJoints={mapJoints} ifMirror={ifMirror} />
        </div>
        <div className='model'>
          <Canvas
            camera={cameraSetting}

            style={{
              width: '50%',
              height: '50%',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: ['translateX(-50%)'],
              marginLeft: 'auto',
              marginRight: 'auto'

            }}
          >
            <Suspense fallback={
              <LoadingModel></LoadingModel>
            }>
              <HumanModelPart getJoints={getJoints} ifMirror={ifMirror} />
            </Suspense>
          </Canvas>
        </div>
      </div>

    </>

  );
}
export default Posenet;
