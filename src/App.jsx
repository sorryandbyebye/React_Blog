// import logo from './logo.svg';
// import { connect } from 'react-redux'
import { Layout } from 'antd';
import './App.less';
import Header from './components/Header'
import MusicBox from './components/MusicBox';
// import Content from './components/Content';
import { Outlet } from 'react-router-dom'
function App() {

  return (
    <Layout id="app" >
      <Header></Header>
      <div>
        <Outlet></Outlet>
        <MusicBox></MusicBox>
        <div className='foot'><footer>备案号：粤ICP备2022013598号</footer></div>
      </div>

      {/* <footer>备案号:粤ICP备2022013598号</footer> */}
    </Layout>

  );
}


export default App;
// // 状态映射：将reducer中的state映射成props，让开发者可以在组件中使用props.num
// const mapStateToProps = (state) => {
//   return {
//     isAuthenticated: state.isAuthenticated,
//     // 用户的信息
//     user: state.user,
//     picLike: state.picLike
//   }
// }
// // 事件派发映射：将reducer中的事件映射成props。让开发者可以在组件中使用props.leijia()
// // 去实现num的累加
// const mapDispatchToProps = (dispatch) => {
//   return {
//     leijia() {
//       const action = { type: 'addNum', value: 2 }//函数名称，传值
//       dispatch(action)
//     }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App)

