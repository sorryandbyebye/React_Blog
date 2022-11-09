import React, { useState, useEffect } from 'react'
import musicRequest from '../request/musicRequest'
export default function MusicBox() {
  const [boxUrlList, setBoxUrlList] = useState([])
  const [boxNameList, setBoxNameList] = useState([])
  const [boxIdList, setBoxIdList] = useState([])
  const [currentUrl, setCurrentUrl] = useState('')
  const [currentName, setCurrentName] = useState('')
  const [musicNum, setMusicNum] = useState(0)
  const [ifAuto, setIfAuto] = useState(false)

  const getBoxMusics = async () => {
    var musicList = []
    await musicRequest.get('/playlist/detail?id=5055323747').then(res => {
      musicList = res.data.playlist.tracks
    })
    let nameArr = []
    let urlArr = []
    let idArr = []
    for (var i = 0; i <= musicList.length - 1; i++) {
      const musicSingle = await musicRequest.post('/song/url?id=' + musicList[i].id)
      // console.log(musicSingle)
      const musicId = musicSingle.data.data[0].id
      // console.log(musicId);
      const musicUrl = musicSingle.data.data[0].url
      // console.log(musicList[i].name);
      nameArr.push(musicList[i].name)
      urlArr.push(musicUrl)
      idArr.push(musicId)
    }
    // console.log(musicArr);
    setBoxNameList(nameArr)
    setBoxUrlList(urlArr)
    setBoxIdList(idArr)
    setCurrentName(nameArr[0])
    setCurrentUrl(urlArr[0])
    // console.log(boxMusicList);
  }
  const overAudio = () => {
    if (musicNum === boxIdList.length - 1) {
      setMusicNum(0)
    } else {
      setMusicNum(musicNum + 1)
    }
    setIfAuto(true)
    setCurrentUrl(boxUrlList[musicNum])
    setCurrentName(boxNameList[musicNum])
  }

  useEffect(() => {
    getBoxMusics()
    // console.log(boxMusicList);
  }, [])//eslint-disable-line
  return (
    <div className='music-container'>
      <div className="audioplayer">
        {/* 不能直接渲染对象 */}
        <audio src={currentUrl} controls autoPlay={ifAuto} onEnded={overAudio}></audio>
        <marquee scrollamount="4px" behavior="" direction="">
          {
            currentName
          }
        </marquee>
      </div>
    </div>
  )
}
