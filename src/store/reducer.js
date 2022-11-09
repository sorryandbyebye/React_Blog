// const types = {
//   SET_AUTHENTICATED: 'SET_AUTHENTICATED',
//   SET_USER: 'SET_USER'
// }
const defaultState = {
  // 是否登录
  isAuthenticated: false,
  // 用户的信息
  user: {},
  userName: '',
  picLike: []
}
//  action = { type: 'addNum', value: 2 }//函数名称，传值
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))//深拷贝
  switch (action.type) {
    case 'setAuthenticated':
      // console.log('进入了redux');
      if (action.value) newState.isAuthenticated = action.value
      else newState.isAuthenticated = false
      break
    case 'setUser':
      // console.log('进入了redux');
      if (action.value) {
        // console.log(action.value);
        newState.user = action.value
        // console.log(newState.user);
      }
      else { newState.user = '' }
      break;
    case 'setPicLike':
      newState.picLike = action.value
      break
    case 'addpicLike':
      if (!newState.picLike.includes(action.value)) {
        newState.picLike.push(action.value)
      }
      // newState.picLike.push(action.value)
      break;
    case 'deletepicLike':
      var a = newState.picLike.indexOf(action.value)
      newState.picLike.splice(a, 1)
      break;
    case 'setUserName':
      if (action.value) {
        newState.userName = action.value
        // console.log(newState.user);
      }
      else { newState.userName = '' }
      break;

    default:
      break;
  }
  return newState
}