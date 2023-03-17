import React, { useState, useEffect, useRef, useCallback } from 'react'
import { connect } from 'react-redux'
import '../less/all.less'
import { Popover, Button, Image, Input } from 'antd'
import { Link } from 'react-router-dom';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component'
const { TextArea } = Input

function NicePic(props) {
  // 发送评论
  const senDiscuss = (e, picture, user) => {
    console.log(picture);
    console.log(user);
    // 创建个结构体传数据
    const discussion = {
      id: '',
      comment: []
    }
    discussion.id = picture._id
    discussion.comment = picture.discuss
    // 创建一个commentInfo来存储留言的信息包括用户名和用户发言
    const commentInfo = {}
    commentInfo.discussUser = user.name
    commentInfo.discussComment = e.target.value
    var sendDate = new Date()
    commentInfo.discussDate = sendDate.getFullYear() + '-' + (sendDate.getMonth() + 1) + '-' + sendDate.getDate()
    // 把commentInfo插入到comment的前面
    discussion.comment.unshift(commentInfo)
    // picture.discuss.unshift(commentInfo)
    console.log(discussion)
    axios.post('api/nicpic/uploadDiscuss', discussion)
    console.log('传输了');

    //评论需要实时更新
  }
  var Content = useCallback((picture, user) => {
    return (
      <div className='picPopover'>
        <div className='popoverMessage'>
          <div>
            {
              user.name ? user.name : '神秘人：'
            }
          </div>
        </div>
        <div className='popoverInputbox'>
          <TextArea
            showCount
            // className='popoverInputbox'
            // rows={4}
            placeholder="按回车键发送内容"
            // maxLength={200}
            // onChange={(e) => getNewText(e)}
            // value={text}
            // onKeyUp={(e) => e.key === 'Enter' ? senDiscuss(e, picture, user) : null}
            onPressEnter={(e) => senDiscuss(e, picture, user)}
          />
          {/* <Button onClick={() => { senDiscuss(picture, user) }}>发送</Button> */}
        </div>
        <ul className='popoverUl'>
          {
            picture.discuss.map((discuss, discussIndex) => (
              <li className='popoverList' key={discussIndex}>
                <div className="popoverListInfo">
                  {/* 该留言的用户名 */}
                  <span className='popoverCommentName'>
                    {
                      discuss.discussUser ? discuss.discussUser + ':' : '神秘人 :'
                    }
                  </span>
                  {/* 该留言的内容 */}
                  <span>
                    {
                      discuss.discussComment
                    }
                  </span>
                  {/* 该留言的时间 */}
                  <div className="popoverCommentDate">
                    {
                      discuss.discussDate
                    }
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
        <div className='popoverMessage'>留言</div>

      </div>
    )
  }, [])

  // 发送评论
  // function Content(picture, user) {
  //   // const [picDiscuss, setPicDiscuss] = useState(picture.discuss);
  //   // 发送评论
  //   const senDiscuss = (e, picture, user) => {
  //     console.log(picture);
  //     console.log(user);
  //     // 创建个结构体传数据
  //     const discussion = {
  //       id: '',
  //       comment: []
  //     }
  //     discussion.id = picture._id
  //     discussion.comment = picture.discuss
  //     // 创建一个commentInfo来存储留言的信息包括用户名和用户发言
  //     const commentInfo = {}
  //     commentInfo.discussUser = user.name
  //     commentInfo.discussComment = e.target.value
  //     var sendDate = new Date()
  //     commentInfo.discussDate = sendDate.getFullYear() + '-' + (sendDate.getMonth() + 1) + '-' + sendDate.getDate()
  //     // 把commentInfo插入到comment的前面
  //     discussion.comment.unshift(commentInfo)
  //     // picture.discuss.unshift(commentInfo)
  //     console.log(discussion)
  //     axios.post('api/nicpic/uploadDiscuss', discussion)
  //     console.log('传输了');

  //     //评论需要实时更新
  //   }
  //   return (
  //     <div className='picPopover'>
  //       <div className='popoverMessage'>
  //         <div>
  //           {
  //             user.name ? user.name : '神秘人：'
  //           }
  //         </div>
  //       </div>
  //       <div className='popoverInputbox'>
  //         <TextArea
  //           showCount
  //           // className='popoverInputbox'
  //           // rows={4}
  //           placeholder="按回车键发送内容"
  //           // maxLength={200}
  //           // onChange={(e) => getNewText(e)}
  //           // value={text}
  //           // onKeyUp={(e) => e.key === 'Enter' ? senDiscuss(e, picture, user) : null}
  //           onPressEnter={(e) => senDiscuss(e, picture, user)}
  //         />
  //         {/* <Button onClick={() => { senDiscuss(picture, user) }}>发送</Button> */}
  //       </div>
  //       <ul className='popoverUl'>
  //         {
  //           picture.discuss.map((discuss, discussIndex) => (
  //             <li className='popoverList' key={discussIndex}>
  //               <div className="popoverListInfo">
  //                 {/* 该留言的用户名 */}
  //                 <span className='popoverCommentName'>
  //                   {
  //                     discuss.discussUser ? discuss.discussUser + ':' : '神秘人 :'
  //                   }
  //                 </span>
  //                 {/* 该留言的内容 */}
  //                 <span>
  //                   {
  //                     discuss.discussComment
  //                   }
  //                 </span>
  //                 {/* 该留言的时间 */}
  //                 <div className="popoverCommentDate">
  //                   {
  //                     discuss.discussDate
  //                   }
  //                 </div>
  //               </div>
  //             </li>
  //           ))
  //         }
  //       </ul>
  //       <div className='popoverMessage'>留言</div>

  //     </div>
  //   )
  // }


  const pictest = useRef(null)
  // 用于显示的列表
  const [allTweets, setAllTweets] = useState([]);
  // 所有的图片列表
  const [picList, setPicList] = useState([]);
  // 控制是否可以继续加载
  const [hasMore, setHasmore] = useState(true);
  // const [lastPosition, setLastPosition] = useState(0);
  // 控制一开始显示多少个图片，
  const [num, setNum] = useState(12);

  // const perPage = 4;
  const getPic = async () => {
    let data = []
    await axios.get('/api/nicpic')
      .then(res => {
        data = res.data.reverse()
      })
      .catch(err => {
        console.log(err)
      })
    setAllTweets(data.slice(0, 12))
    setPicList(data)
  }
  // 核心瀑布流的实现
  const waterfall = () => {
    var items = pictest.current.children
    // console.log(pictest.current);
    // var itemWidth = 270
    var columns1 = 4
    var arr = []
    // 距离左右边缘的距离固定，item的缝隙固定
    var gapToTop = 10 // 与顶部之间的距离，避免盒子重合
    var gap = 10 // 上下间距
    var gapBetween = 10 // 左右item之间的距离
    var gapToSide = 10 // 到masonry左、右边缘的距离
    // var calcItemWidth = (this.$refs.pictest.clientWidth - 2 * gapToSide - (columns1 - 1) * gapBetween) / 4
    // console.log(this.$refs.pictest.clientWidth)
    // 实现左右对称
    // items[0].style.left = gapToSide + 'px'
    // items[columns1 - 1].style.right = gapToSide + 'px'
    var calcItemWidth = (pictest.current.clientWidth - 2 * gapToSide - (columns1 - 1) * gapBetween) / 4
    // console.log(calcItemWidth);
    // this.itemWidth = calcItemWidth + 'px'
    // setItemWidth(calcItemWidth + 'px')
    for (var i = 0; i < items.length; i++) {

      items[i].style.width = calcItemWidth + 'px'
      // console.log(calcItemWidth)
      // console.log(items[i].offsetHeight, items[i].clientHeight, items[i].offsetWidth, items[i].clientWidth)
      if (i < columns1) {
        // console.log(gapToTop + 'px');
        items[i].style.top = gapToTop + 'px'
        // 调节第一行偏移量，让整个瀑布流区域居中
        // items[i].style.left = (calcItemWidth + gapBetween) * i + gapToSide + 'px'
        items[i].style.left = (calcItemWidth + gapBetween) * i + gapToSide + 'px'
        // console.log(items[i].style.top)
        arr.push(items[i].offsetHeight + gap)
        // console.log(items[i].offsetHeight)
      } else {
        var minHeight = arr[0]
        var index = 0
        for (var j = 0; j < arr.length; j++) {
          if (minHeight > arr[j]) {
            minHeight = arr[j]
            index = j
          }
        }
        items[i].style.top = arr[index] + gapToTop + 'px'
        // console.log(arr[0])
        items[i].style.left = items[index].offsetLeft + 'px'
        arr[index] = arr[index] + items[i].offsetHeight + gap
      }
    }
    // console.log(Math.max(...arr))
    pictest.current.style.height = Math.max(...arr) + 25 + 'px'
    // console.log(Math.max(...arr) + 25 + 'px');
  }

  // 加载更多函数
  const loadProducts = useCallback(() => {
    // console.log(allTweets.length, picList.length);
    if (allTweets.length >= picList.length && allTweets.length > 0 && picList.length > 0) {
      setHasmore(false)
      return
    }
    setTimeout(() => {
      // console.log(allTweets);
      let toNum = num + 8
      // console.log(toNum);
      if (toNum >= picList.length) {
        toNum = picList.length
      }

      const appendPicList = picList.slice(num, toNum)
      setAllTweets([...allTweets, ...appendPicList]);
      setNum(toNum)
      // setAllTweets((prev) => [...prev, ...prev]);

    }, 2000);

    // setLastPosition(lastPosition + perPage);
  }, [allTweets, picList, num]);
  // 有更新时用瀑布流
  useEffect(() => {
    waterfall()
  }, [allTweets])
  // 刚开始获取图片对象
  useEffect(() => {
    window.scrollTo(0, 0)
    if (!localStorage.getItem('picLike')) {
      localStorage.setItem('picLike', JSON.stringify([]))
    }
    // console.log(props.user.userPicLike);
    // localStorage.setItem('picLike', props.picLike)
    // props.setPicLike(JSON.parse(localStorage.getItem('picLike')))
    setHasmore(true)
    getPic()
  }, [])
  useEffect(() => {
    // window.scrollTo(0, 0)
    if (!localStorage.getItem('picLike')) {
      localStorage.setItem('picLike', JSON.stringify([]))
    }
    // console.log(props.user.userPicLike);
    // localStorage.setItem('picLike', props.picLike)
    // props.setPicLike(JSON.parse(localStorage.getItem('picLike')))
    setHasmore(true)
    getPic()
  }, [Content])
  // useEffect(() => {
  //   getPic()
  // }, [Content])
  // 监听页面大小变化
  useEffect(() => {
    // console.log(props.user)
    window.addEventListener('resize', () => {

      waterfall()
    })

    return () => {
      // 组件销毁时移除监听事件
      window.removeEventListener('resize', () => {
        waterfall()
      });
    }
  }, [])
  // 点击喜欢变色，用localStorage存储。
  const like = (index) => {
    // console.log(pictest.current.children);
    let picobj = pictest.current.children[index].children[2].children[0]
    if (picobj.style.color !== 'rgb(248, 101, 96)') {
      picobj.style.color = 'rgb(248, 101, 96)'
      const newNum = parseInt(picobj.childNodes[1].data) + 1
      picobj.childNodes[1].data = newNum
      axios.post('api/nicpic/uploadLike', { id: allTweets[index]._id, num: newNum })
      // console.log('id' + allTweets[index]._id);
      props.addpicLike(allTweets[index]._id)
      // console.log(localStorage.getItem('picLike'));
      let arr = JSON.parse(localStorage.getItem('picLike'))
      if (!arr.includes(allTweets[index]._id)) {
        arr.push(allTweets[index]._id)
        // console.log(arr.length);
        localStorage.setItem('picLike', JSON.stringify(arr))
      }
      // console.log(props.user);
      if (localStorage.getItem('eleToken')) {
        const changePicLike = {}
        changePicLike.id = props.user.id
        changePicLike.userPicLike = arr
        axios.post('/api/users/editPicLike', changePicLike)
      }
    } else {
      picobj.style.color = 'gray'
      const newNum = parseInt(picobj.childNodes[1].data) - 1
      picobj.childNodes[1].data = newNum
      axios.post('api/nicpic/uploadLike', { id: allTweets[index]._id, num: newNum })
      props.deletepicLike(allTweets[index]._id)
      let arr = JSON.parse(localStorage.getItem('picLike'))
      if (arr.includes(allTweets[index]._id)) {
        let a = arr.indexOf(allTweets[index]._id)
        arr.splice(a, 1)
        console.log(arr.length);
        localStorage.setItem('picLike', JSON.stringify(arr))
      }
      if (localStorage.getItem('eleToken')) {
        const changePicLike = {}
        // console.log(arr);
        changePicLike.id = props.user.id
        changePicLike.userPicLike = arr
        axios.post('/api/users/editPicLike', changePicLike)
      }
    }
    // console.log(pictest.current.children[index].children[2].children[0])
  }

  return (
    <div className='all nicepic'>
      <div className='title0'>
        <div className='title1'>好看的图片</div>
        <Popover content={'分享些图片。滚动时要慢一些。偶尔更新~'} title="Title" trigger="click">
          <Button className='commentNote'>观看悉知</Button>
        </Popover>
        <Link to={'/Home'} className='backToHome'><Button>返回</Button></Link>
      </div>
      <div className="picList">
        <InfiniteScroll
          dataLength={allTweets.length}
          next={loadProducts}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          scrollThreshold={0.4}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div
            ref={pictest}
            className='masonry'
          >
            {
              allTweets.map((picture, index) => (
                <div key={index} className="item">
                  <Image
                    className='picture'
                    src={'http://lazyzz.cn/' + picture.pic}
                    alt={picture.pic}
                    onLoad={waterfall}

                  />
                  <div className="picName">{picture.name}</div>
                  <div className="icon">
                    {/* JSON.parse(localStorage.getItem('picLike')).indexOf(picture._id) !== -1 ? 'color:rgb(248, 101, 96)' : 'color:gray' */}
                    <i className='iconfont like' style={localStorage.getItem('picLike').indexOf(picture._id) !== -1 ? { color: 'rgb(248, 101, 96)' } : { color: 'gray' }} onClick={() => { like(index) }}>&#xe622;{picture.like}</i>
                    <Popover
                      className='my-popover'
                      content={Content(picture, props.user)}
                      trigger="click"
                      placement="bottom"
                    >
                      <i className='iconfont comment' slot='reference'>&#xe615;</i>
                    </Popover>
                  </div>
                </div>
              ))
            }
          </div>
        </InfiniteScroll>
      </div>
    </div >

  )
}

// 状态映射：将reducer中的state映射成props，让开发者可以在组件中使用props.num
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
    // 用户的信息
    user: state.user,
    userName: state.userName,
    picLike: state.picLike
  }
}
// 事件派发映射：将reducer中的事件映射成props。让开发者可以在组件中使用props.leijia()
// 去实现num的累加
const mapDispatchToProps = (dispatch) => {
  return {
    addpicLike(res) {
      // console.log('res', res);
      const action = { type: 'addpicLike', value: res }
      dispatch(action)
    },
    deletepicLike(res) {
      const action = { type: 'deletepicLike', value: res }
      dispatch(action)
    },
    setPicLike(res) {
      const action = { type: 'setPicLike', value: res }
      dispatch(action)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NicePic)