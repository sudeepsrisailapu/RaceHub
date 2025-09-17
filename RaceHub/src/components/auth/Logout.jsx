import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './Firebase';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogout = async () => {
        setLoading(true);
        setError(null);
        try {
            await signOut(auth);
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/login');
        } catch (err) {
            setError('Failed to logout. Please try again.');
            setLoading(false);
        }
    };

    return (
        <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Confirm Logout</h1>
        <p>Are you sure you want to log out?</p>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button
            onClick={handleLogout}
            disabled={loading}
            style={{
            padding: '10px 20px',
            fontSize: '1rem',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: '#d9534f',
            color: 'white',
            cursor: loading ? 'not-allowed' : 'pointer',
            }}
        >
            {loading ? 'Logging out...' : 'Logout'}
        </button>
        </main>
    );
}
