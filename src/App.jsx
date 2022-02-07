import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import './styles/app.scss';

const App = () => {
  return (
    <div className='app'>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
