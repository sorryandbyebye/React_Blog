import React from 'react'
import './less/all.less'
import Content from '../components/Content'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='all all1'>
      <div className='title1'>音乐、日常、图片、项目介绍</div>
      <ul className='mainBlock'>
        <li>
          <Link to='/Music'><Content title={['音乐推荐', '希望你也能听到我歌单里的音乐,这或许能带你体验到这首歌的世界', 'music']}></Content ></Link>
        </li>
        <li>
          <Link to='/Daily'><Content title={['摸鱼佬的日常', '记录一下生活~', 'IMG_20211121_171249']}></Content></Link>
        </li>
        <li>
          <Link to='/NicePic'><Content title={['好看的图片', '浓度拉满（啊不是），也还是有相片的', 'shenliAndXiaogong']}></Content></Link>
        </li>
        <li>
          <Link to='/Project/sharePrpject'><Content title={['项目介绍', '介绍到目前为止做过的项目，包含硬件类和软件类', 'project']}></Content></Link>
        </li>
      </ul>
      {/* <footer>备案号:粤ICP备2022013598号</footer> */}

    </div >
  )
}
// bug
// 1.放大之后子元素会超过父元素
// 2.放大缩小网页背景图改变变