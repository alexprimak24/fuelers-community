import styled from "@emotion/styled";
import Container from "../Container/Container";
// export const StyledBorder = styled.div<{
//   themeColor: (name: ColorName) => string;
// }>`
//   border: 4px solid ${(props) => props.themeColor("gray4")};
//   border-radius: 5px;
// `;

export default function SectionTitle({ title }: { title: string }) {
  const words = title.split(" ");

  return (
    <Container>
      <div className="pt-[140px] ax:pt-[200px] as:pt-[300px] max-w-[2560px] w-[100%] flex flex-col">
        <h1 className="flex text-2xl aax:text-3xl ax:text-4xl aas:text-5xl md:text-6xl am:text-7xl text-defaultwhite font-groteskpanbold relative w-max">
          <span className="mr-3">{words[0]}</span>
          <span className="flex flex-row opacity-50">
            {words.slice(1).join(" ")}
          </span>
          <div className="absolute w-[80px] aax:w-[95px] ax:w-[120px] sm:w-[145px] md:w-[180px] am:w-[190px] lg:w-[200px] bottom-[-12px] right-0  h-[2px] bg-defaultwhite mt-[20px] mb-[10px]"></div>
        </h1>
      </div>
    </Container>
  );
}
