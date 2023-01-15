import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/auth-context';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddBook from './pages/AddBook';
import Books from './pages/Books';

import './App.css';
import Layout from './components/Layout';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/add-book' element={<AddBook />} />
            <Route path='/books' element={<Books />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
