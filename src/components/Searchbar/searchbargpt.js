import { useState } from "react";
import './searchbargpt.css'

function SearchBargpt(props) {
  const { label, onSearch } = props;
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        placeholder={label ?? "Search..."}
        className="searchbar"
        style={{ height: '45px', borderRadius: 10, padding: 10 }}
      />
    </div>
  );
}

export default SearchBargpt;
