import React from "react";
import { useAppSelector } from "../../app/hooks/storeHooks";

const UserProfile = () => {
  const user = useAppSelector((state) => state.auth.user);
  console.log("user", user);

  return (
    <div>
      <h1>User Profile</h1>
      {/* <p>Username: {user?.username}</p> */}
      <p>Email: {user?.email}</p>
    </div>
  );
};

export default UserProfile;
