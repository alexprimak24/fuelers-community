import React from "react";
import styled from "@emotion/styled";
import Pagination from "@mui/material/Pagination";
import useTheme from "../../Theme/themeContext";

interface PaginationProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const StyledPagination = styled(Pagination)<{ theme: string }>`
  ${(props) =>
    props.theme === "dark"
      ? `
    .MuiButtonBase-root.MuiPaginationItem-root {
      color: white;
      &:hover {
        background-color: rgba(0, 245, 140, 0.2);
        border: 1px solid #00F58C;
      }
    }
    .MuiPaginationItem-root {
      color: white;
    }
  `
      : `.MuiButtonBase-root.MuiPaginationItem-root {
      border:transparent;
      &:hover {
        background-color: rgba(0, 245, 140, 0.2);
        border: 1px solid #00F58C;
      }
    }`}
`;

function Paginationn({ count, page, onChange }: PaginationProps) {
  const { theme } = useTheme();
  return (
    <StyledPagination
      theme={theme}
      count={count}
      page={page}
      onChange={onChange}
      color={theme === "dark" ? "primary" : "standard"}
      variant="outlined"
      shape="rounded"
    />
  );
}

export default Paginationn;
