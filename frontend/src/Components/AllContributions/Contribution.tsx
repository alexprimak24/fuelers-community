import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import cyberCity from "../../images/cyberFuelCity.jpg";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Avatar from "@mui/material/Avatar";

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
  language,
}: ContributionProps) {
  return (
    <a href={contentLink} target="_blank">
      <div className="relative group">
        <div className="relative">
          <Card sx={{ background: "transparent", maxWidth: "400px" }}>
            <div className="relative">
              <div className="absolute inset-0 border-2 border-defaultgreen rounded-lg z-10 pointer-events-none"></div>

              <CardMedia
                component="img"
                alt="contribtuionImage"
                image={contentImg}
                className="rounded-lg h-[220px]"
              />
            </div>
            <CardContent
              sx={{ paddingLeft: 0, paddingRight: 0, paddingTop: "20px" }}
            >
              <p className="font-questrial text-2xl text-defaultwhite mb-[10px]">
                {title}
              </p>
              <div className="">
                <div className="flex justify-between items-center">
                  <div className="flex gap-[10px] items-center">
                    <CalendarMonthIcon color="primary" />
                    <p className="font-grotesk text-base text-defaultlightgreen">
                      {date}
                    </p>
                  </div>
                  <div className="flex gap-[10px] items-center mr-[50px]">
                    <Avatar
                      alt="ContributorPfp"
                      src={pfp}
                      sx={{ width: 30, height: 30 }}
                    />
                    <p className="font-grotesk text-base text-defaultwhite">
                      {username}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-500 rounded-lg z-5"></div>
        </div>
      </div>
    </a>
  );
}

export default Contribution;
