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
  "0x61f8873aa040ff407cbeac482f6f142403acb673b559934314999e6d9e963b87";

const VotingSection = forwardRef<HTMLDivElement, VotingSectionProps>(
  ({ values }, ref) => {
    const { themeColor } = useTheme();
    const { isConnected } = useIsConnected();
    const { connect, isConnecting } = useConnectUI();
    const { wallet } = useWallet();

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
            <CategoryToVote contract={contract} />
          </div>
          <div className="inline-table sm:flex">
            <Auth />
            {isConnected ? (
              <div>I am Connected</div>
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
