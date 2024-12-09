import { BrowserRouter, Route, Routes } from 'react-router';
import IndexPage from './pages';
import RegisterPage from './pages/register-page';
import AuthProvider from './contexts/auth/auth-provider';
import LoginPage from './pages/login-page';

export default function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<IndexPage />} />
            <Route path='register' element={<RegisterPage />} />
            <Route path='login' element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}
