import React, {useCallback} from 'react'; 
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"; 
import CreateUserForm from '../components/CreateUserForm'; 

function CreateUser( {setLoggedIn, setUserInfo, setErrors}) {

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
            setErrors(); 
        })
        .catch((error) => {
            const errorCode = error.code; 
            const errorMessage = error.message; 
            console.warn(error, errorCode, errorMessage); 
            setErrors(errorMessage); 
        }); 
    }, [setLoggedIn, setUserInfo, setErrors]); 
    
    return (
        <div className="PageWrapper">
            <h2> Create User </h2>
            <CreateUserForm className="Form" signUpUser={signUpUser}/>
        </div> 
    );
}

export default CreateUser; 

