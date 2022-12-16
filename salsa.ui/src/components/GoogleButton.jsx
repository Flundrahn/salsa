import React from 'react';
import googleIcon from '../assets/google-icon.webp';
import '../styles/GoogleButton.css';

export default function LoginButton({ label, handleClick, className }) {
  return (
    <button
      type="submit"
      className={`google-btn ${className}`}
      onClick={handleClick}
    >
      <img src={googleIcon} alt="Google icon" className="google-btn__icon" />
      <span>{label}</span>
    </button>
  );
}
