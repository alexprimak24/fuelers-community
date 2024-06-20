import React, { useState, useEffect } from "react";
import Contribution from "./Contribution";
import Grid from "@mui/material/Grid";
import appwriteService from "../../appwrite/config";
import { ContributionObj } from "./Contribution";
import { DocumentProps } from "../../App";

interface ContributionGridProps {
  contributions: DocumentProps[];
}
//https://mui.com/material-ui/customization/breakpoints/#custom-breakpoints
//when I'll make an adaptive check this.
function ContributionsGrid({ contributions }: ContributionGridProps) {
  return (
    <>
      <div className="my-[75px]">
        <Grid container spacing={3}>
          {contributions.map((contribution) => {
            return (
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={4}
                xl={2}
                key={contribution.document.index}
              >
                <Contribution
                  key={contribution.document.index}
                  contentImg={contribution.document.contentImg}
                  contentLink={contribution.document.contentLink}
                  pfp={contribution.document.pfp}
                  username={contribution.document.username}
                  date={contribution.document.date}
                  language={contribution.document.language}
                  //index={contribution.document.index}
                  title={contribution.document.title}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
}

export default ContributionsGrid;
