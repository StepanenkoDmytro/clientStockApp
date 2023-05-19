import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { CoinList } from './pages/Coin/CoinList.tsx';
import { CoinDetails } from './pages/Coin/CoinDetails.tsx';
import { AccountPage } from './pages/account/AccountPage.tsx';
import { SignIn } from './pages/auth/SignIn.tsx';
import { SignUp } from './pages/auth/SignUp.tsx';
import { UserContainer } from './pages/account/UserContainer.tsx';
import { TransactComponent } from './pages/account/TransactComponent.tsx';
import { CryptoComponent } from './pages/account/CryptoComponent.tsx';

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
        path: "account",
        element: <AccountPage />,
        children: [
          {
            path: "porfolio",
            element: <></>
          },
          {
            path: "crypto",
            element: <CryptoComponent />
          },
          {
            path: "stock",
            element: <></>
          },
          {
            path: "transfer",
            element: <></>
          },
          {
            path: "transactions",
            element: <TransactComponent />
          },
          {
            path: "user",
            element: <UserContainer />
          }
        ]
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
