import React, { useEffect, useState } from 'react';
import { NodeIndexOutlined, HomeOutlined, ShareAltOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Popconfirm, } from 'antd';
import './components.less'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import jwtDecode from 'jwt-decode';

function Header(props) {


  const logout = () => {
    // 问题：一进来就触发了这个
    console.log('dengchu');
    localStorage.removeItem('eleToken')
    localStorage.removeItem('picLike')

    props.setUser()
    props.setAuthenticated()
  }
  const items = [
    {
      label: (
        <div>0.0</div>
      ),
      key: 'Warning'
    },
    {
      label: (
        <div>
          <HomeOutlined className='title' />
          首页
        </div>
      ),
      key: 'Home',
      // icon: <HomeOutlined />,
    },
    {
      label: (
        <div >
          <NodeIndexOutlined className='title' />
          学习路线
        </div>
      ),
      key: 'Study',
      // icon: <NodeIndexOutlined />,
    },
    {
      label: (
        <div >
          <ShareAltOutlined className='title' />
          知识分享
        </div>
      ),
      key: 'Share',
      // icon: <ShareAltOutlined />,
    },
    {
      // label: (
      //   <Link to='/Aboutme'>Aboutme</Link>
      // ),
      label: (
        <div >
          <UserOutlined className='title' />
          Aboutme
        </div>
      ),
      key: 'Aboutme',
      // icon: <UserOutlined />,
    },
    {
      label: (
        <div>
          {
            function () {
              if (props.isAuthenticated) {
                return (
                  <div>
                    <Popconfirm placement="bottom" title={'是否退出登录？'} onConfirm={logout} okText="Yes" cancelText="No">
                      <div>{props.userName}</div>
                    </Popconfirm>
                  </div>
                )
              } else {
                return (
                  <div>登录/注册</div>
                )
              }
            }()
          }
        </div>
      ),
      key: props.isAuthenticated ? 'User' : 'Login',

    },
  ];
  const [current, setCurrent] = useState('Home');
  const navigate = useNavigate()
  // navigate('/Home');
  const location = useLocation()
  useEffect(() => {
    // const navigate = useNavigate()
    let path = location.pathname
    // console.log(path);
    // console.log(path.split('/')[1])
    // 判断是否为空
    if (path === '/') {
      window.location.pathname = '/Home'
    }
    // let key = path.split('/')[1] === '' ? 'Home' : path.split('/')[1]
    // console.log(key);
    // setCurrent(key)
    // navigate('/' + key);

    // setCurrent(key)
  }, [location.pathname])
  // useEffect(() => {
  //   console.log(props.isAuthenticated);
  // }, [props.isAuthenticated])

  const isEmpty = (value) => {
    // Object.keys(value)给对象里面的内容进行排序
    // 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，
    // 数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致
    // .trim()去掉string里面头尾空格
    return (
      value === undefined ||
      value === null ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (typeof value === 'string' && value.trim().length === 0)
    )
  }

  useEffect(() => {
    const tok = (localStorage.getItem('eleToken'))
    if (tok) {
      const decode = jwtDecode(tok)
      // isEmpty(tok)
      props.setAuthenticated(!isEmpty(decode))
      props.setUser(decode)
      props.setUserName(decode.name)
      // console.log(props.user);
    }
  }, [])//eslint-disable-line
  const onClick = (e) => {
    // console.log('click ', e);
    // 点击header的第一个选项时，跳转到home
    switch (e.key) {
      // case 'Warning':
      //   e.key = 'Home'
      //   navigate('/' + e.key);
      //   setCurrent(e.key);
      //   break;
      case 'Login':
        if (location.pathname === '/Register') {

        } else {
          const historyPath = location.pathname.split('/')[1]
          if (historyPath === 'Project') {
            localStorage.setItem('backPath', '/Project/shareProject')

          } else if (historyPath === 'Login') {

          } else {
            localStorage.setItem('backPath', location.pathname)
          }

        }
        navigate('/' + e.key);
        setCurrent(e.key);
        break;
      case 'User':
        console.log(props);
        break
      default:
        navigate('/' + e.key);
        setCurrent(e.key);
        break;
    }
  };
  return (
    <div id='menu'>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} overflowedIndicator="" />
    </div>
  )
}

// 状态映射：将reducer中的state映射成props，让开发者可以在组件中使用props.num
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
    // 用户的信息
    user: state.user,
    picLike: state.picLike,
    userName: state.userName

  }
}
// 事件派发映射：将reducer中的事件映射成props。让开发者可以在组件中使用props.leijia()
// 去实现num的累加
const mapDispatchToProps = (dispatch) => {
  return {
    setAuthenticated(res) {
      // console.log('setAuthenticated');
      const action = { type: 'setAuthenticated', value: res }
      dispatch(action)
    },
    setUser(decode) {
      // console.log('执行了setUser');
      const action = { type: 'setUser', value: decode }//函数名称，传值
      dispatch(action)
    },
    setUserName(name) {
      const action = { type: 'setUserName', value: name }//函数名称，传值
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)