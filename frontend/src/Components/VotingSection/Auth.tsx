import React, { useState, useEffect } from "react";
import authService from "../../appwrite/auth";
import DiscordLogout from "./DiscordLogout";
import { Models } from "appwrite";

function Auth() {
  const [voter, setVoter] = useState<Models.Document | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

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
        const username = user?.name ?? "";
        console.log(username);
        try {
          const voter = await authService.checkAndAddUser({ username });
          setVoter(voter);
          setLoading(false);
        } catch (error) {
          console.log("Failed to check a Voter in Database: ", error);
        }
      } catch (error) {
        console.error("OAuth2 login failed:", error);
        setLoading(false);
      }
    };

    handleOAuth2Response();
  }, [authService.account]);

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
      {!voter && (
        <button onClick={login} className="text-white m-[10px]">
          Auth
        </button>
      )}
      <DiscordLogout />
      {voter && <p>Welcome {voter.username}</p>}
      {voter && <DiscordLogout />}
      <button onClick={currentUser} className="text-white">
        currentUser
      </button>
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default Auth;
