import React, { useState } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
const SignUp = () => {
    const [step, setstep] = useState(1)
    return (
        <div className='flex items-center justify-center min-h-screen bg-[#181818]'>
            <div className='bg-[#202124] rounded-2xl p-10 w-full max-w-md shadow-lg'>
                <div className='flex items-center mb-6  '>
                    <button className='text-gray-300 hover:text-white me-2'>
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
                        <input type="text" className='w-[100%] border rounded-md border-gray-500 bg-transparent p-3 text-white focus:outline-none focus:border-orange-500 mb-4 ' placeholder='User Name' />
                        <input type="text" className='w-[100%] border rounded-md border-gray-500 bg-transparent p-3 text-white focus:outline-none focus:border-orange-500 mb-4 ' placeholder='User Email' />
                        <input type="password" className='w-[100%] border rounded-md border-gray-500 bg-transparent p-3 text-white focus:outline-none focus:border-orange-500 mb-4 ' placeholder='password' />

                        <div className='flex justify-end mt-5'>
                            <button className='text-white bg-orange-500 px-4 py-2 rounded-lg' onClick={() => setstep(step + 1)}>Next</button>
                        </div>
                    </>

                )}
                {step == 2 && (
                    <>
                        <h1 className='text-3xl text-white font-normal mb-2 flex items-center justify-center gap-2'>
                            <img src='/playloop_icon.jpg' alt="" className='w-[40px] h-[40px] rounded-full' />
                            <div>Basic Info</div>
                        </h1>
                        <input type="text" className='w-[100%] border rounded-md border-gray-500 bg-transparent p-3 text-white focus:outline-none focus:border-orange-500 mb-4 ' placeholder='User Name' />
                        <input type="text" className='w-[100%] border rounded-md border-gray-500 bg-transparent p-3 text-white focus:outline-none focus:border-orange-500 mb-4 ' placeholder='User Email' />
                        <input type="password" className='w-[100%] border rounded-md border-gray-500 bg-transparent p-3 text-white focus:outline-none focus:border-orange-500 mb-4 ' placeholder='password' />

                        <div className='flex justify-between mt-5'>
                            <button className='text-white bg-orange-400 cursor-pointer hover:bg-amber-600 px-4 py-2 rounded-lg' onClick={() => setstep(step - 1)}>Back</button>
                            <button className='text-white bg-orange-400 cursor-pointer hover:bg-amber-600 px-4 py-2 rounded-lg' onClick={() => setstep(step + 1)}>Next</button>
                        </div>
                    </>

                )}
                
            </div>
        </div>
    );
};

export default SignUp;