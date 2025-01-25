import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";
const EditProfile = ({ user }) => {
  console.log(user);
  const [email, setEmail] = useState(user.emailId);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateProfile = async () => {
    setError("");
    const req = {
      firstName,
      lastName,
      age,
      about,
      photoUrl,
      gender,
    };
    try {
      const res = await axios.post("http://localhost:3000/profile/edit", req, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
        console.log(err);
        setError(err?.response?.data);
    }
    setShowToast(true);
    setTimeout(() => {
        setShowToast(false);
      }, 3000);
  };
  return (
    <>
      <div className="flex justify-center my-4 ">
        <div className="flex justify-center my-2 me-5">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center mb-2">Edit Profile</h2>
              <div>
                <label className="input input-bordered flex items-center gap-2 mb-4">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="grow"
                    placeholder="FirtName"
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2 mb-4">
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                    className="grow"
                    placeholder="FirtName"
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2 mb-4">
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="grow"
                    placeholder="Age"
                  />
                </label>
                <select className="select w-full max-w-xs mb-4" value={gender} onChange={(e)=>setGender(e.target?.value)}>
                  <option disabled selected>
                    Gender
                  </option>
                  <option value={'male'}>Male</option>
                  <option value={'female'}> Female</option>
                </select>
                <label className="input input-bordered flex items-center gap-2 mb-4">
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="grow"
                    placeholder="Photo Url"
                  />
                </label>
                <textarea className="textarea textarea-accent w-max" placeholder="About"  value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
              </div>
              <div className="card-actions justify-center mt-1">
                <button className="btn btn-primary" onClick={updateProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
       {user && <UserCard
          user={{ firstName, lastName, age, gender, about, email, photoUrl }}
        />}
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Updated Successfully.</span>
          </div>
        </div>
      )}
      {showToast && error && <div className="toast toast-top toast-center">
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>}
    </>
  );
};

export default EditProfile;
