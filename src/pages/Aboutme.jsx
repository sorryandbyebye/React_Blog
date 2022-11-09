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
        <p><span>想学前端搞点钱，以后想回老家开咖啡店和拥有自己的品牌(究极目标，啊哈哈哈)</span></p>
        <p><img src={require("../asset/aboutme/hutaoshake.gif")} alt="hutao"></img></p>
      </div>
    </div>
  )
}
