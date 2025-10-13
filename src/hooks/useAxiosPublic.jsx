import axios from 'axios';
import React from 'react';

const instance = axios.create({
  // baseURL:'http://localhost:8000', 
  baseURL:'https://backend-eight-mocha-14.vercel.app', 
  withCredentials:true
});
const useAxiosPublic = () => {
   return instance;
};

export default useAxiosPublic;