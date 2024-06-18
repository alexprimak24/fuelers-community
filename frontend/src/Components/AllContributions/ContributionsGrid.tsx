import React, { useState, useEffect } from "react";
import Contribution from "./Contribution";
import Grid from "@mui/material/Grid";
import appwriteService from "../../appwrite/config";
import { ContributionObj } from "./Contribution";

function ContributionsGrid() {
  const [contribution, setContribution] = useState<ContributionObj[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await appwriteService.getPosts();
      if (response && response.documents) {
        const mappedPosts = response.documents.map((doc: any) => ({
          document: {
            imageUrl: doc.imageUrl,
            title: doc.title,
            contentUrl: doc.contentUrl,
            language: doc.language,
          },
        }));
        setContribution(mappedPosts);
      } else {
        console.log("No documents found");
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="my-[75px]">
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Contribution />
          </Grid>
          <Grid item xs={4}>
            <Contribution />
          </Grid>
          <Grid item xs={4}>
            <Contribution />
          </Grid>
          <Grid item xs={4}>
            <Contribution />
          </Grid>
          <Grid item xs={4}>
            <Contribution />
          </Grid>
          <Grid item xs={4}>
            <Contribution />
          </Grid>
          <Grid item xs={4}>
            <Contribution />
          </Grid>
          <Grid item xs={4}>
            <Contribution />
          </Grid>
          <Grid item xs={4}>
            <Contribution />
          </Grid>
          <Grid item xs={4}>
            <Contribution />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default ContributionsGrid;
