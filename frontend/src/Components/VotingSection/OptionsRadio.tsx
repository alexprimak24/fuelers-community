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
      <FormControlLabel value={cyberCity} control={<Radio />} label="Tank" />
      <FormControlLabel value={cyberCity} control={<Radio />} label="Tank" />
      <FormControlLabel value={cyberCity} control={<Radio />} label="Tank" />
      <FormControlLabel value={cyberCity} control={<Radio />} label="Tank" />
      <FormControlLabel value={cyberCity} control={<Radio />} label="Tank" />
    </RadioGroup>
  );
}

export default OptionsRadio;
