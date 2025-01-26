import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "./utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  console.log(connections);
  const getConnections = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  const Profiles = (user) => {
    const { firstName, lastName, photoUrl, age, about, gender} = user?.user
    console.log(user.user)
    return (
      <>
        <div className="card card-side bg-base-300 shadow-xl w-1/3 h-1/2" id={user?.id}>
        <img class="w-20 h-20 ms-2 rounded-full justify-center content-center my-3" src={photoUrl} alt={firstName + "'Profile"}/>
          <div className="card-body pt-3 text-right">
            <h2 className="text-right font-semibold">{firstName + ' ' + lastName}</h2>
            <p>{age + ' ,' + gender}</p>
            <p>{about}</p>
          </div>
        </div>
      </>
    );
  };

  return (
      <div className="">
        <p className="text-2xl text-rose-400 justify-center content-center mt-3 ms-4">Connections</p>
      {connections &&
        connections.map((item) => {
          return (
          <div className="mt-4 ms-3">
          <Profiles user={item} />
          </div>
          );
        })}
    </div>
  );
};

export default Connections;
