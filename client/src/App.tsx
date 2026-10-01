import Register from './pages/Register'
import Login from './pages/Login';
import Todo from './pages/Todo';
import Navbar from './pages/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          'http://localhost:5000/user/getCurrentUser'
        );

        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    setUser(null);
  };
  const handleLoginSuccess = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/user/getCurrentUser'
      );
      setUser(res.data);
    } catch (err) {
      console.error("Failed to get current user:", err);
      setUser(null);
    }

  };

  return (
    <BrowserRouter>
      <title>Task Tracker</title>
      <Navbar
        user={user}
        onLogout={handleLogout}
      />

      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path='/todo' element={<Todo user={user} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
