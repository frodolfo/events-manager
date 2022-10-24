import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  color: '#fff',
  textAlign: 'left',
  '&.Mui-focused': {
    color: '#fff',
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  color: '#fff',
  borderColor: '#fff',
  '&.MultiFormLabel-root': {
    color: '#fff',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#fff',
  },
  '&:before': {
    borderColor: '#fff',
  },
  '&:after': {
    borderColor: '#fff',
  },
}));

export default function FilterSelect({
  selectLabel,
  values,
  selectChangeHandler,
  defaultTheme,
}) {
  const [selectValue, setSelectValue] = useState('');

  const handleChange = (event) => {
    const newVal = event?.target?.value;
    setSelectValue(newVal);
    selectChangeHandler(newVal);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 150 }} size="medium">
        {defaultTheme ? (
          <>
            <InputLabel id="filter-select">{selectLabel}</InputLabel>
            <Select
              labelId="filter-select"
              id="filterSelect"
              value={selectValue}
              label={selectLabel}
              onChange={handleChange}
            >
              <MenuItem key={0} value={0}>
                All
              </MenuItem>
              {Array.isArray(values) &&
                values.map((value, valueIndex) => (
                  <MenuItem key={valueIndex} value={value.id}>
                    {value.name}
                  </MenuItem>
                ))}
            </Select>
          </>
        ) : (
          <>
            <StyledInputLabel id="filter-select">
              {selectLabel}
            </StyledInputLabel>
            <StyledSelect
              labelId="filter-select"
              id="filterSelect"
              value={selectValue}
              label={selectLabel}
              onChange={handleChange}
            >
              <MenuItem key={0} value={0}>
                All
              </MenuItem>
              {Array.isArray(values) &&
                values.map((value, valueIndex) => (
                  <MenuItem key={valueIndex} value={value.id}>
                    {value.name}
                  </MenuItem>
                ))}
            </StyledSelect>
          </>
        )}
      </FormControl>
    </Box>
  );
}
