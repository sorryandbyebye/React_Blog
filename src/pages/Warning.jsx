import React from 'react'
import './less/all.less'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
export default function Warning() {
  const navgate = useNavigate()
  const goBack = () => {
    navgate('/Home')
  }
  const goDetct = () => {
    window.open('/MaskDetecttfjs', '_blank')
  }
  return (
    <div className='all warning'>
      <div className='setText'>
        <p><span>您好呀！接下来将前往一个神奇的领域！</span></p>
        <p><span>这是我用tensorflowjs实现对深度学习模型（口罩识别）在网页上的使用</span></p>
        <p><span>在前往之前，我在这先叠个甲TAT（免责/喷声明）</span></p>
        <p><span>1、没有用到实时流的框架（flex等），纯在网页上跑，因此可能会卡顿。</span></p>
        <p><span>2、该网页会调用您的摄像头，仅用于识别您是否佩戴口罩，不会收集您任何信息。</span></p>
        <p><span>3、实现深度学习的布置，会占用大量的Gpu，如果过程中出现卡顿等情况，您可以选择关闭该网页~</span></p>
        <p><span>4、我的GPU是GTX1050，4G，我已经尽力让他释放空间了（菜），还是可能会跑满。</span></p>
      </div>
      <div className='btn'>
        <Button className='btnn' onClick={goBack}>还是算了</Button> <Button className='btnn' type='primary' onClick={goDetct}>进去看看</Button>
      </div>
    </div>
  )
}
