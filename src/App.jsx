import React from 'react';
import Home from './pages/Home';
import { Route, Routes } from 'react-router';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import CustomAlert from './Component/CustomAlert';

const App = () => {
 return (<>
 <CustomAlert/>
 <Routes>
  <Route path='/' element={<Home />} />
  <Route path='/signIn' element={<SignIn/>} />
  <Route path='/signUp' element={<SignUp/>} />
</Routes>
 </>)
};

export default App;