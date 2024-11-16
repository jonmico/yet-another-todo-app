import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IndexPage from './pages';
import RegisterPage from './pages/register-page';
import AuthProvider from './contexts/auth/auth-provider';

export default function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<IndexPage />}>
              <Route path='register' element={<RegisterPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}
