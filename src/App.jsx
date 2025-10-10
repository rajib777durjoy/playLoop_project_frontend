import React from 'react';
import Home from './pages/Home';
import { Route, Routes } from 'react-router';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import CustomAlert from './Component/CustomAlert';
import Shorts from './pages/Shorts/Shorts';
import GetCurrentUser from './customHook/getCurrentUser';
import MobileProfile from './Component/MobileProfile';
import ForgetPassword from './pages/ForgetPassword';

const App = () => {
  GetCurrentUser()
  return (<>
    <CustomAlert />
    <Routes>
      <Route path='/' element={<Home />}>
        <Route path='/shorts' element={<Shorts/>} />
        <Route path='/mobileProfile' element={<MobileProfile/>} />
      </Route>
      
      <Route path='/signIn' element={<SignIn />} />
      <Route path='/signUp' element={<SignUp />} />
      <Route path='/forgetpass' element={<ForgetPassword />} />
    </Routes>
  </>)
};

export default App;