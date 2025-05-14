import React, {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {getToken} from '../../api/apiFunctions';
import {REST_API_URLS} from "../../api/apiConstants";

export const ProtectedRoute = ({ element }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const savedToken = await getToken();

                if (savedToken) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Error fetching token:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchToken();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to={REST_API_URLS.ONLY_REGISTRATION_URL} replace />;
    }

    return element;
};