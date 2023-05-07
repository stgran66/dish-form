import { DishForm } from './DishForm';
export const App = () => {
  return (
    <div
      className='App'
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <DishForm />
    </div>
  );
};
