import React from 'react'; 

function UserProfile({userInfo}) {
    return (
        <div className="PageWrapper">
            <h1> User Profile</h1>

            <p> Email: {userInfo.email} </p>
            <p> Name: {userInfo.displayName}</p>
            <p> UID: {userInfo.uid} </p>
        </div>
    ); 
}

export default UserProfile; 

