import React from "react";

const User = ({ userData, index }) => {
  return (
    <div className={"users" + (index + 1)}>
      <ul>
        <li>
          <img src={userData.user.picture.medium} alt="" />
        </li>
        <li>
          <h2>User{index + 1}</h2>
        </li>
        <li>registered : {userData.user.registered}</li>
        <li>gender : {userData.user.gender}</li>
        <li>
          name : {userData.user.name.title} {userData.user.name.first}{" "}
          {userData.user.name.last}
        </li>
        <li>street : {userData.user.location.street}</li>
        <li>city : {userData.user.location.city}</li>
        <li>state : {userData.user.location.state}</li>
        <li>email : {userData.user.email}</li>
        <li>phone : {userData.user.phone}</li>
        <li>username : {userData.user.username}</li>
        <li>password : {userData.user.password}</li>
        <li>salt : {userData.user.salt}</li>
        <li>md5 : {userData.user.md5}</li>
        <li>sha1 : {userData.user.sha1}</li>
      </ul>
    </div>
  );
};

export default User;
