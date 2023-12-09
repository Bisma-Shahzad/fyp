import { useState } from "react";
import './style.css'
import SearchIcon from '@mui/icons-material/Search';
import { MenuItem, Select, InputLabel, FormControl, Paper } from "@mui/material";

function BSFilterDropdown(props) {
  const { label, onSelectionChange, suggestions } = props;
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelectionChange(selectedValue);
  };

  return (
    <div className="filterdiv">
      {/* <label>{label ?? "Select..."}</label> */}
      <select
        value={selectedOption}
        onChange={handleSelectionChange}
        style={{
          width: "15vw",
          height: "40px",
          fontSize: "16px",
        }}
      >
        <option value="" disabled hidden>
          Select an option
        </option>
        {suggestions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}


export default BSFilterDropdown;
