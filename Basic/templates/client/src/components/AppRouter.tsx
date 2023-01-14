import { Route, Routes } from 'react-router-dom';
import { HelloWorld } from './Template/HelloWorld';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HelloWorld />} />
    </Routes>
  );
};

export default AppRouter;
