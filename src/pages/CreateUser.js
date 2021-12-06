import React, {useCallback} from 'react'; 
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"; 
import CreateUserForm from '../components/CreateUserForm'; 

function CreateUser( {setLoggedIn, setUserInfo}) {

    const signUpUser = useCallback((e)=> {
        e.preventDefault(); 

        const email = e.currentTarget.email.value; 
        const password = e.currentTarget.password.value; 

        const auth = getAuth(); 

        //we call this when we want users to submit their forms
        createUserWithEmailAndPassword(auth, email, password) 
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
    }, [setLoggedIn, setUserInfo]); 
    
    return (
        <div className="PageWrapper">
            <h2> Create User </h2>
            <CreateUserForm className="Form" signUpUser={signUpUser}/>
        </div> 
    );
}

export default CreateUser; 

