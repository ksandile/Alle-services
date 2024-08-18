import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './SignUp.css'; 

function SignUp() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate(); 

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/sign-in'); 
    } catch (error) {
      console.error('Error signing up:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('This email address is already in use. Please try signing in or use a different email.');
      } else {
        setError('Error signing up. Please try again.');
      }
    }
  };

  return (
    <div className="sign-up-container">
      <form onSubmit={handleSignUp}>
        <h2>Sign Up</h2>
        {error && <p>{error}</p>}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="Surname"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          required
        />
        <div className="password-input">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            onClick={() => setShowPassword(!showPassword)}
            className="password-icon"
          />
        </div>
        <div className="password-input">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <FontAwesomeIcon
            icon={showConfirmPassword ? faEyeSlash : faEye}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="password-icon"
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
