import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { styled } from "@mui/material/styles";
import cyberCity from "../../images/cyberFuelCity.jpg";
import ProgressBar from "@ramonak/react-progress-bar";
import { useInView } from "react-intersection-observer";
import { CategoryToVoteProps, VoteCategoriesProps } from "./CategoryToVote";
import useTheme from "../../Theme/themeContext";
import Avatar from "@mui/material/Avatar";

const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "30px",
  margin: 0,
  padding: "8px",
  cursor: "pointer",
  transition: "background-color 0.3s, border-color 0.3s",
  "& img": {
    marginRight: "8px",
  },
}));

interface OptionsRadioProps {
  data: {
    values: number[];
    voteCategories: VoteCategoriesProps[];
  };
  optionToVote: number | null;
  setOptionToVote: React.Dispatch<React.SetStateAction<number | null>>;
  isContribution?: boolean;
}

function OptionsRadio({
  data,
  optionToVote,
  setOptionToVote,
  isContribution,
}: OptionsRadioProps) {
  const { values, voteCategories } = data;
  const [animate, setAnimate] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    onChange: (inView) => {
      if (inView) {
        setAnimate(true); // Set animate to true on view
      }
    },
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOptionToVote(Number(event.target.value));
  };
  // Sum of all the values aka numbers of votes
  const total = data.values.reduce((acc, value) => acc + value, 0);
  // Data to give to the percentage bar
  const dataToSend = values.map((value, index) => ({
    label: `Value ${index + 1}`,
    percentage: (value / total) * 100,
    value,
  }));
  // Find the max value
  const maxValue = Math.max(...values);

  // Combine voteCategories and dataToSend
  const combinedData = voteCategories.map((category, index) => ({
    category,
    ...dataToSend[index],
  }));
  //imported theme color for white theme
  const { themeColor } = useTheme();

  console.log(optionToVote);
  return (
    <div className="flex flex-col justify-between gap-[50px] w-full">
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="optionToVote"
          name={String(optionToVote)}
          value={optionToVote}
          onChange={handleChange}
        >
          {combinedData.map((item, index) => (
            <CustomFormControlLabel
              value={index}
              key={index}
              control={
                <Radio
                  sx={{
                    "&.MuiRadio-root": {
                      color: themeColor("white3"),
                    },
                    "&.Mui-checked": {
                      color: "#00F58C",
                    },
                  }}
                />
              }
              label={
                <div className="w-full flex justify-between gap-[50px]">
                  <a href={item.category.document.contentlink} target="_blank">
                    {isContribution ? (
                      <img
                        src={item.category.document.image}
                        alt="UserToVoteImage"
                        className="max-w-[320px] rounded-[10px] border-[3px] border-solid border-defaultgreen"
                        loading="lazy"
                      />
                    ) : (
                      <img
                        src={item.category.document.image}
                        alt="UserToVoteImage"
                        className="max-w-[180px] max-h-[180px] rounded-full border-[3px] border-solid border-defaultgreen"
                        loading="lazy"
                      />
                    )}
                  </a>
                  <div className="flex flex-col justify-center gap-[10px] w-full">
                    <p
                      className="text-2xl pl-[20px]"
                      style={{ color: themeColor("white3") }}
                    >
                      {item.category.document.discordHandle}
                    </p>
                    <div
                      className="border-[1px] border-solid rounded-[21px] w-full"
                      style={{ borderColor: themeColor("white3") }}
                    >
                      <ProgressBar
                        bgColor={
                          item.value === maxValue
                            ? "#00F58C"
                            : themeColor("white3")
                        }
                        height="40px"
                        labelColor={
                          item.value === maxValue
                            ? "#000"
                            : themeColor("black5")
                        }
                        baseBgColor="transparent"
                        animateOnRender={true}
                        borderRadius="18px"
                        width="100%"
                        completed={item.percentage}
                        customLabel={`${item.percentage.toFixed(0)}%`}
                        // className="min-w-[1200px] w-full items-center"
                      />
                    </div>
                  </div>
                </div>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default OptionsRadio;
