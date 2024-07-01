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

const CustomRadio = styled(Radio)(({ theme }) => ({
  "&:checked + .custom-label": {
    borderColor: "green",
    backgroundColor: "lightgreen",
  },
}));

const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  margin: 0,
  padding: "8px",
  cursor: "pointer",
  transition: "background-color 0.3s, border-color 0.3s",
  "& img": {
    marginRight: "8px",
  },
}));

const CustomProgressBar = styled(ProgressBar)`
  .wrapper {
    border: 3px solid blue;
    border-radius: 20px; /* Add border radius to the wrapper */
    overflow: hidden; /* Ensure the content doesn't overflow */
  }
  .completed {
    border-radius: 20px; /* Add border radius to the completed part */
  }
`;

function OptionsRadio({ values }: { values: number[] }) {
  const [optionToVote, setOptionToVote] = useState<number>();
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
  const total = values.reduce((acc, value) => acc + value, 0);
  // Data to give to the percentage bar
  const data = values.map((value, index) => ({
    label: `Value ${index + 1}`,
    percentage: (value / total) * 100,
    value,
  }));
  // Find the max value
  const maxValue = Math.max(...values);
  console.log(optionToVote);
  return (
    <div className="flex flex-col gap-[50px] w-full">
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="optionToVote"
          name={String(optionToVote)}
          value={optionToVote}
          onChange={handleChange}
        >
          {data.map((item, index) => (
            <CustomFormControlLabel
              value={index}
              key={index}
              control={<CustomRadio />}
              label={
                <div className=" flex">
                  <img src={cyberCity} alt="Cyber City" width={"200px"} />
                  <div className="flex flex-col">
                    <CustomProgressBar
                      bgColor={item.value === maxValue ? "#00F58C" : "#F5F5F5"}
                      height="40px"
                      labelColor="black"
                      baseBgColor="transparent"
                      animateOnRender={true}
                      completed={item.percentage}
                      customLabel={`${item.percentage.toFixed(2)}%`}
                      // className="border-[3px] border-solid border-defaultwhite"
                    />
                    <p>I am Nitita {index}</p>
                  </div>
                </div>
              }
            />
          ))}
          {/* Add more CustomFormControlLabel components as needed */}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default OptionsRadio;
