import { Stack, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import  { useState } from 'react';
import { useContext } from 'react';
import { FilterContext } from '../context/FilterContext';
import { addFilterToLocalStorage } from '../utils/localStorage';
const statusOptions = [
  { value: 'all', label: 'الكل' },
  { value: 'completed', label: 'منجزة' },
  { value: 'todo', label: 'غير منجزة' },
];

const priorityOptions = [
  { value: 'all', label: 'الكل' },
  { value: 'high', label: 'عالية' },
  { value: 'medium', label: 'متوسطة' },
  { value: 'low', label: 'منخفضة' },
];

const difficultyOptions = [
  { value: 'all', label: 'الكل' },
  { value: 'easy', label: 'سهلة' },
  { value: 'medium', label: 'متوسطة' },
  { value: 'hard', label: 'صعبة' },
];

function Filter() {
    const {filters,setFilters} = useContext(FilterContext);
  const handleChange = (event) => {

    const { name, value } = event.target;
    addFilterToLocalStorage({ ...filters, [name]: value });
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Stack direction={"row"} gap={"1rem"} spacing={2} marginTop={"2rem"}>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="statusId">الحالة</InputLabel>
        <Select
          labelId="statusId"
          id="statusId"
          name="status"
          value={filters.status}
          onChange={handleChange}
          label="الحالة"
        >
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="priorityId">الأولوية</InputLabel>
        <Select
          labelId="priorityId"
          id="priorityId"
          name="priority"
          value={filters.priority}
          onChange={handleChange}
          label="الأولوية"
        >
          {priorityOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="difficultyId">الصعوبة</InputLabel>
        <Select
          labelId="difficultyId"
          id="difficultyId"
          name="difficulty"
          value={filters.difficulty}
          onChange={handleChange}
          label="الصعوبة"
        >
          {difficultyOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}

export default Filter;
