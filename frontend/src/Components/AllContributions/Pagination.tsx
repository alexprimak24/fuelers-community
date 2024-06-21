// src/Components/Pagination/Pagination.tsx

import React from "react";
import { Pagination as MuiPagination, styled } from "@mui/material";

interface PaginationProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const StyledPagination = styled(Pagination)<{ theme?: string }>`
  ${(props) =>
    props.theme === "dark" &&
    `
   & fieldset {
      border: none;
    }
    .MuiPagination-root {
      background-color: #181818;
      color: #E9E7FB;
      border-bottom: 1px solid #E9E7FB;
      border-right: 1px solid #E9E7FB;
      &:hover {
        background: black;
      }
    }
    .MuiPagination-root {
      padding-left: 0;
      padding right: 0;
    }
    .MuiPagination-root {
      color: #E0FFFF;
    }
    .MuiPagination-root {
      color: #E9E7FB;
    }
  `}
`;

function Pagination({ count, page, onChange }: PaginationProps) {
  return (
    <StyledPagination count={count} page={page} onChange={onChange} sx={{}} />
  );
}

export default Pagination;

// .MuiPagination-outlined
// .MuiPagination-root
// .MuiPagination-text
// .MuiPagination-ul
