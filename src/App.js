import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import Login from './components/Login'
import TodoList from './components/TodoList'
import Register from './components/Register'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import { AuthContext } from './utils/context'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const location = useLocation()
 // close alert when route change
 useEffect(() => {
  Swal.close()
}, [location]);

  return (
    <div className="container">
      <AuthContext.Provider value={{token, setToken}}>
        <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<TodoList />} />
        </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </AuthContext.Provider>
    </div>
  );


}

export default App;
