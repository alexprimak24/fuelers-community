import React, { useState, useEffect } from "react";
import Contribution from "./Contribution";
import Grid from "@mui/material/Grid";
import appwriteService from "../../appwrite/config";
import { ContributionObj } from "./Contribution";
import { useInView } from "react-intersection-observer";
import { DocumentProps } from "../../App";

interface ContributionsGridProps {
  contributions: DocumentProps[];
}

//https://mui.com/material-ui/customization/breakpoints/#custom-breakpoints
//when I'll make an adaptive check this.
function ContributionsGrid({ contributions }: ContributionsGridProps) {
  return (
    <>
      <div className="mt-[75px] mb-[15px]">
        <Grid container spacing={3}>
          {contributions.map((contribution) => (
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={3}
              key={contribution.document.index}
            >
              <Contribution
                contentImg={contribution.document.contentImg}
                contentLink={contribution.document.contentLink}
                pfp={contribution.document.pfp}
                username={contribution.document.username}
                date={contribution.document.date}
                language={contribution.document.language}
                title={contribution.document.title}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default ContributionsGrid;
