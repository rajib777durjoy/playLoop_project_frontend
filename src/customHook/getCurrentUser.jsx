import React, { useEffect } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useDispatch } from 'react-redux';
import {setuserData} from "../redux/userSlice"

const GetCurrentUser = () => {
    const useAxios= useAxiosPublic();
    const dispatch= useDispatch()
    useEffect(()=>{
        const fetchUser = async ()=>{
            try{
          const result= await useAxios.get('/api/getuser');
          dispatch(setuserData(result.data))
          console.log(result.data)
            }catch (err){
            console.log('user error',err)
            dispatch(setuserData(null))
            }
        }
        fetchUser()
    },[])
};

export default GetCurrentUser;