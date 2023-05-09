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

const router = createBrowserRouter([
  {
    path: "/",
    
    element: <App />,
    children: [
      {
        path: "coins",
        element: <CoinList/>
      },
      {
        path: "coins/:coinId",
        element: <CoinDetails/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <RouterProvider router={router}/> 
  </React.StrictMode>,
)
