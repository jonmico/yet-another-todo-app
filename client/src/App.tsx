import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IndexPage from './pages';
import RegisterPage from './pages/register-page';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<IndexPage />}>
            <Route path='register' element={<RegisterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
