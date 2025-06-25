import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RegisterProps {
  onLogin: (token: string) => void;
}

const API_URL = import.meta.env.VITE_API_URL;

const Register: React.FC<RegisterProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signup failed');

      onLogin(data.accessToken);
      navigate('/');
    } catch (error: any) {
      alert(error.message || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-glass p-6 max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold text-center">Create an Account</h2>
      <input
        className="input-field"
        placeholder="Username"
        name="username"
        value={form.username}
        onChange={handleChange}
        required
      />
      <input
        className="input-field"
        placeholder="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        className="input-field"
        placeholder="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button className="btn-primary w-full" type="submit">Register</button>
    </form>
  );
};

export default Register;
