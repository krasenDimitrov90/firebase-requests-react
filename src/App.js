import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthContextProvider } from './context/auth-context';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import './App.css';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <nav>
          <Link to={'/'} >Home</Link>
          <Link to={'/login'} >Login</Link>
          <Link to={'/register'} >Register</Link>
        </nav>
        <Routes>
          <Route path='/' exatct element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
