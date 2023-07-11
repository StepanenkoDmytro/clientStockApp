import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { CoinList } from './pages/markets/coinMarket/CoinList.tsx';
import { CoinDetails } from './pages/markets/coinMarket/CoinDetails.tsx';
import { AccountPage } from './pages/account/AccountPage.tsx';
import { SignIn } from './pages/auth/SignIn.tsx';
import { SignUp } from './pages/auth/SignUp.tsx';
import { PortfolioComponent } from './pages/account/porfolio/PortfolioComponent.tsx';
import { StockList } from './pages/markets/stockMarket/StockList.tsx';
import { CryptoComponent } from './pages/account/crypto/CryptoComponent.tsx';
import { StockComponent } from './pages/account/stock/StockComponent.tsx';
import { TransactComponent } from './pages/account/transact/TransactComponent.tsx';
import { UserContainer } from './pages/account/user/UserContainer.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />
      },
      {
        path: "sign-up",
        element: <SignUp />
      },
      {
        path: "page",
        element: <AccountPage />,
        children: [
          {
            path: "coin-market",
            element: <CoinList />
          },
          {
            path: "coin-market/:coinId",
            element: <CoinDetails />
          },
          {
            path: "stock-market",
            element: <StockList />
          },
          {
            path: "porfolio",
            element: <PortfolioComponent />
          },
          {
            path: "crypto",
            element: <CryptoComponent />
          },
          {
            path: "stock",
            element: <StockComponent />
          },
          // {
          //   path: "transfer",
          //   element: <></>
          // },
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
