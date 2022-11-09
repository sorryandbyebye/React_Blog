import React, { useState, useEffect } from 'react'
import '../less/all.less'
import { Button, Popover, Collapse } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios'
const { Panel } = Collapse;
export default function Daily() {
  const know = '分享些日常，或者学到的。偶尔更新'
  const onChange = (key) => {
    console.log(key);
  };
  const [dailys, setDailys] = useState([])
  // 获取音乐函数
  const getDailys = async () => {
    let data = []
    await axios.get('/api/daily')
      .then(res => {
        data = res.data
      })
    console.log(data);
    setDailys(data.reverse())
    // setRefs(new Array(data.length))
  }
  // 用屏蔽eslint警告，警告原因调用了外部函数没有依赖
  useEffect(() => {
    getDailys()
  }, [])//eslint-disable-line
  return (
    <div className='all daily'>
      <div className='title0'>
        <div className='title1'>日常分享</div>
        <Popover content={know} title="Title" trigger="click">
          <Button className='commentNote'>观看悉知</Button>
        </Popover>
        <Link to={'/Home'} className='backToHome'><Button>返回</Button></Link>
      </div>
      <div className="dailysList">
        <Collapse accordion defaultActiveKey={[]} onChange={onChange} >
          {
            dailys.map((item, index) => {
              // console.log(item);
              return (
                <Panel header={item.name} key={index}>
                  <div className='dailyItem'>
                    <p className="dailyName">{item.name}</p>
                    {
                      item.descriptions.map((description, index1) => {
                        return (
                          <div className='description' key={index1}>
                            {description}
                          </div>
                        )
                      })

                    },
                    {
                      item.pics.map((pic, index2) => {
                        return (
                          <center className='image' key={index2}>
                            <img src={'http://lazyzz.cn/' + pic} alt="pic" />
                          </center>
                        )
                      })
                    }
                    {/* <div className="description">{item.description}</div> */}
                  </div>
                </Panel>
              )
            })
          }
        </Collapse>
      </div>
    </div>
    // <div>y</div>
  )
}
