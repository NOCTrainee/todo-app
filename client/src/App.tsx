import Register from './pages/Register'
import Login from './pages/Login';
import Todo from './pages/Todo';
import Navbar from './pages/Navbar';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return(
    // <Register/>
    <BrowserRouter>
      <title>Task Tracker</title>
      <Navbar/>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Login />} />
        <Route path='/todo' element={<Todo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
