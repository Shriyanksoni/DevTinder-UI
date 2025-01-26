import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "./utils/feedSlice";

const UserCard = ({ user }) => {
  if (!user || user.length === 0) {
    return (
      <div className="flex justify-center font-semibold">
        No New User Found!
      </div>
    )
  };
  const { firstName, lastName, _id, age, gender, about, skills, photoUrl } = user;
  const dispatch = useDispatch();
  const handleRequest = async (status, userID)=>{
    try {
      const res = await axios.post(`http://localhost:3000/request/send/${status}/${userID}`, {}, {withCredentials:true});
      dispatch(removeUserFromFeed(userID));
    } catch (error) {
      
    }
  }
  return (
    <>
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img src={photoUrl} alt="Profile Picture" className="mt-3" />
        </figure>
        <div className="card-body">
          <h2 className="card-title break-words">{firstName + " " + lastName}</h2>
          {age && gender && <p className="h-content">{age + " ," + gender}</p>}
          <p className="break-words">{about}</p>
          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary" onClick={()=> handleRequest('ignored',_id)}>Ignore</button>
            <button className="btn btn-secondary" onClick={()=> handleRequest('interested', _id)}>Interested</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
