import { Routes, Route } from 'react-router-dom';

import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';
import Dashboard from '../Pages/Dashboard';

export default function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />

            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    )
}