import React, { useState, useEffect } from 'react'
import '../less/all.less'
import { Button, Popover, Collapse } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios'
import musicRequest from '../../request/musicRequest';
const { Panel } = Collapse;
export default function Music() {
  const refs = []
  const onChange = (key) => {
    refs.forEach((item) => {
      item.pause()
    })
    // console.log(key, refs);
    // console.log(refs.length);
  };
  const content = (
    <div>
      请理性、礼貌评论~~~
      <br />
      目前只支持从网易云获取音乐
    </div>
  );
  const [musics, setMusics] = useState([])


  // 获取音乐函数
  const getMusics = async () => {
    let data = []
    await axios.get('/api/music')
      .then(res => {
        data = res.data
      })
    for (var i = 0; i <= data.length - 1; i++) {
      // promise.all实现
      var detail = await musicRequest.get(`/song/detail?ids=${data[i].musicId}`)
      // console.log(detail);
      var musicSingle = await musicRequest.post(`/song/url?id=${data[i].musicId}`)
      // console.log(musicSingle.data.data[0].url)
      data[i].picUrl = detail.data.songs[0].al.picUrl
      data[i].playUrl = musicSingle.data.data[0].url
    }
    setMusics(data.reverse())
    // setRefs(new Array(data.length))
  }
  // 用屏蔽eslint警告，警告原因调用了外部函数没有依赖
  useEffect(() => {
    getMusics()
  }, [])//eslint-disable-line
  return (
    <div className='all music'>
      <div className='title0'>
        <div className='title1'>音乐介绍</div>
        <Popover content={content} title="Title" trigger="click">
          <Button className='commentNote'>观看悉知</Button>
        </Popover>
        <Link to={'/Home'} className='backToHome'><Button>返回</Button></Link>
      </div>
      <div className="musicList">
        <Collapse accordion defaultActiveKey={[]} onChange={onChange} >
          {
            musics.map((item, index) => {
              // console.log(item);
              return (
                <Panel header={item.name} key={item._id}>
                  {/* <p>{item.name}</p> */}
                  <div className='musicItem'>
                    <div>
                      <img src={item.picUrl} alt={item.musicId}></img>
                      <div className="musicName">
                        <p>{item.name}</p>
                        {/* onPlay={playmusic(index)} */}
                        <audio src={item.playUrl} controls autoPlay={false} ref={r => { if (r) refs[index] = r }} ></audio>
                      </div>
                    </div>
                    <div className="description">{item.description}</div>
                  </div>
                </Panel>
              )
            })
          }
        </Collapse>
      </div>
    </div>
  )
}
