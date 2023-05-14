import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AppRoutes } from 'routes';
import HomePage from './home';
import LoginPage from './login';
import { useSelector } from 'react-redux';
import { selectAuthentication } from 'store/selectors';


export default function Pages() {
    const { isAuthenticated } = useSelector(selectAuthentication);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isAuthenticated && window.location.pathname !== '/') return navigate("/")
    }, [isAuthenticated, navigate])
    return (
        <Routes>
            {isAuthenticated ? <>
                <Route element={<HomePage />} path={AppRoutes.home} />,
            </> : <>
                <Route element={<LoginPage />} path={"*"} />,
            </>}
        </Routes>
    )
}
