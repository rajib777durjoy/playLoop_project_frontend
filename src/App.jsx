import React from 'react';
import Home from './pages/Home';
import { Route, Routes } from 'react-router';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';

const App = () => {
 return (<>
 <Routes>
  <Route path='/' element={<Home />} />
  <Route path='/signIn' element={<SignIn/>} />
  <Route path='/signUp' element={<SignUp/>} />
</Routes>
 </>)
};

export default App;