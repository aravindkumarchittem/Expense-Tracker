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
console.log('API_URL:', API_URL); // Debugging

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

                console.log('Fetch status:', response.status);
                console.log('Content-Type:', response.headers.get('content-type'));

                if (!response.ok) {
                    const text = await response.text();
                    console.error('Fetch expenses failed:', text);
                    return;
                }

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

            const text = await response.text();

            if (!response.ok) {
                console.error('Backend error:', text);
                throw new Error('Failed to add expense');
            }

            const data = JSON.parse(text);
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

            const text = await response.text();

            if (!response.ok) {
                console.error('Update failed:', text);
                return;
            }

            const updatedExpense = JSON.parse(text);
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

            const text = await response.text();

            if (!response.ok) {
                console.error('Delete failed:', text);
                return;
            }

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
