
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router';

import { TbLoader } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { showCustomAlert } from '../../Component/CustomAlert';
import { setChannelData } from '../../redux/userSlice';

const UpdateChannel = () => {
   const {channelData}= useSelector(state=>state.user)
   
    const navigate = useNavigate();
    const useAxios = useAxiosPublic();
    const [step, setStep] = useState(1);
    const [avatar, setAvatar] = useState(null);
    const [banner, setBanner] = useState(null);
    const [description, setDescription] = useState(channelData?.description);
    const [category, setCategory] = useState(channelData?.category)
    const [loading, setLoading] = useState(false);
    const [channelName, setChannelName] = useState(channelData?.name)
    const dispatch = useDispatch()
    const handleAvatar = (e) => {
        setAvatar(e.target.files[0])
    }
    const handleBanner = (e) => {
        setBanner(e.target.files[0])
    }

    const nextStep = () => {
        setStep((prev) => prev + 1)
    }
    const prevStep = () => {
        setStep((prev) => prev - 1)
    }

    const handleUpdateChannel = async () => {
        setLoading(true)
        const formData = new FormData();
        formData.append("name", channelName)
        formData.append("description", description)
        formData.append("category", category)
        formData.append("avatar", avatar)
        formData.append("banner", banner)
        try {
            const result = await useAxios.post('/api/updateChannel', formData)
            console.log(result.data)
            dispatch(setChannelData(result.data))
            showCustomAlert("Channel Updated")
            setLoading(false)
            navigate("/")
        } catch (err) {
            console.log(err)
            showCustomAlert("Channel Create failed")
            setLoading(false)
        }
    }
    return (
        <div className='w-full min-h-screen bg-[#0f0f0f] text-white flex flex-col'>
            
            <main className='flex flex-1 justify-center items-center px-4'>
                <div className='bg-[#212121] p-6 rounded-xl w-full max-w-lg shadow-lg'>
                    {step === 1 && (
                        <div>
                            <h2>How you'll appear</h2>
                            <p className='text-sm text-gray-400 mb-6'>Choose your profile picture,Channel name</p>
                            <div className='flex felx-col items-center justify-center mb-6'>
                                <label htmlFor="avatar" className='cursor-pointer flex flex-col items-center' >
                                    {avatar && <img src={URL.createObjectURL(avatar)} alt='image' className='w-20 h-20 rounded-2xl object-cover border-2 border-gray-600 ' /> || <div className='w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-gray-400'>
                                        <FaUserCircle size={40} />
                                    </div>}
                                    <span className='text-orange-400 text-sm mt-2'>Upload Avatar</span>
                                    <input type="file" className='hidden' id='avatar' accept='image' onChange={handleAvatar} />
                                </label>

                            </div>
                            <input type="text" placeholder='Channel name' className='w-full p-3 mb-4 rounded-lg bg-[#121212] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500' onChange={(e) => setChannelName(e.target.value)} value={channelName} />

                            <button className='w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 transition py-3 rounded-lg font-medium disabled:bg-gray-600' onClick={nextStep} disabled={!channelName} >Continue</button>
                            <span className='w-full flex items-center justify-center text-sm text-blue-400 cursor-pointer hover:underline mt-2' onClick={() => navigate('/')}>Back to Home</span>
                        </div>
                    )
                    }
                    {/* step 2 */}
                    {step === 2 && (
                        <div>
                            <h2>Your Updated Channel</h2>

                            <div className='flex felx-col items-center justify-center mb-6'>
                                <label htmlFor="avatar" className='cursor-pointer flex flex-col items-center' >
                                    {avatar && <img src={URL.createObjectURL(avatar)} alt='image' className='w-20 h-20 rounded-2xl object-cover border-2 border-gray-600 ' /> || <div className='w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-gray-400'>
                                        <FaUserCircle size={40} />
                                    </div>}

                                </label>
                                <h2 className='mt-3 text-lg font-semibold'>{channelName}</h2>
                            </div>

                            <button className='w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 transition py-3 rounded-lg font-medium disabled:bg-gray-600' onClick={nextStep} disabled={!channelName} >Continue and Customize Channel</button>
                            <span className='w-full flex items-center justify-center text-sm text-blue-400 cursor-pointer hover:underline mt-2' onClick={prevStep}>Back to Home</span>
                        </div>
                    )

                    }

                    {/* step 3 */}

                    {step === 3 && (
                        <div>
                            <h2>Customize Channel</h2>

                            <div className='flex flex-col items-center justify-center mb-6 '>
                                <label htmlFor="banner" className='w-full cursor-pointer  block mb-4' >
                                    {banner && <img src={URL.createObjectURL(banner)} alt='image' className='w-ful h-12 rounded-lg mb-2 object-cover border-2 border-gray-600 ' /> || <div className='w-full h-32 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 mb-2'>
                                        Click to upload banner image
                                    </div>}
                                    <span className='text-orange-400 text-sm mt-2'>Upload Banner</span>
                                    <input type="file" className='hidden' id='banner' accept='image' onChange={handleBanner} />
                                </label>

                            </div>
                            <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full p-3 mb-4 rounded-lg bg-[#121212] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 ' placeholder='Channel Description' name='' id=''></textarea>
                            <input onChange={(e) => setCategory(e.target.value)} value={category} type="text" placeholder='Channel Category' className='w-full p-3 mb-4 rounded-lg bg-[#121212] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500' />

                            <button onClick={handleUpdateChannel} className='w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 transition py-3 rounded-lg font-medium disabled:bg-gray-600'  disabled={!description || !category} >{loading ? <TbLoader className='text-xl animate-spin text-black' /> : "Save and Customize Channel"}</button>

                            <span className='w-full flex items-center justify-center text-sm text-blue-400 cursor-pointer hover:underline mt-2' onClick={prevStep}>Back</span>
                        </div>
                    )
                    }

                </div>

            </main>

        </div>
    );
};
export default UpdateChannel;