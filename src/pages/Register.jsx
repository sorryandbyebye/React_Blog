import React from 'react'
import { Button, Form, Input, message, Select } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
// import React from 'react'
import './less/all.less'
import 'axios'
import axios from 'axios';
export default function Register() {
  const navigate = useNavigate()
  const { Option } = Select;
  const onFinish = (values) => {
    console.log('Success:', values);
    axios.post('/api/users/register', values).then(
      res => {
        if (res.status === 200) {
          message.success('注册成功')
          setTimeout(() => {
            navigate('/Login')
          }, 500)
        }
      }
    )
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='all register'>
      <div className='registerForm'>
        <div className='title'>注册</div>
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
            label="用户名"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入用户名',
                trigger: 'blur',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              {
                type: 'email',
                required: true,
                message: '请输入邮箱',
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
            label="确认密码"
            name="password2"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: '请输入密码',
                trigger: 'blur',
              },
              {
                min: 6, max: 30, message: '长度在6-30个字符之间', trigger: 'blur'
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('两次密码不相同'));
                },
              })
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="identity"
            label="选择身份"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please select your country!',
              },
            ]}
          >
            <Select placeholder="Please select a country">
              <Option value="employee">用户</Option>

            </Select>
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
          <p>已经有账号？，现在<Link to="/Login" className="color">登录</Link>或者<Link to={localStorage.getItem('backPath')} className="color">继续以游客身份游览</Link></p>
        </div>
      </div>
    </div>
  )
}
