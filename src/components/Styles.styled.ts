import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

import defaultBG from '../images/default-bg.jpg';
import pizzaBG from '../images/pizza-bg.jpg';
import soupBG from '../images/soup-bg.jpg';
import sandwichBG from '../images/sandwich-bg.jpg';

export const AppContainer = styled('div', {
  shouldForwardProp: (_dishtype: string) => true,
})<{ dishtype?: string }>(
  ({ dishtype }) => `
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${
    dishtype === 'pizza'
      ? pizzaBG
      : dishtype === 'soup'
      ? soupBG
      : dishtype === 'sandwich'
      ? sandwichBG
      : defaultBG
  });
  background-position: center;
  background-size:cover;
`
);

export const FormContainer = styled(Paper)({
  padding: '30px 20px',
  borderRadius: 20,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '300px',

  h2: {
    marginBottom: 50,
  },

  '.validation-error': {
    color: 'red',
  },

  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
});
