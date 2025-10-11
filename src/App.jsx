import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Sidebar from "./components/Layout/Sidebar";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    fetch("http://localhost:8000/auth/verify", {
      credentials: "include", // important so cookies are sent
    }) // when this promise is settled, loading should become false
      .then(res => res.json()) 
      .then(data => {
        if (data.authenticated){
          setIsAuthenticated(true); 
          // setLoading(false);
        } 
      })
      .catch((err) => {
        setIsAuthenticated(false);
        // setLoading(false);
      })
      
  }, []);

  // if(loading){
  //   return <div>Loading...</div>
  // }

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
        {isAuthenticated && <Sidebar />}

        <main className={`main-content ${isAuthenticated ? 'authenticated' : 'non-authenticated'}`}>
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Login setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />

            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Catch-all route */}
            <Route
              path="*"
              element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
