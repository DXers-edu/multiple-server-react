import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Route, Routes, useNavigate } from 'react-router';
import Home from './views/Home';

import Authentication from './views/Authentication';

import { ACCESS_TOKEN } from './constants';

import './App.css';

function NotFound() {
    return (
        <h1>404 Not Found</h1>
    )
}

function Index() {

    const [cookies] = useCookies();

    const accessToken = cookies[ACCESS_TOKEN];

    const navigator = useNavigate();

    useEffect(() => {
        if (accessToken) navigator('/home');
        else navigator('/auth');
    }, []);

    return null;
}

export default function App() {

    return (
        <Routes>
            <Route path='/' element={<Index />} />
            <Route path='home' element={<Home />}  />
            <Route path='auth' element={<Authentication />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}
