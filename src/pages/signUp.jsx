import React, { useState } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router";
import useAxiosPublic from '../hooks/useAxiosPublic';
import { ImSpinner9 } from "react-icons/im";
import { showCustomAlert } from '../Component/CustomAlert';
import { useDispatch } from 'react-redux';
import { setuserData } from '../redux/userSlice';

const SignUp = () => {
    const [step, setstep] = useState(1)
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [backendImage, setBackendImage] = useState(null);
    const [frontendImage, setFrontendImage] = useState(null);
    const [loading, Setloading] = useState(false)
    const useAxios = useAxiosPublic();
    const dispatch= useDispatch()

    let navigate = useNavigate();

    const handleImage = (e) => {
        const file = e.target.files[0];
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file));
        // console.log('image::', URL.createObjectURL(file))
    }
    const handleSubmit = async () => {
        if (!backendImage) {
            return showCustomAlert('please choose Profile image')
        }
        Setloading(true);
        const formData = new FormData();
        formData.append('userName', userName);
        formData.append("email", email);
        formData.append("password", Password);
        formData.append("photoUrl", backendImage);
        try {
            const result = await useAxios.post('/api/auth/signup',formData,{
                headers: { "Content-Type": "multipart/form-data" } });
            console.log('post result::', result?.data)
               dispatch(setuserData(result?.data))
                Setloading(false)
                showCustomAlert("Account Created")
                navigate('/');
                
        } catch (err) {
            Setloading(false)
            showCustomAlert("signUp error")
            console.log("signUp error",err)
        }
    }
    return (
        <div className='flex items-center justify-center min-h-screen bg-[#181818]'>
            <div className='bg-[#202124] rounded-2xl p-10 w-full max-w-md shadow-lg'>
                <div className='flex items-center mb-6  '>
                    <button onClick={() => navigate('/')} className='text-gray-300 hover:text-white hover:scale-150 me-2'>
                        <FaArrowLeftLong />
                    </button>
                    <span className='text-white text-2xl font-medium mx-2'>Create Account</span>
                </div>
                {step == 1 && (
                    <>
                        <h1 className='text-3xl text-white font-normal mb-5 flex items-center  gap-2'>
                            <img src='/playloop_icon.jpg' alt="" className='w-[40px] h-[40px] rounded-full' />
                            <div>Basic Info</div>
                        </h1>
                        <input onChange={(e) => setUserName(e.target.value)} value={userName} name='userName' type="text" className='w-[100%] border rounded-md border-gray-500 bg-transparent p-3 text-white focus:outline-none focus:border-orange-500 mb-4 ' placeholder='User Name' />
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" name='email' className='w-[100%] border rounded-md border-gray-500 bg-transparent p-3 text-white focus:outline-none focus:border-orange-500 mb-4 ' placeholder='User Email' />
                        <div className='flex justify-end mt-5'>
                            <button className='text-white bg-orange-500 px-4 py-2 rounded-lg' onClick={() => {
                                if (!userName && !email) {
                                    return showCustomAlert("please filup the input")
                                }
                                setstep(step + 1)
                            }}>Next</button>
                        </div>
                    </>

                )}
                {step == 2 && (
                    <>
                        <h1 className='text-3xl text-white font-normal mb-5 flex items-center  gap-2'>
                            <img src='/playloop_icon.jpg' alt="" className='w-[40px] h-[40px] rounded-full' />
                            <div>Security</div>
                        </h1>
                        <div className='flex items-center bg-[#3c4043] text-white
                         px-3 py-2 rounded-full w-fit mb-6'>
                            <FaUserCircle className='mr-2' size={20} /> {email}
                        </div>
                        <input onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : 'password'} className='w-[100%] border rounded-md border-gray-500 bg-transparent p-3 text-white focus:outline-none focus:border-orange-500 mb-4 ' placeholder='password' />
                        <input onChange={(e) => setConfirmPassword(e.target.value)} type={showPassword ? "text" : 'password'} className='w-[100%] border rounded-md border-gray-500 bg-transparent p-3 text-white focus:outline-none focus:border-orange-500 mb-4 ' placeholder='password' />
                        <div>
                            <input type="checkbox" className='text-white' onChange={() => setShowPassword(!showPassword)} name="" id="showpass" />
                            <label className='text-white mx-2' htmlFor="showpass">Show Password</label>
                        </div>
                        <div className='flex justify-between mt-5'>
                            <button className='text-white bg-orange-400 cursor-pointer hover:bg-amber-600 px-4 py-2 rounded-lg' onClick={() => setstep(step - 1)}>Back</button>
                            <button className='text-white bg-orange-400 cursor-pointer hover:bg-amber-600 px-4 py-2 rounded-lg' onClick={() => {
                                if (!Password && !ConfirmPassword) {
                                    return showCustomAlert("please filup the all field")
                                }

                                if (Password !== ConfirmPassword) {
                                    return showCustomAlert("Please check your password field")
                                }
                                setstep(step + 1)
                            }}>Next</button>
                        </div>
                    </>

                )}
                {step == 3 && (
                    <>
                        <h1 className='text-3xl text-white font-normal mb-5 flex items-center  gap-2'>
                            <img src='/playloop_icon.jpg' alt="" className='w-[40px] h-[40px] rounded-full' />
                            <div>Choose Avatar</div>
                        </h1>
                        <div className='flex items-center gap-6 mb-6'>
                            <div className='w-28 h-28 rounded-full border-4 border-gray-500 overflow-hidden shadow-lg'>
                                {frontendImage ? <img src={frontendImage} className='w-[100%] h-[100%] rounded-full' /> : <FaUserCircle className='h-[100%] w-[100%] text-gray-500 p-2' />}

                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="profile" className='text-gray-300 font-medium'>Choose Profile</label>
                                <input type="file" onChange={handleImage} accept='image/*' name="" id="profile" className='block w-full text-sm text-gray-400 file:mr-4
                                 file:px-4 file:rounded-full file:border-0 file:font-semibold file:text-white cursor-pointer file:bg-orange-500 hover:file:bg-orange-700'/>
                            </div>
                        </div>
                        <div className='flex justify-between mt-5'>
                            <button className='text-white bg-orange-400 cursor-pointer hover:bg-amber-600 px-4 py-2 rounded-lg' onClick={() => setstep(step - 1)}>Back</button>
                            <button className='text-white bg-orange-400 cursor-pointer hover:bg-amber-600 px-4 py-2 rounded-lg' onClick={() => {
                                if (!frontendImage && !backendImage) {
                                    return alert("please select your profile image")
                                }
                                handleSubmit()
                            }}>{loading && <ImSpinner9 className='animate-spin ' /> || 'Create Account'}</button>
                        </div>
                    </>
                )}
                <div>
                    <h2 className='text-white'>Already Have an Account <span onClick={() => navigate('/signIn')} className='text-blue-400 font-medium cursor-pointer ms-2'>Sign_IN</span></h2>
                </div>

            </div>
        </div>
    );
};

export default SignUp;