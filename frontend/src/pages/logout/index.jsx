import React from 'react';

const Logout =()=> {


  const logout = () => {
    // Perform logout logic here
    localStorage.clear();
    alert('Logged out successfully!');
    window.location.href='/';
    // Redirect to the login page
  };

  return (
    <html>

    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Log out</title>
      <link rel="stylesheet" href="styles.css" />
    </head>

    <body>
      <div className="logout">
        <h2>Logout</h2>
        <p>Are you sure you want to logout?</p>
        <button onClick={logout}>Logout</button>
      </div>
    </body>
    </html>
  );
}

export default Logout;
