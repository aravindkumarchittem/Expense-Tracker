import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface LoginProps {
  onLogin: (accessToken: string) => void;
}

const API_URL = import.meta.env.VITE_API_URL;

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('token', data.accessToken);
      onLogin(data.accessToken);
      navigate('/');

    } catch (error: any) {
      console.error('Login error:', error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <form
        onSubmit={handleSubmit}
        className="card-glass p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Welcome Back 👋</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input-field w-full"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input-field w-full"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="btn-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-sm text-center text-muted">
          Don't have an account?{' '}
          <Link to="/register" className="text-electric-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
