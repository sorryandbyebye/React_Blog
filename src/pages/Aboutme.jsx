import React from 'react'
import './less/all.less'
// import { createBrowserHistory } from "history";
export default function Aboutme() {
  // const history = createBrowserHistory()
  return (
    <div className='all aboutme'>
      <div className='myImg'>
        <a href="https://github.com/0wgz0" target="_blank" rel="noopener noreferrer"><img src={require("../asset/aboutme/wgz2.png")} alt=""></img></a>
      </div>
      <div className='setText'>
        <p><span>文同学</span></p>
        <p><span>现研究生</span></p>
        <p><span>刚入门前端，希望可以慢慢运营起这个网页</span></p>
        <p><span>大家对这里的分享的内容有什么看法和意见的话欢迎留言，虽然这个功能还没开</span></p>
        <p><span>捞捞我的简历吧，球球各位大佬了</span></p>
        <p><img src={require("../asset/aboutme/hutaoshake.gif")} alt="hutao"></img></p>
      </div>
    </div>
  )
}
