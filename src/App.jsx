import './App.css';
import Header from './components/header';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import PageNotFound from './views/PageNotFound';

const App = () => {
  return (
    <>
      <Header />
      <Login />
      <Dashboard />
      <PageNotFound />
    </>
  );
}

export default App;
