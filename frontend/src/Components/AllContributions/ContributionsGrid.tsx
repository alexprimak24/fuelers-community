import React from "react";
import Contribution from "./Contribution";
import Grid from "@mui/material/Grid";
import { DocumentProps } from "../../App";

interface ContributionsGridProps {
  contributions: DocumentProps[];
}

function ContributionsGrid({ contributions }: ContributionsGridProps) {
  return (
    <>
      <div className="mt-[75px] mb-[15px]">
        <Grid container spacing={3}>
          {contributions.map((contribution) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
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
