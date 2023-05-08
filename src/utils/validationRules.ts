export const validationRules = {
  name: { required: 'dish name is required' },
  preparation_time: {
    required: 'preparation time is required',
    pattern: {
      value: /^(((([0-1][0-9])|(2[0-3])):?[0-5][0-9]:?[0-5][0-9]+$))/,
      message: 'preparation time should be in hh:mm:ss format',
    },
  },
  type: { required: 'dish type is required' },
  no_of_slices: {
    required: 'no of slices is required',
    max: { value: 30, message: 'maximum value is 30' },
    min: { value: 1, message: 'minimum value is 1 ' },
  },
  diameter: {
    required: 'diameter is required',
    max: { value: 100, message: 'maximum value is 100' },
    min: { value: 1, message: 'minimum value is 1 ' },
  },
  spiciness_scale: {
    required: 'spiciness scale is required',
    max: { value: 10, message: 'maximum value is 10' },
    min: { value: 1, message: 'minimum value is 1 ' },
  },
  slices_of_bread: {
    required: 'slices of bread is required',
    max: { value: 20, message: 'maximum value is 20' },
    min: { value: 1, message: 'minimum value is 1 ' },
  },
};
