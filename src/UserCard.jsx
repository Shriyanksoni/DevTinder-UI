import React from "react";

const UserCard = ({ user }) => {
  if (user == undefined)
  return
  const { firstName, lastName, age, gender, about, skills, photoUrl } = user;
  console.log(user);
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
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
