import React, { Children } from 'react';
import Home from './pages/Home';
import { Navigate, Route, Routes } from 'react-router';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import CustomAlert, { showCustomAlert } from './Component/CustomAlert';
import Shorts from './pages/Shorts/Shorts';
import GetCurrentUser from './customHook/getCurrentUser';
import MobileProfile from './Component/MobileProfile';
import ForgetPassword from './pages/ForgetPassword';
import CreateChannel from './pages/Channel/CreateChannel';
import ViewChannel from './pages/Channel/ViewChannel';
import getChannelData from './customHook/getChannelData';
import UpdateChannel from './pages/Channel/UpdateChannel';
import { useSelector } from 'react-redux';
import CreatePage from './pages/Shorts/CreatePage';

const ProtectRoute = ({userData,children})=>{
  if(!userData){
    showCustomAlert("please sign up first to use this feature!")
    return <Navigate to={'/'} replace />
  }
  return children
}
const App = () => {
  GetCurrentUser()
  getChannelData()
  const {userData}= useSelector(state=>state.user)
  return (<>
    <CustomAlert />
    <Routes>
      <Route path='/' element={<Home />}>
        <Route path='/shorts' element={<ProtectRoute userData={userData}><Shorts/></ProtectRoute>} />
        <Route path='/mobileProfile' element={<ProtectRoute userData={userData}><MobileProfile/></ProtectRoute>} />
        <Route path='/viewChannel' element={<ProtectRoute userData={userData}><ViewChannel/></ProtectRoute>} />
        <Route path='/UpdateChannel' element={<ProtectRoute userData={userData}><UpdateChannel/></ProtectRoute>} />
        <Route path='/CreatePage' element={<ProtectRoute userData={userData}><CreatePage/></ProtectRoute>} />
      </Route>
      
      <Route path='/signIn' element={<SignIn />} />
      <Route path='/signUp' element={<SignUp />} />
      <Route path='/forgetpass' element={<ForgetPassword />} />
      <Route path='/createChannel' element={<ProtectRoute userData={userData}><CreateChannel/></ProtectRoute>} />
    </Routes>
  </>)
};

export default App;