import React, { useState, useEffect } from "react";
import authService from "../../appwrite/auth";
import DiscordLogout from "./DiscordLogout";

function Auth() {
  const [userData, setUserData] = useState<any>();
  const login = async () => {
    try {
      await authService.handleLogin();
    } catch (error) {
      console.log("AuthFailed");
    }
  };
  useEffect(() => {
    const handleOAuth2Response = async () => {
      try {
        const user = await authService.getCurrentUser();
        setUserData(user);
      } catch (error) {
        console.error("OAuth2 login failed:", error);
      }
    };

    handleOAuth2Response();
  }, [authService.account]);
  console.log(userData);

  const currentUser = async () => {
    try {
      const user = await authService.getCurrentUser();
      console.log(user);
    } catch (error) {
      console.log("AuthFailed");
    }
  };

  return (
    <div className="">
      <button onClick={login} className="text-white m-[10px]">
        Auth
      </button>
      {userData && <DiscordLogout />}
      <button onClick={currentUser} className="text-white">
        currentUser
      </button>
    </div>
  );
}

export default Auth;
