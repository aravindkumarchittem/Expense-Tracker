import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Expense } from './types/index';

// Components
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import AllExpenses from './pages/AllExpenses';
import Login from './pages/login';
import Register from './pages/Register';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    useEffect(() => {
        if (!token) return;

        const fetchExpenses = async () => {
            try {
                const response = await fetch(`${API_URL}/api/expenses`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) throw new Error('Unauthorized');
                const data = await response.json();
                setExpenses(data);
            } catch (error) {
                console.error('Failed to fetch expenses:', error);
            }
        };

        fetchExpenses();
    }, [token]);

    const addExpense = async (expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            const response = await fetch(`${API_URL}/api/expenses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(expense)
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Backend error:', data);
                throw new Error(data.error || 'Failed to add expense');
            }

            setExpenses(prev => [data, ...prev]);
        } catch (error) {
            console.error('Frontend error:', error);
            alert('Error adding expense. Please try again.');
        }
    };

    const updateExpense = async (id: string, updates: Partial<Expense>) => {
        try {
            const response = await fetch(`${API_URL}/api/expenses/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updates)
            });

            if (!response.ok) throw new Error('Failed to update expense');

            const updatedExpense = await response.json();
            setExpenses(prev =>
                prev.map(exp => (exp.id === id ? updatedExpense : exp))
            );
        } catch (error) {
            console.error(error);
        }
    };

    const deleteExpense = async (id: string) => {
        try {
            const response = await fetch(`${API_URL}/api/expenses/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to delete expense');

            setExpenses(prev => prev.filter(exp => exp.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogin = (accessToken: string) => {
        localStorage.setItem('token', accessToken);
        setToken(accessToken);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setExpenses([]);
    };

    return (
        <Router>
            <div className="min-h-screen bg-background">
                <Navbar onLogout={handleLogout} isLoggedIn={!!token} />
                <main className="container mx-auto px-4 py-8">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                token ? (
                                    <Dashboard expenses={expenses} />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/add-expense"
                            element={
                                token ? (
                                    <AddExpense onAddExpense={addExpense} />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/expenses"
                            element={
                                token ? (
                                    <AllExpenses
                                        expenses={expenses}
                                        onUpdateExpense={updateExpense}
                                        onDeleteExpense={deleteExpense}
                                    />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                        <Route path="/register" element={<Register onLogin={handleLogin} />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
