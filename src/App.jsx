import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout.jsx';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import UserPosts from './components/UserPosts/UserPosts.jsx'; 
import NotFound from './components/notFound/NotFound.jsx'; 
import ProtectedRoutes from './components/protectedRoutes/protectedRoutes.jsx';
import ProtectedAuth from './components/protectedAuth/protectedAuth.jsx';
import PostDetails from './components/postDetails/postDetails.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { 
        path: 'login', 
        element: (
          <ProtectedAuth>
            <Login />
          </ProtectedAuth>
        )
      },
      { 
        path: 'register', 
        element: (
          <ProtectedAuth>
            <Register />
          </ProtectedAuth>
        )
      },
      {
  path: "userPosts/:userId",
  element: (
    <ProtectedRoutes>
      <UserPosts />
    </ProtectedRoutes>
  )
}
,
      {
  path: 'postDetails/:id',
  element: (
    <ProtectedRoutes>
      <PostDetails />
    </ProtectedRoutes>
  )
}
,
      { path: '*', element: <NotFound /> },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
