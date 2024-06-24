import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import cyberCity from "../../images/cyberFuelCity.jpg";
function OptionsRadio() {
  return (
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      defaultValue="female"
      name="radio-buttons-group"
    >
      <FormControlLabel value="Tank" control={<Radio />} label="Tank" />
      <FormControlLabel value="Tank1" control={<Radio />} label="Tank1" />
      <FormControlLabel value="Tank2" control={<Radio />} label="Tank2" />
      <FormControlLabel value="Tank3" control={<Radio />} label="Tank3" />
      <FormControlLabel value="Tank4" control={<Radio />} label="Tank4" />
    </RadioGroup>
  );
}

export default OptionsRadio;
