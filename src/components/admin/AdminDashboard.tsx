import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogEntry, logAdminAction } from '../auth/LoginAdmin';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const isAuth = localStorage.getItem('admin_authenticated');
        const storedUsername = localStorage.getItem('admin_username');

        if (isAuth !== 'true') {
            navigate('/admin');
            return;
        }

        if (storedUsername) {
            setUsername(storedUsername);
        }

        const storedLogs = JSON.parse(localStorage.getItem('admin_logs') || '[]');
        setLogs(storedLogs);
    }, [navigate]);

    const handleLogout = () => {
        logAdminAction(username, 'LOGIN_ATTEMPT', 'Wylogowanie z systemu');
        localStorage.removeItem('admin_authenticated');
        localStorage.removeItem('admin_username');
        navigate('/admin');
    };

    const clearLogs = () => {
        if (window.confirm('Czy na pewno chcesz wyczyścić wszystkie logi?')) {
            localStorage.removeItem('admin_logs');
            setLogs([]);
            logAdminAction(username, 'LOGIN_ATTEMPT', 'Logi wyczyszczone przez administratora');
        }
    };

    const formatDate = (date: Date | string) => {
        const d = new Date(date);
        return d.toLocaleString('pl-PL');
    };

    const getActionColor = (action: string) => {
        switch (action) {
            case 'LOGIN_SUCCESS': return 'bg-green-900/30 text-green-400';
            case 'LOGIN_FAILED': return 'bg-red-900/30 text-red-400';
            case 'LOGIN_ATTEMPT': return 'bg-blue-900/30 text-blue-400';
            default: return 'bg-gray-900/30 text-gray-400';
        }
    };

    const getActionText = (action: string) => {
        switch (action) {
            case 'LOGIN_SUCCESS': return 'Pomyślne logowanie';
            case 'LOGIN_FAILED': return 'Błąd logowania';
            case 'LOGIN_ATTEMPT': return 'Próba logowania';
            default: return action;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-8">
            <header className="mb-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Panel Administratora</h1>
                        <p className="text-gray-400">Witaj, {username}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg transition"
                    >
                        Wyloguj się
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                        <h2 className="text-xl font-semibold text-white mb-4">Statystyki</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Wszystkie próby logowania:</span>
                                <span className="text-white font-bold">{logs.length}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Pomyślne logowania:</span>
                                <span className="text-green-400 font-bold">
                                    {logs.filter(log => log.action === 'LOGIN_SUCCESS').length}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Nieudane próby:</span>
                                <span className="text-red-400 font-bold">
                                    {logs.filter(log => log.action === 'LOGIN_FAILED').length}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Ostatnia aktywność:</span>
                                <span className="text-white text-sm">
                                    {logs.length > 0 ? formatDate(logs[logs.length - 1].timestamp) : 'Brak danych'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                        <h2 className="text-xl font-semibold text-white mb-4">Akcje</h2>
                        <div className="space-y-3">
                            <button
                                onClick={clearLogs}
                                className="w-full py-2 px-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition"
                            >
                                Wyczyść logi
                            </button>
                            <button
                                onClick={() => logAdminAction(username, 'LOGIN_ATTEMPT', 'Testowa akcja')}
                                className="w-full py-2 px-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition"
                            >
                                Dodaj testowy wpis
                            </button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 h-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-white">Dziennik aktywności</h2>
                            <span className="text-gray-400 text-sm">
                                Wszystkich wpisów: {logs.length}
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            {logs.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">Brak logów</p>
                                </div>
                            ) : (
                                <table className="w-full">
                                    <thead>
                                    <tr className="border-b border-zinc-800">
                                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Czas</th>
                                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Użytkownik</th>
                                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Akcja</th>
                                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Szczegóły</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {[...logs].reverse().map((log) => (
                                        <tr key={log.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition">
                                            <td className="py-3 px-4 text-gray-300 text-sm">
                                                {formatDate(log.timestamp)}
                                            </td>
                                            <td className="py-3 px-4 text-gray-300">
                                                {log.username || 'Nieznany'}
                                            </td>
                                            <td className="py-3 px-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
                                                        {getActionText(log.action)}
                                                    </span>
                                            </td>
                                            <td className="py-3 px-4 text-gray-400 text-sm">
                                                {log.details || '-'}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;