import {Routes, Route, BrowserRouter as Router} from 'react-router-dom'; 
import CreateUser from "./pages/CreateUser"; 
import Login from "./pages/Login"; 
import UserProfile from "./pages/UserProfile"; 
import Header from "./components/Header"; 
import './App.css';


function App() {
  return (
    // React Fragment (<>)
    <>
      <Header />
      <Router>
        <Routes>
          <Route path ="/user/:id" element={<UserProfile />} /> 
          <Route path ="/create" element={<CreateUser />} /> 
          <Route path ="/" element={<Login />} /> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
