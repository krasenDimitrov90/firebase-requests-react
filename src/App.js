import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/auth-context';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import './App.css';
import Layout from './components/Layout';

function App() {
  console.log('In App');
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
