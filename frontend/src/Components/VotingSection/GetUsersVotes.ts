import { ContractAbi } from "../../contracts";

interface getAllItemsProps {
  contract: ContractAbi | null;
  setBestContributorOptions: React.Dispatch<React.SetStateAction<number[]>>;
  setBestContributionOptions: React.Dispatch<React.SetStateAction<number[]>>;
  setBestActivistOptions: React.Dispatch<React.SetStateAction<number[]>>;
  setStatus: React.Dispatch<
    React.SetStateAction<"loading" | "success" | "error" | "none">
  >;
}

export async function getAllItems({
  contract,
  setBestContributorOptions,
  setBestContributionOptions,
  setBestActivistOptions,
  setStatus,
}: getAllItemsProps) {
  if (contract !== null) {
    try {
      let contributor = await contract.functions
        .read_contributor()
        .txParams({
          gasLimit: 100_000,
        })
        .get();
      const contributorArr = Array.from(contributor?.value);
      setBestContributorOptions(contributorArr);

      let contribution = await contract.functions
        .read_contribution()
        .txParams({
          gasLimit: 100_000,
        })
        .get();
      const contributionArr = Array.from(contribution?.value);
      setBestContributionOptions(contributionArr);

      let activist = await contract.functions
        .read_activist()
        .txParams({
          gasLimit: 100_000,
        })
        .get();
      const activistArr = Array.from(activist?.value);
      setBestActivistOptions(activistArr);

      setStatus("success");
    } catch (e) {
      setStatus("error");
      console.log("ERROR:", e);
    }
  }
}
