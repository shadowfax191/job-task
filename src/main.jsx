import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Components/Root/Root';
import Home from './Components/Home/Home';
import LogIn from './Components/LogIn';
import Register from './Components/Register';
import AuthProvider from './Components/AuthProvider/AuthProvider';
import Dashboard from './Components/Dashboard/Dashboard';
import Task from './Components/Dashboard/Task-list';

import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Components/Dashboard/Profile';
import DashboardHome from './Components/Dashboard/DashboardHome';
import About from './Components/Home/About';
import Contact from './Components/Home/Contact';

// Create a client
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'login',
        element: <LogIn></LogIn>
      },
      {
        path: 'signIn',
        element: <Register></Register>
      },
      {
        path: 'about',
        element: <About></About>
      },
      {
        path: 'contact',
        element: <Contact></Contact>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: 'task',
        element: <Task></Task>
      },
      {
        path: '/dashboard',
        element: <DashboardHome></DashboardHome>
      },
      {
        path: 'profile',
        element: <Profile></Profile>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>

    </AuthProvider>
  </React.StrictMode>
)
