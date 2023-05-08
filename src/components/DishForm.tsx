import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { TextField, Button, Slider, InputLabel } from '@mui/material';
import axios from 'axios';

import { TimeInput } from './TimeInput';
import { DishTypeSelect } from './SelectDishType';
import { PreparationTimeInput } from './PreparationTimeInput';
import { validationRules } from '../utils/validationRules';
import { FormContainer } from './Styles.styled';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Types and interfaces
type Inputs = {
  name: string;
  preparation_time: string;
  type: 'pizza' | 'soup' | 'sandwich' | '';
  no_of_slices: number;
  diameter: number;
  spiciness_scale: number;
  slices_of_bread: number;
};

interface DishFormProps {
  onDishTypeSelect: React.Dispatch<React.SetStateAction<string>>;
}

interface ResponseErrors {
  name: string[];
  preparation_time: string[];
  type: string[];
  no_of_slices: string[];
  diameter: string[];
  spiciness_scale: string[];
  slices_of_bread: string[];
}

// setting up axios base url from env
axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL ||
  ' https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/';

export const DishForm: React.FC<DishFormProps> = ({ onDishTypeSelect }) => {
  // State for handling errors from backend
  const [errorMessage, setErrorMessage] = useState<null | ResponseErrors>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      type: '',
      preparation_time: '',
      name: '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setErrorMessage(null);
      await axios.post('/', data);
      reset();
      Notify.success(`We successfully received your form `);
    } catch (error) {
      Notify.failure(`Oops... Something went wrong `);
      let message;
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data;
      } else {
        message = String(error);
      }
      setErrorMessage(message);
    }
  };
  return (
    <FormContainer elevation={24}>
      <h2>Compose your dish</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Dish name input controller */}
        <Controller
          name='name'
          control={control}
          rules={validationRules.name}
          render={({ field: { onChange, value } }) => (
            <TextField onChange={onChange} label='dish name' value={value} />
          )}
        />
        {/* Form validation errors */}
        {errors.name && (
          <span className='validation-error'>{errors.name.message}</span>
        )}
        {/* Backend errors */}
        {errorMessage?.name && (
          <span className='validation-error'>{errorMessage.name}</span>
        )}

        {/* Preparation time input controller */}
        <Controller
          name='preparation_time'
          control={control}
          rules={validationRules.preparation_time}
          render={({ field: { onChange, value } }) => (
            <TimeInput
              onChange={onChange}
              mask='x'
              customInput={PreparationTimeInput}
              value={value}
            />
          )}
        />
        {/* Form validation errors */}
        {errors.preparation_time && (
          <span className='validation-error'>
            {errors.preparation_time.message}
          </span>
        )}
        {/* Backend errors */}
        {errorMessage?.preparation_time && (
          <span className='validation-error'>
            {errorMessage.preparation_time}
          </span>
        )}

        {/* Dish type input controller */}
        <Controller
          name='type'
          control={control}
          rules={validationRules.type}
          render={({ field: { onChange, value, ref, onBlur, name } }) => (
            <DishTypeSelect
              value={value}
              onChange={(event) => {
                onChange(event.target.value);
                onDishTypeSelect(event.target.value);
              }}
            />
          )}
        />
        {/* Form validation errors */}
        {errors.type && (
          <span className='validation-error'>{errors.type.message}</span>
        )}
        {/* Backend errors */}
        {errorMessage?.type && (
          <span className='validation-error'>{errorMessage.type}</span>
        )}

        {/* Conditional inputs */}

        {/* Pizza - number of slices input controller */}
        {watch('type') === 'pizza' && (
          <>
            <Controller
              name='no_of_slices'
              control={control}
              rules={validationRules.no_of_slices}
              shouldUnregister={true}
              render={({ field: { onChange } }) => (
                <TextField
                  onChange={(event) => onChange(+event.target.value)}
                  label='no of slices'
                  type='number'
                  InputProps={{ inputProps: { min: 0, max: 30 } }}
                />
              )}
            />
            {/* Form validation errors */}
            {errors.no_of_slices && (
              <span className='validation-error'>
                {errors.no_of_slices.message}
              </span>
            )}
            {/* Backend Errors */}
            {errorMessage?.no_of_slices && (
              <span className='validation-error'>
                {errorMessage.no_of_slices}
              </span>
            )}
            {/* Pizza - diameter input controller */}
            <Controller
              name='diameter'
              control={control}
              rules={validationRules.diameter}
              shouldUnregister={true}
              render={({ field: { onChange } }) => (
                <TextField
                  onChange={(event) =>
                    onChange((+event.target.value).toFixed(1))
                  }
                  label='diameter'
                  type='number'
                  InputProps={{ inputProps: { min: 1, max: 100, step: 0.1 } }}
                />
              )}
            />
            {/* Form validation errors */}
            {errors.diameter && (
              <span className='validation-error'>
                {errors.diameter.message}
              </span>
            )}
            {/* Backend errors */}
            {errorMessage?.diameter && (
              <span className='validation-error'>{errorMessage.diameter}</span>
            )}
          </>
        )}

        {/* Soup - spiciness scale input controller */}
        {watch('type') === 'soup' && (
          <Controller
            name='spiciness_scale'
            control={control}
            rules={validationRules.spiciness_scale}
            shouldUnregister={true}
            render={({ field: { onChange } }) => (
              <>
                <InputLabel>Select spiciness</InputLabel>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  marks
                  valueLabelDisplay='auto'
                  onChange={onChange}
                />
                {/* Form validation errors */}
                {errors.spiciness_scale && (
                  <span className='validation-error'>
                    {errors.spiciness_scale.message}
                  </span>
                )}
                {/* Backend errors */}
                {errorMessage?.spiciness_scale && (
                  <span className='validation-error'>
                    {errorMessage.spiciness_scale}
                  </span>
                )}
              </>
            )}
          />
        )}

        {/* Sandwich - slices of bread input controller */}
        {watch('type') === 'sandwich' && (
          <>
            <Controller
              name='slices_of_bread'
              control={control}
              rules={validationRules.slices_of_bread}
              shouldUnregister={true}
              render={({ field: { onChange } }) => (
                <TextField
                  onChange={(event) => onChange(+event.target.value)}
                  label='slices of bread'
                  type='number'
                  InputProps={{ inputProps: { min: 1, max: 20 } }}
                />
              )}
            />
            {/* Form validation errors */}
            {errors.slices_of_bread && (
              <span className='validation-error'>
                {errors.slices_of_bread.message}
              </span>
            )}
            {/* Backend errors */}
            {errorMessage?.slices_of_bread && (
              <span className='validation-error'>
                {errorMessage.slices_of_bread}
              </span>
            )}
          </>
        )}

        {/* Form control buttons */}
        <Button type='submit' variant='contained'>
          Submit
        </Button>
        <Button
          type='reset'
          onClick={() => {
            reset();
            onDishTypeSelect('');
            setErrorMessage(null);
          }}
        >
          Reset
        </Button>
      </form>
    </FormContainer>
  );
};
