import React from 'react'
import './components.less'
export default function Content(props) {
  // console.log(props.title[2]);
  return (
    <div id='content'>
      <div className='picture'><img src={require(`../asset/contentImg/${props.title[2]}.jpg`)} alt='pic'></img></div>
      <div className='title2'>{props.title[0]}</div>
      <div className='introduce'><p>{props.title[1]}</p></div>
    </div>
  )
}
