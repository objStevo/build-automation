import { Route, Routes } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HelloWorld />} />
    </Routes>
  );
};

export default AppRouter;
