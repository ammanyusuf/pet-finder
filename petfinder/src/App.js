import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';

import LoginPage from './pages/LoginPage';
import PrivateRoutes from './utils/PrivateRoute';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
                <Route element={<HomePage/>} path="/Home" exact/>
                
            </Route>
            <Route element={<LoginPage/>} path="/login"/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;