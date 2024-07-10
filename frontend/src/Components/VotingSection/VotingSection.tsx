import React, { forwardRef } from "react";
import Container from "../Container/Container";
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
import DoneIcon from "@mui/icons-material/Done";
import Tooltip from "@mui/material/Tooltip";
import { getAllItems } from "./GetUsersVotes";
import { ButtonSpinner } from "../utils/shared";
import { useUserAlert } from "../utils/shared";

interface VotingSectionProps {
  values?: number[];
}

const CONTRACT_ID =
  "0x6add81c4654d6a74438cb17cbab9de9d46151db990ec42e9a11c7efee93dce1c";

const VotingSection = forwardRef<HTMLDivElement, VotingSectionProps>(
  ({ values }, ref) => {
    const { themeColor } = useTheme();
    const { isConnected } = useIsConnected();
    const { connect, isConnecting } = useConnectUI();
    const { wallet } = useWallet();
    const [sectionSelected, setSectionSelected] = useState(0);
    const [optionToVote, setOptionToVote] = useState<number | null>(null);
    const [voter, setVoter] = useState<Models.Document | undefined>();
    const [isCopied, setIsCopied] = useState(false);
    const [bestContributorOptions, setBestContributorOptions] = useState<
      number[]
    >(Array(5).fill(0));
    const [bestContributionOptions, setBestContributionOptions] = useState<
      number[]
    >(Array(5).fill(0));
    const [bestActivistOptions, setBestActivistOptions] = useState<number[]>(
      Array(5).fill(0)
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [status, setStatus] = useState<
      "success" | "loading" | "error" | "none"
    >("none");

    const [submittingVoteStatus, setSubmittingVoteStatus] = useState<
      "success" | "loading" | "error" | "none"
    >("none");
    const showUserAlert = useUserAlert();

    const submitVote = async () => {
      setSubmittingVoteStatus("loading");
      if (!voter) {
        setSubmittingVoteStatus("none");
        showUserAlert({
          variant: "info",
          message: "Please log in first.",
        });
        return;
      }
      const voteField = `vote${sectionSelected + 1}`;
      if (voter[voteField]) {
        setSubmittingVoteStatus("none");
        showUserAlert({
          variant: "info",
          message: "Oops..You already voted for this section.",
        });
        return;
      }
      if (!contract) {
        setSubmittingVoteStatus("none");
        showUserAlert({
          variant: "info",
          message: "Please connect the wallet.",
        });
        return;
      }
      if (!optionToVote) {
        setSubmittingVoteStatus("none");
        showUserAlert({
          variant: "info",
          message: "Pick the candidate you like.",
        });
        return;
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
        showUserAlert({
          variant: "success",
          message: "Congratulations!Your vote is in!🎉",
        });
        await getAllItems({
          contract,
          setBestContributorOptions,
          setBestContributionOptions,
          setBestActivistOptions,
          setStatus,
        });
        setSubmittingVoteStatus("success");
      } catch (error) {
        setSubmittingVoteStatus("error");
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

    const formatWalletAddress = (address: string) => {
      const start = address.slice(0, 6);
      const end = address.slice(-4);
      return `${start}...${end}`;
    };

    const copyAddressToClipboard = (address: string) => {
      navigator.clipboard
        .writeText(address)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy address: ", err);
        });
    };

    const address = wallet ? wallet.address.toB256() : "";

    return (
      <Container>
        <div
          ref={ref}
          id="voting-section"
          style={{ borderColor: themeColor("black2") }}
          className="rounded-[30px] border border-solid px-[10px] ax:px-[30px] sm:px-[40px] as:px-[50px] py-[50px] mt-[60px]"
        >
          <div className="">
            <CategoryToVote
              contract={contract}
              sectionSelected={sectionSelected}
              setSectionSelected={setSectionSelected}
              optionToVote={optionToVote}
              setOptionToVote={setOptionToVote}
              setBestContributorOptions={setBestContributorOptions}
              setBestContributionOptions={setBestContributionOptions}
              setBestActivistOptions={setBestActivistOptions}
              setStatus={setStatus}
              bestActivistOptions={bestActivistOptions}
              bestContributionOptions={bestContributionOptions}
              bestContributorOptions={bestContributorOptions}
              setSubmittingVoteStatus={setSubmittingVoteStatus}
            />
          </div>
          <Tabs
            value={1}
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
              onClick={submitVote}
              variant="contained"
              startIcon={
                submittingVoteStatus === "loading" ? (
                  <ButtonSpinner />
                ) : (
                  <IoCheckmarkDoneOutline
                    style={{ minWidth: 21, minHeight: 21 }}
                  />
                )
              }
              sx={{
                minHeight: "40px",
                height: "40px",
                minWidth: "128px",
                padding: "auto",
                marginRight: "15px",
                background: "#B8FBCF",
                ":hover": {
                  bgcolor: "#00F58C",
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
                  color: themeColor("white3"),
                  borderColor: themeColor("white3"),
                  ":hover": {
                    borderColor: themeColor("white3"),
                  },
                }}
              >
                <div className="flex flex-col gap-[5px] mr-[30px] mt-[3px]">
                  <p
                    className="text-[10px] leading-none "
                    style={{ color: themeColor("white3") }}
                  >
                    Connected with<span className="text-defaultgreen">:</span>
                  </p>
                  <Tooltip
                    title={
                      isCopied ? (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          Copied{" "}
                          <DoneIcon
                            style={{
                              marginLeft: 4,
                              width: "12px",
                              height: "12px",
                            }}
                            color="primary"
                          />
                        </div>
                      ) : (
                        "Copy Address"
                      )
                    }
                  >
                    <p
                      style={{ color: themeColor("white5") }}
                      className="leading-none max-w-[100px] truncate text-[12px] cursor-pointer  text-left"
                      onClick={() => copyAddressToClipboard(address)}
                    >
                      {wallet ? formatWalletAddress(address) : ""}
                    </p>
                  </Tooltip>
                </div>
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
                    color: themeColor("white3"),
                    borderColor: themeColor("white3"),
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
        <p
          style={{
            color: themeColor("white3"),
            backgroundColor: "rgba(0, 245, 140, 0.1)",
            borderColor: "#00F58C",
          }}
          className="border mt-[10px] px-4 py-2 rounded-[30px] flex justify-center md:hidden"
        >
          To be able to vote please switch to PC
        </p>
      </Container>
    );
  }
);

export default VotingSection;
