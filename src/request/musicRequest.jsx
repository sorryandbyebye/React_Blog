import axios from 'axios'
const musicRequest = axios.create({
  withCredentials: true,
  baseURL: 'https://autumnfish.cn', // baseURL: 'https://autumnfish.cn',http://bao.lqjhome.cn:3000
  headers: {
    "Content-Type": "application/json; charset=UTF-8;"
  }
})
export default musicRequest
