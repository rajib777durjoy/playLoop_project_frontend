
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineSwitchAccount } from 'react-icons/md';
import { TiUserAddOutline } from "react-icons/ti";
import { useSelector } from 'react-redux';
import { FiLogOut } from "react-icons/fi";
import { SiYoutubeshorts } from "react-icons/si";
import { useNavigate } from 'react-router';
import useAxiosPublic from '../hooks/useAxiosPublic';
const Profile = () => {
    const {userData} = useSelector(state=>state.user);
    const navigate = useNavigate();
    console.log("userData::",userData);
    const useAxios= useAxiosPublic()
    const handleSignOut =async()=>{
     const result =await useAxios.get('/api/auth/signout');
     console.log(result.data)
    };
    return (
        <div >
           {userData && <div className='absolute right-5 top-10 mt-2 w-72 bg-[#212121] text-white rounded-xl shadow-lg z-50 hidden md:flex'>
             <div className='flex items-center gap-3 p-4 border--b border-gray-700'>
                <img src={userData?.photoUrl} alt="profile" className='w-12 h-12 flex items-center justify-center rounded-full object-cover border-1 border-gray-700 ' />
                <div>
                <h4 className='font-semibold'>{userData?.name}</h4>
                <p className='text-sm text-gray-400'>{userData?.email}</p>
                <p className='text-sm text-blue-400 cursor-pointer hover:underline'>{userData?.Channel?"view channel":"create channel"}</p>
             </div>
             </div>
             <div className='flex flex-col py-2'>
              <button className='flex items-center gap-3 px-4 py-2 hover:bg-gray-700 '><FcGoogle/>SignIN with Google</button>
              <button onClick={()=>navigate('/signUp')} className='flex items-center gap-3 px-4 py-2 hover:bg-gray-700 '><TiUserAddOutline />Create  new Account</button>
              <button onClick={()=>navigate('/signIn')} className='flex items-center gap-3 px-4 py-2 hover:bg-gray-700 '><MdOutlineSwitchAccount/>SignIN with Other Account</button>
              {userData?.Channel && <button className='flex items-center gap-3 px-4 py-2 hover:bg-gray-700 '><SiYoutubeshorts className='w-5 h-5 text-orange-400' />PL Studio</button>}
              {userData && <button onClick={()=>handleSignOut()} className='flex items-center gap-3 px-4 py-2 hover:bg-gray-700 '><FiLogOut />Sign Out</button>}
            </div>
            </div>}
            
        </div>
    );
};

export default Profile;