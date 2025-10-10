
import logo from "/playloop_icon.jpg"
import { FaBars} from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { IoIosAddCircle } from 'react-icons/io';
import { GoVideo } from 'react-icons/go';
import { SiYoutubeshorts } from 'react-icons/si';
import { MdOutlineSubscriptions } from 'react-icons/md';
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Profile from "../Component/profile";


const Home = () => {
    const navigate= useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [selectedItem, setSeletedItem] = useState("Home");
    const [active,setActive]=useState("Home");
    const {userData}= useSelector((state)=>state.user);
    const [popup,setpopup]=useState(false);

    console.log("userdata::=>",userData);
    const categories =[
        "Music","Gaming","Movies","TV Shows","News","Trending","Entertainment","Education","Science & Tech","Art","Comedy","Vlogs"
];
    return (
        <div className='bg-[#0f0f0f] text-white
         min-h-screen relative'>
            {/* navbar  */}
            <header className='bg-[#0f0f0f]h-15 p-3 border-2 border-gray-800 fixed top-0 left-0 right-0 z-50'>
                <div className='flex items-center justify-between'>
                    {/* left */}
                    <div className='flex items-center gap-4'>
                        <button className='text-xl bg-[#272727] p-2 rounded-full md:inline hidden' onClick={() => setSidebarOpen(!sidebarOpen)}><FaBars></FaBars></button>
                        <div className='flex items-center gap-[5px]'>
                            <img src={logo} alt="" className='w-[20px] h-[20px] rounded-full' />
                            <span className='text-white font-bold text-xl tracking-tight font-roboto'>PlayLoop</span>
                        </div>
                    </div>
                    {/* search */}
                    <div className='hidden md:flex items-center gap-2 flex-1 max-w-xl'>
                        <div className='flex flex-1'>
                            <input type="text" className='flex-1 bg-[#121212] px-4 py-2 rounded-l-full outline-none border border-gray-700' placeholder='Search' />
                            <button className='bg-[#272727] px-4 rounded-r-fullborder border-gray-700'><FaSearch></FaSearch></button>
                        </div>
                        <button className='bg-[#272727] p-3 rounded-full'><FaMicrophone></FaMicrophone></button>
                    </div>
                    {/* right */}
                    <div className='flex items-center gap-3'>
                       {userData?.Chennel &&<button className='hidden md:flex items-center gap-1 py-1 bg-[#272727] px-3 rounded-full cursor-pointer '>
                            <span className='text-lg'>+</span>
                            <span>Create</span>
                        </button> ||<div>dummy</div>}
                        {userData && <img src={`${userData?.photoUrl}`} onClick={()=>setpopup(!popup)} alt="image" className="w-[30px] h-[30px] md:inline hidden rounded-full"/> || <FaUserCircle className='text-3xl hidden md:flex text-gray-400'></FaUserCircle> }
                        
                        <FaSearch className='text-lg md:hidden flex'></FaSearch>
                    </div>
                </div>
            </header>
            {/* sidebar */}
            <div className={`bg-[#0f0f0f] border-r border-gray-800 transition-all duration-300 fixed top-[60px] bottom-0 z-40 ${sidebarOpen ? "w-60" : "w-20"} hidden md:flex flex-col overflow-y-auto`}>
                <nav className='space-y-1 mt-3'>
                    <SidebarItem icon={<FaHome/>} text={"Home"}open={sidebarOpen} selected={selectedItem === "Home"} onClick={()=>{
                        setSeletedItem("Home");
                        navigate("/")
                        }}></SidebarItem>

                    <SidebarItem icon={<SiYoutubeshorts/>} text={"Shorts"}open={sidebarOpen} selected={selectedItem === "Shorts"} onClick={()=>{
                        setSeletedItem("Shorts");
                         navigate("/shorts")
                        }}></SidebarItem>

                    <SidebarItem icon={<MdOutlineSubscriptions/>} text={"Subscriptions"}open={sidebarOpen} selected={selectedItem === "Subscriptions"} onClick={()=>setSeletedItem("Subscriptions")}></SidebarItem>
                </nav>

               <hr className="border-gray-800 my-3" />
                {sidebarOpen && <p className="text-sm text-gray-400 px-2">You</p>}
               <nav className='space-y-1 mt-1'>
                    <SidebarItem icon={<FaHistory/>} text={"History"}open={sidebarOpen} selected={selectedItem === "History"} onClick={()=>setSeletedItem("History")}></SidebarItem>
                    <SidebarItem icon={<FaList/>} text={"Playlist"}open={sidebarOpen} selected={selectedItem === "Playlist"} onClick={()=>setSeletedItem("Playlist")}></SidebarItem>
                    <SidebarItem icon={<GoVideo/>} text={"Save Video"}open={sidebarOpen} selected={selectedItem === "Save Video"} onClick={()=>setSeletedItem("Save Video")}></SidebarItem>
                    <SidebarItem icon={<FaThumbsUp/>} text={"Liked Video"}open={sidebarOpen} selected={selectedItem === "Liked Video"} onClick={()=>setSeletedItem("Liked Video")}></SidebarItem>
                </nav>
                <hr className="border-gray-800 my-3" />
                {sidebarOpen && <p className="text-sm text-gray-400 px-2">Subscriptions</p>}
               <nav className='space-y-1 mt-1'>
                    <SidebarItem icon={<FaHistory/>} text={"History"}open={sidebarOpen} selected={selectedItem === "History"} onClick={()=>setSeletedItem("History")}></SidebarItem>
                    <SidebarItem icon={<FaList/>} text={"Playlist"}open={sidebarOpen} selected={selectedItem === "Playlist"} onClick={()=>setSeletedItem("Playlist")}></SidebarItem>
                    <SidebarItem icon={<GoVideo/>} text={"Save Video"}open={sidebarOpen} selected={selectedItem === "Save Video"} onClick={()=>setSeletedItem("Save Video")}></SidebarItem>
                    <SidebarItem icon={<FaThumbsUp/>} text={"Liked Video"}open={sidebarOpen} selected={selectedItem === "Liked Video"} onClick={()=>setSeletedItem("Liked Video")}></SidebarItem>
                </nav>
            </div>
            {/* main area */}
            <main className={`overflow-y-auto p-4 flex flex-col pb-16 transition-all duration-300 ${sidebarOpen?"md:ml-60":"md:ml-20"}`}>
            {location.pathname === '/' && <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pt-2 mt-[60px]">{categories.map((cat,idx)=>(
                <button key={idx} className="whitespace-nowrap bg-[#272727] px-4 py-1 rounded-lg  text-sm hover:bg-gray-700">{cat}</button>
            ))}
           
            </div>}
             {popup && <Profile></Profile>}
            <div className="mt-2">
                <Outlet></Outlet>
            </div>
            </main>
            {/* bottom nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0f0f0f] border-t border-gray-800 flex justify-around items-center py-2 z-10">
             <MobileSizeNav icon={<FaHome/>} text={"Home"} active={active === "Home"} onClick={()=>setActive("Home")}></MobileSizeNav>
             <MobileSizeNav icon={<SiYoutubeshorts/>} text={"Shorts"} active={active === "Shorts"} onClick={()=>setActive("Shorts")}></MobileSizeNav>
             <MobileSizeNav icon={<IoIosAddCircle/>}  active={active === "+"} onClick={()=>setActive("+")}></MobileSizeNav>
             <MobileSizeNav icon={<MdOutlineSubscriptions/>} text={"Subscriptions"} active={active === "Subscriptions"} onClick={()=>setActive("Subscriptions")}></MobileSizeNav>
            <MobileSizeNav  icon={userData && <img src={`${userData?.photoUrl}`} alt="profile" className="w-[40px] h-[40px] rounded-full " /> || <FaUserCircle/>} text={"You"} active={active === "You"} onClick={()=>setActive("You")}></MobileSizeNav>
            </nav>
        </div>
    );
};
function SidebarItem({icon,text,open,selected,onClick}){
    return (
        <button className={`flex items-center gap-4 p-2 rounded w-full transition-colors ${open?"justify-start":"justify-center"} ${selected?"bg-[#272727]":"hover:bg-[#272727]"}`} onClick={onClick}>
          <span className='text-lg'>{icon}</span>  
          {open && <span className='text-sm'>{text}</span>}
        </button>
    );
};
function MobileSizeNav({icon,text,onClick,active}){
    return (
       <button onClick={onClick} className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg 
       transition-all duration-300 ${active?"text-white":"text-gray-400"} hover:scale-105 `}>
           <span className="text-2xl">{icon}</span>
           {text && <span className="text-xs">{text}</span>}
       </button> 
    )
}

export default Home;