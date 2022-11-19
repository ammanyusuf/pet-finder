// import logo from './logo.svg';
import './App.css';
// import Navbar from './Navbar';
// import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import PrivateRoutes from './utils/PrivateRoute';
import HomePage from './pages/HomePage'
import { PostCard } from './PostCard';
import LoginPage from './pages/LoginPage'



function App() {
  return (

    <div className="App">
   
     
 
      <Router>     {/* switch react dom 5*/}
          <Routes>
            <Route element={<PrivateRoutes />}>
                <Route element={<HomePage/>} path="/home" exact/>
          
            </Route>
            <Route element={<LoginPage/>} path="/login"/>
    
          </Routes>  {/* switch react dom 5 */}
      </Router>

    </div>
  );
}

export default App;
