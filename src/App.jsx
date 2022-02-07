import { Link, Outlet } from 'react-router-dom';

import Header from './components/Header';
import Dashboard from './views/Dashboard';
import PageNotFound from './views/PageNotFound';

const App = () => {
  return (
    <>
      <Header />
      <Link to="/dashboard">Dashboard</Link>
      <Outlet />
    </>
  );
}

export default App;
