import { Button, Form, Input, message } from 'antd';
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import React from 'react'
import './less/all.less'
import 'axios'
import axios from 'axios';
function Login(props) {
  const navigate = useNavigate()
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
  const onFinish = (values) => {
    console.log('Success:', values);
    axios.post('/api/users/login', values).then(res => {
      // console.log(res);
      const { token } = res.data
      // 在localStorage设置一个eleToken来存放token
      localStorage.setItem('eleToken', token)
      // 解析token
      const decode = jwtDecode(token)

      // this.$store.dispatch('setAuthenticated', !this.isEmpty(decode))
      // this.$store.dispatch('setUser', decode)
      // console.log(isEmpty(decode));
      props.setAuthenticated(!isEmpty(decode))
      props.setUser(decode)
      // console.log(decode);
      props.setUserName(decode.name)
      // console.log(decode.name);
      props.setPicLike(decode.userPicLike)
      // console.log(decode)
      // 设置localStorage的picLike，这样就可以显示每个用户点赞了哪个图片
      // console.log('decode.userPicLike', decode.userPicLike);
      localStorage.setItem('picLike', JSON.stringify(decode.userPicLike))
      // 设置了一个变量backPath，这样可以登录后返回原来的页面
      message.success('登录成功，正在为您跳转页面')
      setTimeout(() => {
        navigate(localStorage.getItem('backPath'))
      }, 1000)
      // navigate(localStorage.getItem('backPath'))
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='all login'>
      <div className='loginForm'>
        <div className='title'>登录</div>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 12,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              {
                type: 'email',
                required: true,
                message: '请输入邮箱,',
                trigger: 'blur',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
                trigger: 'blur',

              },
              {
                min: 6, max: 30, message: '长度在6-30个字符之间', trigger: 'blur'
              }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div className="tirarea">
          <p>还没有账号？，现在<Link to="/Register" className="color">注册</Link>或者<Link to={localStorage.getItem('backPath')} className="color">继续以游客身份游览</Link></p>
        </div>
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
    },
    setPicLike(picLike) {
      const action = { type: 'setPicLike', value: picLike }//函数名称，传值
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)