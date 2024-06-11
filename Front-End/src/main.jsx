import React from 'react'
import ReactDOM from 'react-dom/client'
 import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import Routes from './Routes/Routes.jsx';
import AuthProvider from './Components/Provider/AuthProvider.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <React.StrictMode>
    <RouterProvider router={Routes} />
  </React.StrictMode>
  </AuthProvider>
)
