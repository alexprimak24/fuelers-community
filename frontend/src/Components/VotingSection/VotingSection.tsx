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
  "0x39e65eddac8cc09f3e6698cdcc21da3b4a87445df708cf2d130bb3f1fbc053c4";

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
    return (
      <Container>
        <div
          ref={ref} // Added ref to the div
          id="voting-section" // Added ID for scrolling
          style={{ borderColor: themeColor("black2") }}
          className="rounded-[30px] border border-solid px-[45px] py-[50px] mt-[60px]"
        >
          <div className="flex self-end sm:inline-table">
            {/* <CategoryToVoteButton categoryName="Best Content" />
            <CategoryToVoteButton categoryName="Top contributor" />
            <CategoryToVoteButton categoryName="Best Activist" /> */}
            {/* <OptionsRadio /> */}
            <CategoryToVote values={values} />
            <Auth />
          </div>
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
        </div>
      </Container>
    );
  }
);

export default VotingSection;
