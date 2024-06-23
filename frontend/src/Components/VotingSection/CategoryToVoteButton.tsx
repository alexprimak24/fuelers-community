import React from "react";
import Button from "@mui/material/Button";

interface CategoryToVoteButtonProps {
  categoryName: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
function CategoryToVoteButton({
  categoryName,
  onClick,
}: CategoryToVoteButtonProps) {
  return (
    <Button
      style={{
        minWidth: "105px",
        height: "40px",
        marginRight: "15px",
        marginBottom: "10px",
      }}
      variant="contained"
      onClick={onClick}
      className="text-xl border border-solid border-defaultwhite ml-[40px]"
    >
      {categoryName}
    </Button>
  );
}

export default CategoryToVoteButton;
