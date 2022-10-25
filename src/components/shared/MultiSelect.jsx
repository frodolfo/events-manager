import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({ label, values, selectChangeHandler }) {
  const theme = useTheme();
  const [ownerIds, setOwnerIds] = useState([]);

  const handleChange = (event) => {
    const value = event?.target.value;
    setOwnerIds(
      // On autofill we get a stringified value.
      [...(typeof value === 'string' ? value.split(',') : value)]
    );

    selectChangeHandler([
      ...(typeof value === 'string' ? value.split(',') : value),
    ]);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="multiple-name-label">{label}</InputLabel>
        <Select
          labelId="multiple-name-label"
          id="multipleName"
          multiple
          value={ownerIds}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {values.map((value) => (
            <MenuItem
              key={value.id}
              value={value.id}
              style={getStyles(value.name, ownerIds, theme)}
            >
              {value.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
