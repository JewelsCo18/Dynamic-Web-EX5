import React from 'react'; 

function Header({logout, loggedIn}) {
    return <header className="Header">
        <h2> Exercise Five </h2>
        <div className="Logo"></div>
        <nav >
            {!loggedIn && (
                <>
                <a href="/">Login</a>
                <a href="/create">Create User</a>
                </>
            )}
            {loggedIn && (
                <>
                <a href="/user/id">User Profile</a>
                <a onClick={() => logout()}> Log Out </a>
                </>
            )}
        </nav>
    </header>; 
}

export default Header; 

