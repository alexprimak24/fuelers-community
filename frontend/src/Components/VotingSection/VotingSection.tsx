import React, { forwardRef } from "react";
import Container from "../Container/Container";
import OptionsRadio from "./OptionsRadio";
import Auth from "./Auth";
import CategoryToVote from "./CategoryToVote";
import CategoryToVoteButton from "../utils/CategoryToVoteButton";
import useTheme from "../../Theme/themeContext";
import { useState, useMemo } from "react";
import { useConnectUI, useIsConnected, useWallet } from "@fuels/react";
import { ContractAbi__factory } from "../../contracts";
import Button from "@mui/material/Button";
import { Models } from "appwrite/types/models";
import authService from "../../appwrite/auth";

interface VotingSectionProps {
  values: number[];
}

const CONTRACT_ID =
  "0x5e37e24bc815556891e93e2ea3ac686e9eb36934839b50e3d4cd8900d52c74a0";

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
          <div className="inline-table sm:flex">
            <Auth setVoter={setVoter} voter={voter} />
            {isConnected ? (
              <Button
                variant="outlined"
                sx={{
                  height: "42px",
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
                  sx={{
                    height: "42px",
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
            <Button
              variant="outlined"
              sx={{
                height: "42px",
                color: "white",
                borderColor: "white",
                ":hover": {
                  bgcolor: "rgba(0, 245, 140, 0.2)",
                  borderColor: "#00F58C",
                },
              }}
              onClick={onIncrementPressed}
            >
              Vote
            </Button>
          </div>
        </div>
      </Container>
    );
  }
);

export default VotingSection;
