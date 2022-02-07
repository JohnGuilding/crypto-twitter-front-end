import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom';

import App from './App';
import Dashboard from './views/Dashboard';
import PageNotFound from './views/PageNotFound';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>, 
  document.getElementById("root")
);
