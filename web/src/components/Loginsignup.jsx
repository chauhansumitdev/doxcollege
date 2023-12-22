import { useState } from 'react';

const Loginsignup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here (e.g., API call, authentication)
    console.log('Login - Username:', username);
    console.log('Login - Password:', password);
    // Reset the form after submission if needed
    setUsername('');
    setPassword('');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
    console.log('Register - Username:', username);
    console.log('Register - Password:', password);
    // Reset the form after submission if needed
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            className='searchinput'
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className='searchinput'
            required
          />
        </div>
        <br />
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      <br />
      <br />
      <h3>Signup</h3>
      <form onSubmit={handleRegisterSubmit}>
        <div>
          <label htmlFor="register-username">Username:</label>
          <input
            type="text"
            id="register-username"
            name="register-username"
            value={username}
            onChange={handleUsernameChange}
            className='searchinput'
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="register-username">Email:</label>
          <input
            type="email"
            id="register-username"
            name="register-username"
            value={username}
            onChange={handleUsernameChange}
            className='searchinput'
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="register-password">Password:</label>
          <input
            type="password"
            id="register-password"
            name="register-password"
            value={password}
            onChange={handlePasswordChange}
            className='searchinput'
            required
          />
        </div>
        <br />
        <div>
          <button type="submit">Signup</button>
        </div>
      </form>
    </div>
  );
};

export default Loginsignup;
