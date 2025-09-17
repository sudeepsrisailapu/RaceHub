import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from './Firebase'

const formContainerStyle = {
    height: '100vh', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',   
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif'
};

const formStyle = {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '320px',
    boxSizing: 'border-box',
    textAlign: 'center',
};

const inputStyle = {
    width: '100%',
    padding: '12px 10px',
    margin: '10px 0',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
};

const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '15px',
};

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Registration successful!");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div style={formContainerStyle}>
            <form onSubmit={handleRegister} style={formStyle}>
            <h2>Register</h2>
            <input type="email" placeholder="Email" value={email}
                    onChange={(e) => setEmail(e.target.value)} style={inputStyle}/>
            <input type="password" placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)} style={inputStyle}/>
            <button type="submit" style={buttonStyle}>Sign Up</button>
            </form>
        </div>
    );
}

export default Register;
