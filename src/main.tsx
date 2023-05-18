import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { CoinList } from './pages/Coin/CoinList.tsx';
import { CoinDetails } from './pages/Coin/CoinDetails.tsx';
import { UserPage } from './pages/account/UserPage.tsx';
import { SignIn } from './pages/auth/SignIn.tsx';
import { SignUp } from './pages/auth/SignUp.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "coins",
        element: <CoinList />
      },
      {
        path: "coins/:coinId",
        element: <CoinDetails />
      },
      {
        path: "sign-in",
        element: <SignIn />
      },
      {
        path: "sign-up",
        element: <SignUp />
      },
      {
        path: "user",
        element: <UserPage />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
