import { useState } from 'react';

import { DishForm } from './DishForm';
import { AppContainer } from './Styles.styled';

export const App = () => {
  // state for background update depending on select dish type
  const [dishtype, setDishtype] = useState('');

  return (
    <AppContainer dishtype={dishtype}>
      <DishForm onDishTypeSelect={setDishtype} />
    </AppContainer>
  );
};
