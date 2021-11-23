import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, {useCallback} from 'react'; 
import LoginForm from '../components/LoginForm';

function Login({setLoggedIn, setUserInfo}) {

    const loginUser = useCallback((e)=> {
        e.preventDefault(); 

        const email = e.currentTarget.email.value; 
        const password = e.currentTarget.password.value; 

        const auth = getAuth(); 

        //we call this when we want users to submit their forms
        signInWithEmailAndPassword(auth, email, password) 
        .then((userCredential) => {
            const user = userCredential.user; 
            setLoggedIn(true); 
            setUserInfo({
                email: user.email, 
                displayName: user.displayName, 
                uid: user.uid, 
                accessToken: user.accessToken, 
            }); 
        })
        .catch((error) => {
            const errorCode = error.code; 
            const errorMessage = error.message; 
            console.warn(errorCode, errorMessage); 
        }); 
    }, []); 

    return (
        <div className="PageWrapper">
            <h2>Login</h2>
            <LoginForm loginUser={loginUser}/>
        </div> 
    );
}

export default Login; 

