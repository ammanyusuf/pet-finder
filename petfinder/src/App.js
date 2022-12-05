import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';

import LoginPage from './pages/LoginPage';
import PrivateRoutes from './utils/PrivateRoute';
import Feed from './Feed'
import ViewPost from './ViewPost'
import PostComment from './PostComment';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
                <Route element={<Feed/>} path="/Home" exact/>
                <Route element={<ViewPost/>} path="/ViewPost"/>
                <Route element={<PostComment/>} path="/PostComment"/>
            </Route>
            <Route element={<LoginPage/>} path="/login"/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;