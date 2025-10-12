import React from 'react';
import { useSelector } from 'react-redux';
import { TfiVideoClapper } from "react-icons/tfi";
import { useNavigate } from 'react-router';
const ViewChannel = () => {
    const navigate= useNavigate();
    const {channelData}= useSelector(state=>state.user)
    return (
        <div className='flex flex-col gap-3'>
            {/* banner */}
            <div className='w-full h-50 bg-gray-700 relative mb-10 mt-10 rounded-lg border-lg border-1 border-gray-500 '>
                {channelData?.banner?(
                    <img className='w-full h-full object-cover rounded-lg' src={channelData?.banner} alt="" />
                ):(
                    <div className='w-full h-full bg-gradient-to-r from-gray-800 to-gray-900'>

                    </div>
                )}
            </div>
            <div className='px-10 py-8'>
              <div className='flex flex-col items-center'>
                <img src={channelData?.avatar} alt="" className='w-20 h-28 rounded-full object-cover -mt-14 border-4 border-gray-500' />
                <h1 className='text-2xl font-bold mt-3'>{channelData?.name}</h1>
                <p className='text-gray-400'>{channelData?.owner?.email}</p>
                <p className='text-sm text-gray-400 mt-1'>More about this channel...<span className='text-orange-400 cursor-pointer'>{channelData?.category}</span></p>

                <div className='flex gap-4 mt-4'>
                    <button onClick={()=>navigate('/UpdateChannel')} className='bg-white text-black px-4 py-1 rounded-full font-medium cursor-pointer active:bg-gray-900 active:text-white'>Customize channel</button>
                    <button className='bg-[#272727]  px-4 py-1 rounded-full font-medium cursor-pointer active:bg-gray-200 active:text-black'>Manage Videos</button>
                </div>
              </div>
              <div className='flex flex-col items-center mt-16 '>
                <TfiVideoClapper className='text-orange-400 text-6xl ' />
                <p className='mt-4 font-medium'>Create content on any device</p>
                <p className='text-gray-400 text-sm text-center'>Upload and record at home or on the go. Everything you make public will appear here.</p>
                <button onClick={()=>navigate('/CreatePage')}  className='bg-white text-black mt-4 px-5 py-1 rounded-full font-medium cursor-pointer'>+ Create</button>
              </div>
            </div>
        </div>
    );
};

export default ViewChannel;