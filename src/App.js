import {Navigate, Routes, Route, BrowserRouter as Router} from 'react-router-dom'; 
import {useEffect, useState} from 'react'; 
import CreateUser from "./pages/CreateUser"; 
import Login from "./pages/Login"; 
import UserProfile from "./pages/UserProfile"; 
import Header from "./components/Header"; 
import {initializeApp } from "firebase/app"; 
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth"; 
import FirebaseConfig from "./components/FirebaseConfig"; 

import './App.css';

function App() {

  const [loggedIn, setLoggedIn] = useState(false); 
  const [loading, setLoading] = useState(true); 
  const [userInfo, setUserInfo] = useState({}); 
  const [appInitialized, setAppInitialized] = useState(false); 

  useEffect(() => {
    initializeApp(FirebaseConfig); 
    setAppInitialized(true); 
  }, []); 


  useEffect(() => {
   const auth = getAuth();  
    if(appInitialized) {
      onAuthStateChanged(auth, (user) => {
        if (user) { //logged in
          setUserInfo(user); 
          setLoggedIn(true); 
        } else{ //not logged in
          setUserInfo({}); 
          setLoggedIn(false); 
        }
        setLoading(false); 
      }); 
    }
  }, [appInitialized]); 

  function logout() {
    const auth = getAuth(); 
    signOut(auth).then(() => {
      setUserInfo({}); 
      setLoggedIn(false); 
    }).catch((error) => {
      console.warn(error); 
    });
  }

  if (loading || !appInitialized) return null; 
  return (
    // React Fragment (<>)
    <>
      <Header logout={logout} loggedIn={loggedIn}/>
      <Router>
        <Routes>
          <Route path ="/user/:id" element={loggedIn ? <UserProfile userInfo={userInfo}/> : <Navigate to="/" />} /> 
          <Route path ="/create" element={!loggedIn ? (<CreateUser setLoggedIn={setLoggedIn} setUserInfo={setUserInfo}/>) : (<Navigate to={`/user/${userInfo.uid}`} /> ) } />
          <Route path ="/" element={!loggedIn ? (<Login setLoggedIn={setLoggedIn} setUserInfo={setUserInfo}/>) : (<Navigate to={`/user/${userInfo.uid}`} /> )} /> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
