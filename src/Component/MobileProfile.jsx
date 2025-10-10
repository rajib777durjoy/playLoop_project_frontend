import React from 'react';
import { FaHistory } from "react-icons/fa";
import { FcGoogle } from 'react-icons/fc';
import { FiLogOut } from 'react-icons/fi';
import { FaList } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { GoVideo } from 'react-icons/go';
import { MdOutlineSwitchAccount } from 'react-icons/md';
import { SiYoutubeshorts } from 'react-icons/si';
import { TiUserAddOutline } from 'react-icons/ti';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const MobileProfile = () => {
    const {userData}=useSelector(state=>state.user);
    const navigate= useNavigate()
    return (
        <div className='md:hidden  bg-[#0f0f0f] text-white flex flex-col '>
            <div className='w-[100%] h-[50px]'></div>
           {/* top profile section */}
          {userData && <div className='p-4 flex items-center gap-4 border-b border-gray-800'>
             {userData?.photoUrl && <img src={userData?.photoUrl} alt='profile' className='w-16 h-16 rounded-full object-cover' />}
             <div className='flex flex-col'>
               <span>{userData?.userName}</span>
               <span>{userData?.email}</span>
               <p className='text-sm text-blue-400 cursor-pointer hover:underline'>{userData?.Channel ? "view channel":"create channel"}</p>
             </div>
           </div>}
           {/* auth button */}
           <div className='flex gap-2 p-4 border-b border-gray-800 overflow-auto'>
            <button className='bg-gray-800 text-nowrap px-3 py-1 rounded-2xl text-sm flex items-center justify-center gap-2'><FcGoogle className='text-xl' />SignIn with Google</button>
            <button className='bg-gray-800 text-nowrap px-3 py-1 rounded-2xl text-sm flex items-center justify-center gap-2'><TiUserAddOutline className='text-xl' />Create new Account</button>
            <button className='bg-gray-800 text-nowrap px-3 py-1 rounded-2xl text-sm flex items-center justify-center gap-2'><MdOutlineSwitchAccount className='text-xl' />SignIn with Other Account</button>
            <button className='bg-gray-800 text-nowrap px-3 py-1 rounded-2xl text-sm flex items-center justify-center gap-2'><SiYoutubeshorts className='text-xl' />PL Studio</button>
            <button  className='bg-gray-800 text-nowrap px-3 py-1 rounded-2xl text-sm flex items-center justify-center gap-2'><FiLogOut className='text-xl' />SignOut</button>
           </div>
           <div className='flex flex-col mt-[20px]'>
            <ProfileMenuItem icon={<FaHistory/>} text={"History"} onclick={()=>navigate('/history')} />
            <ProfileMenuItem icon={<FaList/>} text={"Playlist"} onclick={()=>navigate('/playlist')} />
            <ProfileMenuItem icon={<GoVideo/>} text={"Save Videos"} onclick={()=>navigate('/save_video')} />
            <ProfileMenuItem icon={<FaThumbsUp/>} text={"Like Video"} onclick={()=>navigate('/like_video')}/>
            <ProfileMenuItem icon={<SiYoutubeshorts/>} text={"PL Studio"} onclick={()=>navigate('studio')} />
           </div>
        </div>
    );
};

function ProfileMenuItem({icon,text,onclick}){
return (
    <button onclick={onclick} className='w-full rounded-2xl flex items-center gap-3 p-4 active:bg-[#272727] text-left'>
     <span className='text-lg'>{icon}</span>
     <span className='text-sm'>{text}</span>

    </button>
)
}


export default MobileProfile;