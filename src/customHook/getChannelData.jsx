
import { useDispatch } from 'react-redux';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { setChannelData } from '../redux/userSlice';
import { useEffect } from 'react';

const getChannelData = () => {
    const dispatch= useDispatch();
    const useAxios= useAxiosPublic();
    useEffect(()=>{
    const fetchChannel = async ()=>{
        try{
         const result = await useAxios.get('/api/getChannel')
         console.log(result.data)
         dispatch(setChannelData(result.data))
        }catch(err){
        console.log(err)
         dispatch(setChannelData(null))
        } 
    }
    fetchChannel()
    },[])   
};

export default getChannelData;