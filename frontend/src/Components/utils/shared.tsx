import styled from "@emotion/styled";
import Container from "../Container/Container";
import useTheme from "../../Theme/themeContext";
import { CircularProgress } from "@mui/material";
// export const StyledBorder = styled.div<{
//   themeColor: (name: ColorName) => string;
// }>`
//   border: 4px solid ${(props) => props.themeColor("gray4")};
//   border-radius: 5px;
// `;

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
  const { themeColor } = useTheme();
  return (
    <CircularProgress
      style={{
        margin: "2px",
        height: "14px",
        width: "14px",
        color: themeColor("white2"),
      }}
    />
  );
};
