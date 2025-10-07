import axios from 'axios';
import React from 'react';

const instance = axios.create({
  baseURL:'http://localhost:8000', 
  withCredentials:true
});
const useAxiosPublic = () => {
   return instance;
};

export default useAxiosPublic;