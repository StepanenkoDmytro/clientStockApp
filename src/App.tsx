
import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import { Footer } from './components/Footer.tsx'
import { Header } from './components/Header.tsx'
import { useStore } from 'effector-react';
import { saveToken, saveUser, userStore } from './store/store';
import { IUser, IUserDto } from './pages/Coin/interfaces.ts';
import { useEffect } from 'react';

export const USER_AUTH_TOKEN = 'user_auth_token';

function App() {
  const user: IUser | null = useStore(userStore);

  const token = localStorage.getItem(USER_AUTH_TOKEN);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      if (!token) {
        return navigate('/sign-in');
      }
      fetch(`http://localhost:8000/api/v1/auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: token,
      })
        .then((response) => response.json())
        .then((response: IUserDto) => {
          const { token, user } = response;
          saveToken(token);
          saveUser(user);
        })
        .catch((error: Error) => {
          console.error(error);
          navigate('sign-in');
        });
    }
    if (location.pathname === "/") {
      return navigate('/coins');
    }
  }, [])

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
