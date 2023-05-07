// External imports
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
// Local imports
import { TimeInput } from './TimeInput';
import { DishTypeSelect } from './SelectDishType';
import { PreparationTimeInput } from './PreparationTimeInput';

type Inputs = {
  dish_name: string;
  preparation_time: string;
  dish_type: 'pizza' | 'soup' | 'sandwich';
};

export const DishForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
    >
      {/* register your input into the hook by invoking the "register" function */}
      <Controller
        name='dish_name'
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange } }) => (
          <TextField onChange={onChange} label='dish name' />
        )}
      />

      {/* include validation with required or other standard HTML validation rules */}

      <Controller
        name='preparation_time'
        control={control}
        rules={{
          required: true,
          pattern: /^(((([0-1][0-9])|(2[0-3])):?[0-5][0-9]:?[0-5][0-9]+$))/,
        }}
        render={({ field: { onChange } }) => (
          <TimeInput
            onChange={onChange}
            mask='x'
            customInput={PreparationTimeInput}
          />
        )}
      />

      <Controller
        name='dish_type'
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange } }) => (
          <DishTypeSelect onChange={onChange} />
        )}
      />

      {/* errors will return when field validation fails  */}
      {errors.dish_name && <span>This field is required</span>}
      {errors.preparation_time && (
        <span>{`${console.log(errors.preparation_time)}`}</span>
      )}
      {errors.dish_type && <span>This field is required</span>}

      <Button type='submit' variant='contained'>
        Submit
      </Button>
    </form>
  );
};
