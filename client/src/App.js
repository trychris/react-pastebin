import React from 'react';
import {useSelector} from 'react-redux';
import { HashRouter, Route, Routes, Navigate} from "react-router-dom";
import Layout from './components/pages/layout/Layout';
import Login from './components/pages/login/Login';
import Error from './components/pages/error/Error';

export default function App() {
  var isAuthenticated = useSelector(state => state.isAuthenticated);   
  // const isAuthenticated = true;
  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  }

  const PublicRoute = ({ children }) => {
    return isAuthenticated ? <Navigate to="/app" /> : children;
  }
  
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Navigate to="/app" />} />
        <Route 
          path="/app/*" 
          element={
            <PrivateRoute>
              <Layout/>
            </PrivateRoute>
          }
        />
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login/>
            </PublicRoute>
          }
        />
        <Route component={Error} />
      </Routes>
    </HashRouter>
  );
}

