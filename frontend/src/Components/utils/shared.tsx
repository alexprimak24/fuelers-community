import styled from "@emotion/styled";

// export const StyledBorder = styled.div<{
//   themeColor: (name: ColorName) => string;
// }>`
//   border: 4px solid ${(props) => props.themeColor("gray4")};
//   border-radius: 5px;
// `;

export default function SectionTitle({ title }: { title: string }) {
  const words = title.split(" ");

  return (
    <div className="pt-[300px] px-[140px] max-w-[2560px] w-[100%] flex flex-col">
      <h1 className="flex text-7xl text-defaultwhite font-groteskpanbold relative w-max">
        <span className="mr-3">{words[0]}</span>
        <span className="flex flex-row opacity-50">
          {words.slice(1).join(" ")}
        </span>
        <div className="absolute max-w-[200px] w-full bottom-[-12px] right-0 w-full h-[2px] bg-defaultwhite mt-[20px] mb-[10px]"></div>
      </h1>
    </div>
  );
}
