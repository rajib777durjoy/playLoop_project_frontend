
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { setChannelData } from "../redux/userSlice";

const useChannelData = () => {
  const axiosPublic = useAxiosPublic();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const result = await axiosPublic.get("/api/getChannel");
        console.log("Channel Data:", result.data);
        dispatch(setChannelData(result.data));
      } catch (err) {
        console.log(err)
        dispatch(setChannelData(null));
      }
    };
    fetchChannel()
  },[]);
};

export default useChannelData;
