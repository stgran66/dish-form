import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';

interface DishTypeSelectProps {
  onChange: (...event: any[]) => void;
  value: '' | 'pizza' | 'soup' | 'sandwich';
}

export const DishTypeSelect: React.FC<DishTypeSelectProps> = ({
  onChange,
  value,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id='dish-type-select-label'>dish type</InputLabel>
      <Select
        labelId='dish-type-select-label'
        id='dish-type-select'
        label='dish type'
        onChange={onChange}
        value={value}
        defaultValue=''
      >
        <MenuItem value={'pizza'}>Pizza</MenuItem>
        <MenuItem value={'soup'}>Soup</MenuItem>
        <MenuItem value={'sandwich'}>Sandwich</MenuItem>
      </Select>
    </FormControl>
  );
};
