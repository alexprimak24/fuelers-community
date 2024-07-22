import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import appwriteService from "../../appwrite/config";
import useTheme from "../../Theme/themeContext";
import DoneIcon from "@mui/icons-material/Done";

//REMOVE OPTIONAL
interface ContributionProps {
  id?: number;
  title: string;
  contentImg: string;
  contentLink: string;
  pfp: string;
  username: string;
  date: string;
  language: string;
}

export interface ContributionObj {
  document: ContributionProps;
}

function Contribution({
  id,
  title,
  contentImg,
  pfp,
  username,
  date,
  contentLink,
}: ContributionProps) {
  const { themeColor } = useTheme();
  const [isCopied, setIsCopied] = useState(false);

  const copyTextToClipboard = (username: string) => {
    navigator.clipboard
      .writeText(username)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="relative group">
      <Card
        sx={{
          boxShadow: "none",
          background: "transparent",
          maxWidth: "800px",
        }}
      >
        <div className="relative">
          <div className="relative">
            <div className="absolute inset-0 border-2 border-defaultgreen rounded-lg z-10 pointer-events-none"></div>
            <div className="relative">
              <a href={contentLink} target="_blank" rel="noreferrer">
                <CardMedia
                  component="img"
                  image={appwriteService.getFilePreview({
                    fileId: contentImg,
                  })}
                  className="rounded-lg h-auto max-h-[440px]"
                />
                <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-500 rounded-lg z-5"></div>
              </a>
            </div>
          </div>
          <CardContent
            sx={{ paddingLeft: 0, paddingRight: 0, paddingTop: "20px" }}
          >
            <a href={contentLink} target="_blank" rel="noreferrer">
              <p
                style={{ color: themeColor("white5") }}
                className="font-questrial text-2xl mb-[10px]"
              >
                {title}
              </p>
            </a>
            <div className="">
              <div className="flex justify-between items-center">
                <div className="flex gap-[10px] items-center">
                  <CalendarMonthIcon color="primary" />
                  <p
                    style={{ color: themeColor("green1") }}
                    className="font-grotesk text-base"
                  >
                    {date}
                  </p>
                </div>
                <div className="flex gap-[10px] items-center mr-[50px] ml-[10px]">
                  <Avatar
                    alt="ContributorPfp"
                    src={pfp}
                    sx={{
                      width: 30,
                      height: 30,
                      outline: `1px solid #00F58C`,
                    }}
                  />
                  <Tooltip
                    title={
                      isCopied ? (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          Copied{" "}
                          <DoneIcon
                            style={{
                              marginLeft: 4,
                              width: "12px",
                              height: "12px",
                            }}
                            color="primary"
                          />
                        </div>
                      ) : (
                        "Copy Username"
                      )
                    }
                  >
                    <p
                      style={{ color: themeColor("white5") }}
                      className="font-grotesk text-base cursor-pointer"
                      onClick={() => copyTextToClipboard(username)}
                    >
                      {username}
                    </p>
                  </Tooltip>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

export default Contribution;
