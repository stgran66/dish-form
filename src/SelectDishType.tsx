import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';

interface DishTypeSelectProps {
  onChange: (...event: any[]) => void;
}

export const DishTypeSelect: React.FC<DishTypeSelectProps> = ({ onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id='dish-type-select-label'>dish type</InputLabel>
      <Select
        labelId='dish-type-select-label'
        id='dish-type-select'
        defaultValue={''}
        label='dish type'
        onChange={onChange}
      >
        <MenuItem value={'pizza'}>Pizza</MenuItem>
        <MenuItem value={'soup'}>Soup</MenuItem>
        <MenuItem value={'sandwich'}>Sandwich</MenuItem>
      </Select>
    </FormControl>
  );
};
