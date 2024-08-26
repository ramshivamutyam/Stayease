import React, { useContext } from "react";
import logo from "/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../../Contexts/AuthContext";

// import SearchIcon from "@mui/icons-material/Search";

function Header() {
  const {token}=useContext(Auth);
  const nav=useNavigate();
  const {dispatch}=useContext(Auth)
  const handleLogOut = async() => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    dispatch({type:'LOGOUT'})
    nav("/")
  }
  const handleLogIn=()=>{nav("/login")}
  return (
    <div className="w-full py-2 px-4 flex justify-between bg-gradient-to-r from-[#79e280] from-10% via-[#BFF6C3] via-70% to-[#ACE1AF] shadow-md shadow-slate-400">
      <div id="logo" className="flex items-center gap-3">
        <Link to="/">
          <img className="w-[75px] h-[35px] rounded-md" src={logo} alt="stayease logo" />
        </Link>
        <div className="font-bold">StayEase</div>
      </div>
      <div className="flex items-center">
        <div id="home" className="mx-5 font-semibold text-green-900 hover:underline">
          <Link to="/">Home</Link>
        </div>
        <button id="login" onClick={token ? handleLogOut : handleLogIn} className="mx-5 font-semibold hover:bg-[#367077] bg-[#1b5860] px-3 py-1 rounded-md text-white">
          {token ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Header;
