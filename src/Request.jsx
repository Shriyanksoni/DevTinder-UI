import axios from "axios";
import React, { useEffect } from "react";
import { addRequest } from "./utils/requestSlice";
import { useDispatch, useSelector } from "react-redux";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const getRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/user/requests/received",
        { withCredentials: true }
      );
      dispatch(addRequest(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) {
    return <div className="font-semibold text-center">No Requests Found!</div>;
  }

  const reviewRequest = async (status, reqID) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/request/review/${status}/${reqID}`,
        {},
        { withCredentials: true }
      );
      getRequests();
    } catch (error) {
      console.log(error);
    }
  };

  const Profiles = (user) => {
    const { firstName, lastName, photoUrl, age, about, gender, _id } = user?.user?.fromUserId;
    return (
      <div className="flex">
        <div
          className="card card-side bg-base-300 shadow-xl w-1/3 h-1/2"
          id={user?._id}
        >
          <img
            className="w-20 h-20 ms-2 rounded-full justify-center content-center my-3"
            src={photoUrl}
            alt={firstName + "'Profile"}
          />
          <div className="card-body pt-3">
            <h2 className="font-semibold">{firstName + " " + lastName}</h2>
            <p>{age + " ," + gender}</p>
            <p>{about}</p>
          </div>
          <div className="w-1/3 justify-between mt-4">
            <button
              className="btn btn-primary ms-2"
              onClick={() => reviewRequest("rejected", user?.user?._id)}
            >
              Reject
            </button>
            <button
              className="btn btn-secondary ms-2"
              onClick={() => reviewRequest("accepted", user?.user?._id)}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="">
      <p className="text-2xl text-rose-400 justify-center content-center mt-3 ms-4">
        Connection Requests
      </p>
      {requests &&
        requests.map((user, indx) => {
          return (
            <div className="mt-4 ms-3" key={indx}>
              <Profiles user={user} />
            </div>
          );
        })}
    </div>
  );
};

export default Request;
