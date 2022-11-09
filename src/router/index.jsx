// import React from 'react'
import App from '../App.jsx'
import Home from '../pages/Home.jsx'
import Aboutme from '../pages/Aboutme.jsx'
import Share from '../pages/Share.jsx'
import Study from '../pages/Study.jsx'
import Daily from '../pages/Daily/Daily.jsx'
import Music from '../pages/Music/Music.jsx'
import NicePic from '../pages/NicePic/NicePic.jsx'
import Project from '../pages/Project/Project.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import Warning from '../pages/Warning.jsx'
import MaskDetecttfjs from '../pages/MaskDetecttfjs/MaskDetecttfjs.jsx'
// import Header from '../components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { Provider } from 'react-redux'
// import store from '../store/index.js'
// import { persistor } from '../store/index.js'
// import { PersistGate } from 'redux-persist/lib/integration/react'

export default function BaseRouter() {

  return (

    <BrowserRouter>
      {/* <Header></Header> */}
      <Routes>
        <Route path='/' element={<App />}>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/Warning" element={<Warning />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/Aboutme" element={<Aboutme />}></Route>
          <Route path="/Share" element={<Share />}></Route>
          <Route path="/Study" element={<Study />}></Route>
          <Route path="/Daily" element={<Daily />}></Route>
          <Route path="/Music" element={<Music />}></Route>
          <Route path="/NicePic" element={<NicePic />}></Route>
          <Route path="/Project/:id" element={<Project />}></Route>
        </Route>
        <Route path='/MaskDetecttfjs' element={<MaskDetecttfjs />}></Route>
      </Routes>
    </BrowserRouter>

  )
}
