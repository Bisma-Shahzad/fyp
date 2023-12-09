import { useState } from "react";
import './searchbargpt.css'
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Paper, TextField } from "@mui/material";

function SearchBargpt(props) {
  const { label, onSearch, suggestions } = props;
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e, newValue) => {
    setSearchText(newValue);
    onSearch(newValue);
  };

  return (
    <div className="searchbardiv">
      <SearchIcon style={{ color: "rgb(67, 67, 67)", fontSize: "45px", margin: 2 }} className="searchIconButton" />
      <Autocomplete
        options={suggestions}
        value={searchText}
        onChange={(event, newValue) => onSearch(newValue)}
        inputValue={searchText}
        onInputChange={handleInputChange}
        PaperComponent={({ children }) => (
          <Paper style={{ backgroundColor: "#dcdcdc" }}>{children}</Paper>
        )}
        InputProps={{ disableUnderline: true }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder={label ?? "Search..."}
            // InputProps={{ disableUnderline: true }}
            style={{
              width: "35vw",
              height: "80px",
              padding: "8px",
              color: "black",
              fontSize: "30px",
              borderBottom: 'none',
              border: "none",
              fontWeight: 500,
              background: "none",
            }}
            sx={{
              "& .MuiInput-underline:before": {
                borderBottom: "none", // Remove the underline when not focused
              },
              "& .MuiInput-underline:after": {
                borderBottom: "none", // Remove the underline when focused
              },
              "&:hover .MuiInput-underline:before": {
                borderBottom: "none", // Remove the underline on hover
              },
              "&:hover .MuiInput-underline:after": {
                borderBottom: "none", // Remove the underline on hover
              },
            }}
          />
        )}
      />
    </div>
  );
}

export default SearchBargpt;
