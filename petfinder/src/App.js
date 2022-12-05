import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AddPost from './AddPosts';
import AddPet from './AddPet';
import PetFeed from './PetFeed';

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
            <Route element={<AddPost/>} path="/createPosts"/>
            <Route element={<AddPet/>} path="/AddPet"/>
            <Route element={<PetFeed/>} path="/PetFeed"/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;