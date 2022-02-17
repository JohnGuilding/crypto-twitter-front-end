import React, { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Dashboard from './views/Dashboard';
import Profile from './views/Profile';
import PageNotFound from './views/PageNotFound';
import './styles/app.scss';

const App = () => {
  const [ locked, setLocked ] = useState("pending");

  useEffect(() => {
    if (window) {
      window.addEventListener("unlockProtocol", unlockHandler);
    }

    return () => {
      window.removeEventListener("unlockProtocol", unlockHandler)
    }
  });

  const checkout = () => {
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal()
  }

  const unlockHandler = (e) => {
    setLocked(e.detail);
  }

  return (
    <div className="app">
          {locked === "locked" && (
            <div onClick={checkout} className="locked" style={{ cursor: "pointer" }}>
              Unlock me!{" "}
              <span aria-label="locked" role="img">
                🔒
              </span>
            </div>
          )}
          {locked === "unlocked" && (
              <BrowserRouter>
                <Header />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </BrowserRouter >
          )}
      </div>
  );
}

export default App;
