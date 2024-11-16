import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (!username || !email || !password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
            } else {
                setSuccess(data.message || 'Signup successful!');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (error) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSignup} className="signup-form">
                <h2 className="signup-heading">Signup</h2>

                {error && <p className="signup-error">{error}</p>}
                {success && <p className="signup-success">{success}</p>}

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="signup-input"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="signup-input"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="signup-input"
                    required
                />

                <button type="submit" className="signup-button" disabled={loading}>
                    {loading ? 'Signing up...' : 'Signup'}
                </button>

                {/* Link to Login page for existing users */}
                <p className="signup-text">
                    Already have an account? <Link to="/login" className="signup-link"> Login here</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
