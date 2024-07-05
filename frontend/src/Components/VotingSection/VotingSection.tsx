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

interface VotingSectionProps {
  values: number[];
}

const CONTRACT_ID =
  "0x1b0f81ce7f4246846b7e675163c6ebca705c92b04fea9264aa3e90eea4ebb488";

const VotingSection = forwardRef<HTMLDivElement, VotingSectionProps>(
  ({ values }, ref) => {
    const { themeColor } = useTheme();
    const { isConnected } = useIsConnected();
    const { connect, isConnecting } = useConnectUI();
    const { wallet } = useWallet();
    const [sectionSelected, setSectionSelected] = useState(0);
    const [optionToVote, setOptionToVote] = useState<number | null>(null);

    const onIncrementPressed = async () => {
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
    console.log(contract);
    return (
      <Container>
        <div
          ref={ref} // Added ref to the div
          id="voting-section" // Added ID for scrolling
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
            <Auth />
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
