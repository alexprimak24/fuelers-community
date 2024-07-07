import React, { forwardRef } from "react";
import Container from "../Container/Container";
import OptionsRadio from "./OptionsRadio";
import Auth from "./Auth";
import CategoryToVote from "./CategoryToVote";
import useTheme from "../../Theme/themeContext";
import { useState, useMemo } from "react";
import { useConnectUI, useIsConnected, useWallet } from "@fuels/react";
import { ContractAbi__factory } from "../../contracts";
import Button from "@mui/material/Button";
import { Models } from "appwrite/types/models";
import { Tabs } from "@mui/material";
import authService from "../../appwrite/auth";
import { PiWallet } from "react-icons/pi";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

interface VotingSectionProps {
  values: number[];
}

const CONTRACT_ID =
  "0x21aaf19581c5368fb5c597c3e6016cae131e1d865672cf66fd164f4f35a2a708";

const VotingSection = forwardRef<HTMLDivElement, VotingSectionProps>(
  ({ values }, ref) => {
    const { themeColor } = useTheme();
    const { isConnected } = useIsConnected();
    const { connect, isConnecting } = useConnectUI();
    const { wallet } = useWallet();
    const [sectionSelected, setSectionSelected] = useState(0);
    const [optionToVote, setOptionToVote] = useState<number | null>(null);
    const [voter, setVoter] = useState<Models.Document | undefined>();

    const onIncrementPressed = async () => {
      if (!voter) {
        return alert("Please log in first.");
      }
      const voteField = `vote${sectionSelected + 1}`;
      if (voter[voteField]) {
        return alert("You have already voted for this section.");
      }
      if (!contract) {
        return alert("Contract not loaded");
      }
      if (!optionToVote) {
        return alert("kidly pick the candidate you like");
      }
      try {
        await contract.functions
          .submit_vote(sectionSelected, optionToVote)
          .txParams({
            gasLimit: 100_000,
          })
          .call();
        await authService.updateVoteStatus({
          userId: voter.$id,
          sectionSelected: sectionSelected,
        });
        // Update the local state to reflect the new vote status
        setVoter((prevVoter) => {
          if (!prevVoter) {
            return prevVoter;
          }
          return {
            ...prevVoter,
            [voteField]: true,
          };
        });

        alert("Your vote has been submitted successfully!");
        // await getCount(contract);
      } catch (error) {
        console.error(error);
      }
    };

    const contract = useMemo(() => {
      if (wallet) {
        const contract = ContractAbi__factory.connect(CONTRACT_ID, wallet);
        return contract;
      }
      return null;
    }, [wallet]);
    console.log(wallet);
    console.log(wallet?.address.toB256());
    return (
      <Container>
        <div
          ref={ref}
          id="voting-section"
          style={{ borderColor: themeColor("black2") }}
          className="rounded-[30px] border border-solid px-[45px] py-[50px] mt-[60px]"
        >
          <div className="">
            <CategoryToVote
              contract={contract}
              sectionSelected={sectionSelected}
              setSectionSelected={setSectionSelected}
              optionToVote={optionToVote}
              setOptionToVote={setOptionToVote}
            />
          </div>
          <Tabs
            TabIndicatorProps={{ style: { display: "none" } }}
            sx={{
              color: themeColor("white3"),
              // "&:Mui-disabled": {
              //   color: themeColor("white3"),
              // },
            }}
            aria-label="basic tabs example"
            allowScrollButtonsMobile={true}
            variant="scrollable"
          >
            <Button
              onClick={onIncrementPressed}
              variant="contained"
              startIcon={
                <IoCheckmarkDoneOutline
                  style={{ minWidth: 21, minHeight: 21 }}
                />
              }
              sx={{
                minHeight: "40px",
                height: "40px",
                minWidth: "128px",
                padding: "auto",
                marginRight: "15px",
                background: "#B8FBCF",
                ":hover": {
                  bgcolor: "rgba(0, 245, 140, 0.2)",
                  borderColor: "#00F58C",
                },
              }}
            >
              Vote
            </Button>
            <Auth setVoter={setVoter} voter={voter} />
            {isConnected ? (
              <Button
                variant="outlined"
                sx={{
                  minHeight: "40px",
                  height: "40px",
                  minWidth: "165px",
                  maxWidth: "180px",
                  padding: "auto",
                  marginRight: "15px",
                  color: "white",
                  borderColor: "white",
                  ":hover": {
                    bgcolor: "rgba(0, 245, 140, 0.2)",
                    borderColor: "#00F58C",
                  },
                }}
              >
                I am Connected
              </Button>
            ) : (
              <div>
                <Button
                  onClick={() => {
                    connect();
                  }}
                  variant="outlined"
                  startIcon={
                    <PiWallet style={{ minWidth: 21, minHeight: 21 }} />
                  }
                  sx={{
                    minHeight: "40px",
                    height: "40px",
                    minWidth: "165px",
                    padding: "auto",
                    marginRight: "15px",
                    color: "white",
                    borderColor: "white",
                    ":hover": {
                      bgcolor: "rgba(0, 245, 140, 0.2)",
                      borderColor: "#00F58C",
                    },
                  }}
                >
                  {isConnecting ? "Connecting" : "Connect"}
                </Button>
              </div>
            )}
          </Tabs>
        </div>
      </Container>
    );
  }
);

export default VotingSection;
