import React, { SetStateAction, useEffect } from "react";
import authService from "../../appwrite/auth";
import { Models } from "appwrite";

interface LogoutProps {
  logOut: React.Dispatch<SetStateAction<boolean>>;
  setVoter: React.Dispatch<React.SetStateAction<Models.Document | undefined>>;
}

function Logout({ logOut, setVoter }: LogoutProps) {
  const logoutHandler = async () => {
    try {
      const logout = await authService.logout();
      logOut(false);
      setVoter(undefined);
      console.log(logout);
    } catch (error) {
      console.log("failed to logout");
    }
  };
  return (
    <button
      className="text-[9px] underline text-left ml-1"
      title="disconnect from discord"
      onClick={logoutHandler}
    >
      disconnect
    </button>
  );
}

export default Logout;
