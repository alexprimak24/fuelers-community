import React, { useState } from "react";
import authService from "../../appwrite/auth";

function Auth() {
  const [userData, setUserData] = useState<any>();
  const create = async () => {
    const userDataa = await authService.handleLogin();
    setUserData(userDataa);
  };
  console.log(userData);

  return (
    <button onClick={create} className="text-white">
      Auth
    </button>
  );
}

export default Auth;
