import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/login', { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('Login failed');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow w-96">
        <h2 className="text-2xl mb-6 font-bold">Login</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <input
          className="mb-4 w-full p-2 border rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="mb-4 w-full p-2 border rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white py-2 w-full rounded hover:bg-blue-700">Login</button>
      </form>
    </div>
  );
};

export default Login;
