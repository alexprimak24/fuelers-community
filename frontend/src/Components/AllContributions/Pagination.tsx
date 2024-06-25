// src/Components/Pagination/Pagination.tsx

import React from "react";
import { Pagination as MuiPagination, styled } from "@mui/material";

interface PaginationProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const StyledPagination = styled(MuiPagination)<{ theme?: string }>`
  ${(props) =>
    //uncomment it once doing dark theme
    // props.theme === "dark" &&
    `
    .MuiButtonBase-root.MuiPaginationItem-root {
      color: white;
      &:hover {
        background-color: rgba(0, 245, 140, 0.2);
        border: 1px solid #00F58C
      }
    }
      .MuiPaginationItem-root {
      color: white;
      }
   
  `}
`;

function Pagination({ count, page, onChange }: PaginationProps) {
  return (
    <StyledPagination
      count={count}
      page={page}
      onChange={onChange}
      color="primary"
      variant="outlined"
      shape="rounded"
    />
  );
}

export default Pagination;
