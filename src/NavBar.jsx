import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "./utils/userSlice";

const NavBar = () => {
    const user = useSelector((store)=> store.user);
    console.log(user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async ()=>{
        await axios.post("http://localhost:3000/logout", {},{withCredentials: true})
        dispatch(removeUser());
        navigate("/login")
    }
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">DevTinder🔥</Link>
      </div>
      {user && <div className="flex-none gap-2">
        <div className="form-control">Welcome, {user.firstName}</div>
        <div className="dropdown dropdown-end mx-7">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User Profile Pic"
                src={user.photoUrl}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/connections">Connections</Link>
            </li>
            <li>
              <Link to="/requests">Requests</Link>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>}
    </div>
  );
};

export default NavBar;
