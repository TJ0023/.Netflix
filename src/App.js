import { Routes, Route} from 'react-router-dom';
import Navbar from "./components/Navbar";
import { AuthContextProvider } from './context/AuthContext';
import Account from './pages/Account';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedRoute2 from './components/ProtectedRoute2';

function App() {
  return (
    <>
      <AuthContextProvider>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={
              <ProtectedRoute2> 
          <Login />
          </ProtectedRoute2>} />
          <Route path='/signup' element={
              <ProtectedRoute2> 
          <SignUp />
          </ProtectedRoute2>} />
       
          <Route path='/account' element={   
          <ProtectedRoute> 
            <Account />          
          </ProtectedRoute>} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
