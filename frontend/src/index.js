import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
    NotFoundPage,
    TechniciansListPage,
    ClientsListPage,
    ServiceOrdersPage,
    UserServiceOrdersPage,
    ProfilePage,
    LoginPage,
    RegistrationPage
} from "./pages";
import { ApiContextProvider, REST_API_URLS } from "./context";
import { ProtectedRoute } from "./components";

const RedirectOnRefreshWrapper = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/');
    }, [navigate]);

    return children;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <RedirectOnRefreshWrapper>
                <ProtectedRoute element={<LoginPage />} />
            </RedirectOnRefreshWrapper>
        ),
        errorElement: <NotFoundPage />,
    },
    {
        path: REST_API_URLS.ONLY_TECHNICIANS_URL,
        element: (
            <ProtectedRoute element={<TechniciansListPage />} />
        ),
    },
    {
        path: REST_API_URLS.ONLY_CLIENTS_URL,
        element: (
            <ProtectedRoute element={<ClientsListPage />} />
        ),
    },
    {
        path: REST_API_URLS.ONLY_SERVICEORDERS_URL,
        element: (
            <ProtectedRoute element={<ServiceOrdersPage />} />
        ),
    },
    {
        path: REST_API_URLS.ONLY_USER_SERVICEORDERS_URL,
        element: (
            <ProtectedRoute element={<UserServiceOrdersPage />} />
        ),
    },
    {
        path: REST_API_URLS.ONLY_PROFILE_URL,
        element: (
            <ProtectedRoute element={<ProfilePage />} />
        ),
    },
    {
        path: REST_API_URLS.ONLY_LOGIN_URL,
        element: <LoginPage />,
    },
    {
        path: REST_API_URLS.ONLY_REGISTRATION_URL,
        element: <RegistrationPage />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApiContextProvider>
        <RouterProvider router={router} />
    </ApiContextProvider>
);