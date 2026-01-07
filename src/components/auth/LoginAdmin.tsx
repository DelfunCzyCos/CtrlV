import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin'
};

export type LogEntry = {
    id: number;
    timestamp: Date;
    username: string;
    action: 'LOGIN_ATTEMPT' | 'LOGIN_SUCCESS' | 'LOGIN_FAILED';
    ip?: string;
    userAgent?: string;
    details?: string;
};

export const logAdminAction = (
    username: string,
    action: LogEntry['action'],
    details?: string
): LogEntry => {
    const logs: LogEntry[] = JSON.parse(localStorage.getItem('admin_logs') || '[]');

    const newLog: LogEntry = {
        id: logs.length + 1,
        timestamp: new Date(),
        username,
        action,
        ip: window.location.hostname,
        userAgent: navigator.userAgent,
        details
    };

    logs.push(newLog);
    localStorage.setItem('admin_logs', JSON.stringify(logs));

    console.log(`[ADMIN LOG] ${action}: ${username} - ${details || ''}`);
    return newLog;
};

const LoginAdmin: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        logAdminAction(username, 'LOGIN_ATTEMPT', `Próba logowania z IP: ${window.location.hostname}`);

        await new Promise(resolve => setTimeout(resolve, 800));

        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            logAdminAction(username, 'LOGIN_SUCCESS', 'Pomyślna autoryzacja');

            localStorage.setItem('admin_authenticated', 'true');
            localStorage.setItem('admin_username', username);

            navigate('/admin/dashboard');
        } else {
            logAdminAction(username, 'LOGIN_FAILED', 'Nieprawidłowe dane logowania');
            setError('Nieprawidłowa nazwa użytkownika lub hasło');
        }

        setLoading(false);
    };

    React.useEffect(() => {
        const isAuth = localStorage.getItem('admin_authenticated');
        /*
        if (isAuth === 'true') {
            navigate('/admin/dashboard');
        }
        */
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
            <div className="bg-zinc-900 rounded-xl shadow-2xl p-8 w-full max-w-md border border-zinc-800">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Panel Administratora</h1>
                    <p className="text-gray-400">Logowanie do panelu zarządzania</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Nazwa użytkownika
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors"
                            placeholder="Wpisz nazwę użytkownika"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Hasło
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors"
                            placeholder="Wpisz hasło"
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-900/30 border border-red-700 rounded-lg">
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-10 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-base shadow-lg"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin h-5 w-5 mr-3 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Logowanie...
                                </span>
                            ) : (
                                'Zaloguj się'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginAdmin;