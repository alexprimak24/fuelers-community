import Container from "../Container/Container";
import useTheme from "../../Theme/themeContext";
import { CircularProgress } from "@mui/material";
import { useSnackbar, VariantType } from "notistack";

export default function SectionTitle({ title }: { title: string }) {
  const words = title.split(" ");

  const { themeColor } = useTheme();

  return (
    <Container>
      <div className="pt-[140px] ax:pt-[200px] as:pt-[300px] max-w-[2560px] w-[100%] flex flex-col">
        <h1
          style={{ color: themeColor("white3") }}
          className="flex text-2xl aax:text-3xl ax:text-4xl aas:text-5xl md:text-6xl am:text-7xl font-groteskpanbold relative w-max"
        >
          <span className="mr-3">{words[0]}</span>
          <span className="flex flex-row opacity-50">
            {words.slice(1).join(" ")}
          </span>
          <div
            style={{ backgroundColor: themeColor("white3") }}
            className="absolute w-[80px] aax:w-[95px] ax:w-[120px] sm:w-[145px] md:w-[180px] am:w-[190px] lg:w-[200px] bottom-[-12px] right-0  h-[2px] mt-[20px] mb-[10px]"
          ></div>
        </h1>
      </div>
    </Container>
  );
}

export const ButtonSpinner = () => {
  return (
    <CircularProgress
      style={{
        margin: "2px",
        height: "14px",
        width: "14px",
        color: "#000",
      }}
    />
  );
};

export const useUserAlert = () => {
  const { enqueueSnackbar } = useSnackbar();
  const showUserAlert = ({
    variant,
    message,
  }: {
    variant: VariantType;
    message: string;
  }) => {
    enqueueSnackbar(message, {
      style: {
        // background: variant === "info" ? "#B8FBCF" : "#00F58C",
        // color: "#000",
        color: variant === "info" ? "white" : "black",
        backgroundColor:
          variant === "info" ? "rgba(0, 40, 200, 1)" : "rgba(0, 245, 140, 1)",
        border: variant === "info" ? "1px solid #0028C8" : "1px solid #00F58C",
      },
    });
  };

  return showUserAlert;
};
