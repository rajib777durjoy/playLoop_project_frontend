import React, { useState } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router";
import { showCustomAlert } from '../Component/CustomAlert';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { ImSpinner9 } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import { setuserData } from '../redux/userSlice';


const SignIn = () => {
    const [step, setstep] = useState(1)
    const [email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, Setloading] = useState(false);
    const dispatch= useDispatch();
    let navigate = useNavigate();
    const useAxios = useAxiosPublic();

    const handleSign_In = async () => {
        Setloading(true)
        
        try {
            const result = await useAxios.post('/api/auth/signin',{email,password: Password});
            console.log('sign_In message::', result?.data);
            dispatch(setuserData(result?.data))
            Setloading(false)
            showCustomAlert("sign_In Successfull")
            navigate('/');

        } catch (err) {
            Setloading(false)
            console.log(err)
        }

    }
    return (
        <div className='flex items-center justify-center min-h-screen bg-[#181818]'>
            <div className='bg-[#202124] rounded-2xl p-10 w-full max-w-md shadow-lg'>
                <div className='flex items-center mb-6  '>
                    <button onClick={() => navigate('/')} className='text-gray-300 hover:text-white hover:scale-150 me-2'>
                        <FaArrowLeftLong />
                    </button>
                    <span className='text-white text-2xl font-medium mx-2'>Sign_IN</span>
                </div>
                {step == 1 && (
                    <>
                        <h1 className='text-3xl text-white font-normal mb-5 flex items-center  gap-2'>
                            <img src='/playloop_icon.jpg' alt="" className='w-[40px] h-[40px] rounded-full' />
                            <div>Basic Info</div>
                        </h1>
                        {/* <input onChange={(e) => setUserName(e.target.value)} value={userName} name='userName' type="text" className='w-[100%] border rounded-md border-gray-500 bg-transparent p-3 text-white focus:outline-none focus:border-orange-500 mb-4 ' placeholder='User Name' /> */}
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" name='email' className='w-[100%] border rounded-md border-gray-500 bg-transparent p-3 text-white focus:outline-none focus:border-orange-500 mb-4 ' placeholder='User Email' />
                        <div>
                            <h2 className='text-white'>You Create an Account <span onClick={() => navigate('/signUp')} className='text-blue-400 font-medium cursor-pointer ms-2'>Sign_Up</span></h2>
                        </div>
                        <div className='flex justify-end mt-5'>

                            <button className='text-white bg-orange-500 px-4 py-2 rounded-lg' onClick={() => {
                                if (!email) {
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
                            <div>Welcome</div>
                        </h1>
                        <div className='flex items-center bg-[#3c4043] text-white
                                 px-3 py-2 rounded-full w-fit mb-6'>
                            <FaUserCircle className='mr-2' size={20} /> {email}
                        </div>
                        <input onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : 'password'} className='w-[100%] border rounded-md border-gray-500 bg-transparent p-3 text-white focus:outline-none focus:border-orange-500 mb-4 ' placeholder='password' />
                        {/* <input onChange={(e) => setConfirmPassword(e.target.value)} type={showPassword ? "text" : 'password'} className='w-[100%] border rounded-md border-gray-500 bg-transparent p-3 text-white focus:outline-none focus:border-orange-500 mb-4 ' placeholder='password' /> */}
                        <div>
                            <input type="checkbox" className='text-white' onChange={() => setShowPassword(!showPassword)} name="" id="showpass" />
                            <label className='text-white mx-2' htmlFor="showpass">Show Password</label>
                        </div>
                        <div className='my-2'>
                            <h2 className='text-orange-400 text-sm hover:underline my-2 cursor-pointer'>Forget Password</h2>
                            <h2 className='text-white'>Create A New Account <span onClick={() => navigate('/signUp')} className='text-blue-400 font-medium cursor-pointer ms-2'>Sign_Up</span></h2>
                        </div>
                        <div className='flex justify-between mt-5'>
                            <button className='text-white bg-orange-400 cursor-pointer hover:bg-amber-600 px-4 py-2 rounded-lg' onClick={() => setstep(step - 1)}>Back</button>
                            <button className='text-white bg-orange-400 cursor-pointer hover:bg-amber-600 px-4 py-2 rounded-lg' onClick={() => {
                                if (!Password) {
                                    return showCustomAlert("please filup the all field")
                                }
                                handleSign_In()
                            }}>{loading && <ImSpinner9 className='animate-spin ' /> || 'Sign_In'}</button>
                        </div>

                    </>

                )}

            </div>
        </div>
    );
};

export default SignIn;