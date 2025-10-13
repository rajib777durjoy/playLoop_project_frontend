
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineSwitchAccount } from 'react-icons/md';
import { TiUserAddOutline } from "react-icons/ti";
import { useDispatch, useSelector } from 'react-redux';
import { FiLogOut } from "react-icons/fi";
import { SiYoutubeshorts } from "react-icons/si";
import { useNavigate } from 'react-router';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { showCustomAlert } from './CustomAlert';
import { setuserData } from '../redux/userSlice';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useEffect } from 'react';
const Profile = () => {
    const { userData} = useSelector(state => state.user);
    const {channelData} = useSelector(state => state.user);
    const provider = new GoogleAuthProvider();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    console.log("userData::", userData);
    console.log("channelData::", channelData);
    const useAxios = useAxiosPublic();
    const handleSignOut = async () => {
        try {
            const result = await useAxios.get('/api/auth/signout');
            dispatch(setuserData(null))
            console.log(result.data)
            showCustomAlert("SignOut Successfully")
        } catch (err) {
            console.log(err)
            showCustomAlert("SignOut Error")
        }

    };
   

    const handleGoogleAuth = async () => {
        try {
            const googleAuth = await signInWithPopup(auth, provider);
            if (googleAuth?.user?.email) {
                const userInfo = {
                    userName: googleAuth?.user?.displayName,
                    email: googleAuth?.user?.email,
                    photoUrl: googleAuth?.user?.photoURL
                }
                const result = await useAxios.post('/api/auth/Authgoogle',userInfo)
                console.log('resultMessage::', result.data)
                dispatch(setuserData(result.data))
                showCustomAlert("Google Authentication Successfully")
            }
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <div >
            <div className='absolute right-5 top-10 mt-2 w-72 bg-[#212121] text-white rounded-xl shadow-lg z-50 hidden md:inline'>
                {userData && <div className='flex items-center gap-3 p-4 border-b border-gray-700'>
                    <img src={userData?.photoUrl} alt="profile" className='w-12 h-12 flex items-center justify-center rounded-full object-cover border-1 border-gray-700 ' />
                    <div>
                        <h4 className='font-semibold'>{userData?.name}</h4>
                        <p className='text-sm text-gray-400'>{userData?.email}</p>
                        <p onClick={() => userData ? navigate('/viewChannel') : navigate('/createChannel')} className='text-sm text-blue-400 cursor-pointer hover:underline'>{userData._id == channelData?.owner?._id ? "view channel" : "create channel"}</p>
                    </div>
                </div>}
                <div className='flex flex-col py-2'>
                    <button onClick={handleGoogleAuth} className='flex items-center gap-3 px-4 py-2 hover:bg-gray-700 '><FcGoogle />SignIn with Google</button>
                    <button onClick={() => navigate('/signUp')} className='flex items-center gap-3 px-4 py-2 hover:bg-gray-700 '><TiUserAddOutline />Create  new Account</button>
                    <button onClick={() => navigate('/signIn')} className='flex items-center gap-3 px-4 py-2 hover:bg-gray-700 '><MdOutlineSwitchAccount />SignIn with Other Account</button>
                    {userData?.Channel && <button className='flex items-center gap-3 px-4 py-2 hover:bg-gray-700 '><SiYoutubeshorts className='w-5 h-5 text-orange-400' />PL Studio</button>}
                    {userData && <button onClick={() => handleSignOut()} className='flex items-center gap-3 px-4 py-2 hover:bg-gray-700 '><FiLogOut />Sign Out</button>}
                </div>
            </div>

        </div>
    );
};

export default Profile;