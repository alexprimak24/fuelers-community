import React, { useEffect } from "react";
import authService from "../../appwrite/auth";

function Logout() {
  const logoutHandler = async () => {
    try {
      const logout = await authService.logout();
      console.log(logout);
    } catch (error) {
      console.log("failed to logout");
    }
  };
  return (
    <button
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default Logout;
