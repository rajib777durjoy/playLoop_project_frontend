import React, { useState } from 'react';
import logo from "/playloop_icon.jpg"
import { useNavigate } from 'react-router';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { TbLoader } from "react-icons/tb";
import { showCustomAlert } from '../Component/CustomAlert';
const ForgetPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [OTP, setOTP] = useState("");
    const [newpass, setNewpass] = useState("");
    const [conpass, setConpass] = useState("");
    const [loading, setloading] = useState(false);
    const useAxios = useAxiosPublic()
    const navigate = useNavigate()

    const handleSendOtp = async () => {
        setloading(true)
        try {
            const result = await useAxios.post('/api/auth/sendOtp', { email });
            setStep(2)
            setloading(false)
            showCustomAlert(result.data.message)
            console.log(result.data.message)
        } catch (err) {
            console.log(err.response.data.message)
            setloading(false)
            showCustomAlert(err.response.data.message)
        }
    }
    const handleVerifyOtp = async () => {
        setloading(true)
        try {
            const result = await useAxios.post('/api/auth/verifyOtp', { email, otp: OTP });
            setStep(3)
            setloading(false)
            showCustomAlert(result.data.message)
        } catch (err) {
            console.log(err.response.data.message);
            setloading(false)
            showCustomAlert(err.response.data.message)
        }
    }
    const handleResetPassword = async () => {
        setloading(true)
        try {
            if (newpass !== conpass) {
                setloading(false)
                showCustomAlert("password is not match")
            }
            const result = useAxios.post('/api/auth/resetpassword', { email, password: newpass });
            navigate('/signIn');
            setloading(false)
            showCustomAlert(result.data.message)
        } catch (err) {
            console.log(err.response.data.message);
            setloading(false)
            showCustomAlert(err.response.data.message)
        }
    }
    return (
        <div className='min-h-screen flex flex-col bg-[#202124] text-white'>
            <header className='flex items-center gap-2 p-4 border-b border-gray-700'>
                <img src={logo} alt="" className='w-8 h-8' />
                <span className='text-white font-bold text-xl tracking-tight font-roboto'>PlayLoop</span>

            </header>
            <main className='flex flex-1 items-center justify-center px-4'>
                {/* step 1 */}
                {step === 1 && <div className='bg-[#171717] shadow-lg rounded-2xl p-8 max-w-md w-full'>
                    <h2 className='text-2xl font-semibold mb-6'>Forget your password</h2>
                    <form action="" className='space-y-4' onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label htmlFor="email" className='block text-sm mb-1 text-gray-300'>Enter your email address</label>
                            <input type="text" id='email' className='mt-1 w-full px-4 py-3 border border-gray-600 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-orange-500' required onChange={(e) => setEmail(e.target.value)} value={email} />
                        </div>
                        <button disabled={loading} onClick={handleSendOtp} className='w-full bg-orange-600 hover:bg-orange-700 transition py-2 px-4 rounded-md font-medium'>{loading ? <TbLoader className='text-xl animate-spin text-black' /> : "Send OTP"}</button>
                    </form>
                    <div onClick={() => navigate('/signIn')} className='text-sm text-orange-400 text-center mt-4 cursor-pointer'>
                        back to signIn
                    </div>
                </div>}
                {/* step 2 */}
                {step === 2 && <div className='bg-[#171717] shadow-lg rounded-2xl p-8 max-w-md w-full'>
                    <h2 className='text-2xl font-semibold mb-6'>Enter OTP</h2>
                    <form action="" onSubmit={(e) => e.preventDefault()} className='space-y-4'>
                        <div>
                            <label htmlFor="otp" className='block text-sm mb-1 text-gray-300'>Please enter the 4-digit code sent to your email</label>
                            <input type="text" id='otp' className='mt-1 w-full px-4 py-3 border border-gray-600 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-orange-500' required onChange={(e) => setOTP(e.target.value)} value={OTP} />
                        </div>
                        <button disabled={loading} onClick={handleVerifyOtp} className='w-full bg-orange-600 hover:bg-orange-700 transition py-2 px-4 rounded-md font-medium'>{loading ? <TbLoader className='text-xl animate-spin text-black' /> : "Verify OTP"}</button>
                    </form>
                    <div onClick={() => navigate('/signIn')} className='text-sm text-orange-400 text-center mt-4 cursor-pointer'>
                        back to signIn
                    </div>
                </div>}
                {/* step 3 */}
                {step === 3 && <div className='bg-[#171717] shadow-lg rounded-2xl p-8 max-w-md w-full'>
                    <h2 className='text-2xl font-semibold mb-6'>Reset your password</h2>
                    <p className='text-sm text-gray-400 mb-6'>Enter a new password below to regain access to your account</p>
                    <form action="" onSubmit={(e) => e.preventDefault()} className='space-y-4'>
                        <div>

                            <label htmlFor="newpass" className='block text-sm mb-1 text-gray-300'>New password</label>
                            <input type="text" id='newpass' className='mt-1 w-full px-4 py-3 border border-gray-600 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-orange-500' required onChange={(e) => setNewpass(e.target.value)} value={newpass} />
                            {/* label 2 */}
                            <label htmlFor="conpass" className='block text-sm mt-3 text-gray-300'>Confirm password</label>
                            <input type="text" id='conpass' className='mt-1 w-full px-4 py-3 border border-gray-600 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-orange-500' required onChange={(e) => setConpass(e.target.value)} value={conpass} />
                        </div>

                        <button disabled={loading} onClick={handleResetPassword} className='w-full bg-orange-600 hover:bg-orange-700 transition py-2 px-4 rounded-md font-medium'>{loading ? <TbLoader className='text-xl animate-spin text-black' /> : "Reset Password"}</button>
                    </form>
                    <div onClick={() => navigate('/signIn')} className='text-sm text-orange-400 text-center mt-4 cursor-pointer'>
                        back to signIn
                    </div>
                </div>}

            </main>
        </div>
    );
};

export default ForgetPassword;