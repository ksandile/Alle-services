import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css'; // Import the CSS file

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to home or any other page after successful sign-in
      navigate('/'); // Redirect to the home page (or any route you want)
    } catch (error) {
      console.error('Error signing in:', error);
      if (error.code === 'auth/user-not-found') {
        setError('You must Sign-Up first.');
      } else {
        setError('Error signing in. Please try again.');
      }
    }
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={handleSignIn}>
        <h2>Sign In</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <p>Do not have an account? <Link to="/sign-up">Sign Up</Link></p>
    </div>
  );
}

export default SignIn;
