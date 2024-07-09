import React, { useState, useEffect, useRef } from "react";
import authService from "../../appwrite/auth";
import Logout from "./Logout";
import { Models } from "appwrite";
import Avatar from "@mui/material/Avatar";
import { Button, styled } from "@mui/material";
import { FaDiscord } from "react-icons/fa";
import useTheme from "../../Theme/themeContext";

interface AuthProps {
  setVoter: React.Dispatch<React.SetStateAction<Models.Document | undefined>>;
  voter: Models.Document | undefined;
}

const StyledButton = styled(Button)<{ theme?: string }>`
  ${(props) =>
    //uncomment it once doing dark theme
    // props.theme === "dark" &&
    `
    .MuiButton-root {
      background:white;
      color: white;
      &:hover {
        background-color: rgba(0, 245, 140, 0.2);
        border: 1px solid #00F58C
      }
    } 
  `}
`;

function Auth({ setVoter, voter }: AuthProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

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
        console.log(user);
        try {
          const voter = await authService.checkAndAddUser({ username });
          setVoter(voter);
          setLoggedIn(true);
          setLoading(false);
          if (localStorage.getItem("shouldScrollToVotingSection") === "true") {
            document
              .getElementById("voting-section")
              ?.scrollIntoView({ behavior: "smooth" });
            localStorage.removeItem("shouldScrollToVotingSection");
          }
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
  console.log(voter);

  const { themeColor } = useTheme();

  return (
    <div className="max-w-[190px] mr-[15px]">
      {!voter && (
        <Button
          onClick={login}
          variant="outlined"
          startIcon={<FaDiscord style={{ minWidth: 21, minHeight: 21 }} />}
          sx={{
            minHeight: "40px",
            height: "40px",
            minWidth: "165px",
            padding: "auto",
            color: themeColor("white3"),
            borderColor: themeColor("white3"),
            ":hover": {
              bgcolor: "rgba(0, 245, 140, 0.2)",
              borderColor: "#00F58C",
            },
          }}
        >
          Connect
        </Button>
      )}
      {loggedIn && voter && (
        <div
          style={{
            color: themeColor("white3"),
            borderColor: themeColor("white3"),
          }} //edit this to make it work with hover
          className="min-w-[165px] h-[40px] rounded-[4px] px-[10px] w-full flex justify-evenly gap-[10px] items-center border border-solid hover:border-defaultgreen"
        >
          <div className="overflow-hidden">
            {!loading && (
              <p className="truncate">
                <span className="text-defaultgreen">@</span>
                {voter.username}
              </p>
            )}
          </div>
          {loading && <p>Loading...</p>}
          <Logout logOut={setLoggedIn} setVoter={setVoter} />
        </div>
      )}
    </div>
  );
}

export default Auth;
