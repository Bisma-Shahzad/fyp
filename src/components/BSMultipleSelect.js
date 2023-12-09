import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BSMultipleSelect(props) {
  const { minWidth, label, searchList, fullWidth, selectedVals } = props;

  const [selected, setSelected] = React.useState([]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSelected((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((item) => item !== value);
      } else {
        return [...prevSelected, value];
      }
    });
    selectedVals((prevSelected) => {
        if (prevSelected.includes(value)) {
          return prevSelected.filter((item) => item !== value);
        } else {
          return [...prevSelected, value];
        }
      });
  };
  console.log('selected', selected)

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: minWidth }} fullWidth={fullWidth}>
        <InputLabel id="demo-multiple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-select-label"
          id="demo-multiple-select"
          multiple
          value={selected}
          onChange={handleChange}
          label={label}
        >
          {searchList.map((x, i) => (
            <MenuItem key={x.key} value={x.displayName}>
              {x.displayName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
