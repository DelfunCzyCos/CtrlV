import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const LoginAdmin = lazy(() => import('./components/auth/LoginAdmin'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));
const AdminDetail = lazy(() => import('./components/admin/AdminDetail'));


const root = createRoot(document.getElementById("root")!);

root.render(
    <BrowserRouter>
        <Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white">Ładowanie...</div>
            </div>
        }>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/admin" element={<LoginAdmin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/detail/:movieId" element={<AdminDetail />} />
                <Route path="*" element={<App />} />
            </Routes>
        </Suspense>
    </BrowserRouter>
);