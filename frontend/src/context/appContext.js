import React, {createContext, useCallback, useState} from "react";
import {getMethod} from "../services";
import {Format, mapAccessorToHeader, Status, Type} from "../utils";
import {REST_API_URLS} from "../api/apiConstants";

export const AppContext = createContext();

export const ApiContextProvider = ({children}) => {

    const [dataFetched, setDataFetched] = useState(false);
    const [userFetched, setUserFetched] = useState(false);

    const [loggedIn, setLoggedIn] = React.useState(false);
    const [register, setRegister] = React.useState(false);


    const [clients, setClients] = useState([]);
    const [serviceOrders, setServiceOrders] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [user, setUser] = useState({
        email: "",
        firstName: "",
        id: "",
        lastName: "",
        phoneNumber: "",
        role: ""
    });

    const [filteredClients, setFilteredClients] = useState([]);
    const [filteredTechnicians, setFilteredTechnicians] = useState([]);
    const [filteredServiceOrders, setFilteredServiceOrders] = useState([]);
    const [filteredUserServiceOrders, setFilteredUserServiceOrders] = useState([]);

    const [editionTrigger, setEditionTrigger] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const [loading, setLoading] = useState(true);

    const fetchClients = useCallback(async () => {
        let clientsResponse = {data: {clients: []}};

        try {

            clientsResponse = await getMethod(REST_API_URLS.CLIENTS_URL);
            if (clientsResponse) {
                setClients(clientsResponse.clients);
                setFilteredClients(clientsResponse.clients);
            }
            return clientsResponse;
        } catch (err) {
            console.error("Error refreshing clients:", err);
        }

        return clientsResponse;
    }, []);

    const fetchTechnicians = useCallback(async () => {
        let techniciansResponse = {data: {technicians: []}};

        try {
            techniciansResponse = await getMethod(REST_API_URLS.TECHNICIANS_URL);

            if (techniciansResponse) {
                setTechnicians(techniciansResponse.technicians);
                setFilteredTechnicians(techniciansResponse.technicians);
            }
            return techniciansResponse;
        } catch (err) {
            console.error("Error refreshing technicians:", err);
        }

        return techniciansResponse;
    }, []);

    const fetchServiceOrders = useCallback(async () => {

        let ordersResponse = {data: {serviceOrders: []}};

        try {
            ordersResponse = await getMethod(REST_API_URLS.SERVICEORDERS_URL);

            if (ordersResponse) {
                setServiceOrders(ordersResponse.serviceOrders);
                setFilteredServiceOrders(ordersResponse.serviceOrders);
            }

            return ordersResponse;
        } catch (err) {
            console.error("Error refreshing service orders:", err);
        }

        return ordersResponse;
    }, []);

    const fetchUser = async () => {
        if (userFetched) return;
        let userResponse = {data: {users: []}};

        setLoading(true);

        try {
            userResponse = await getMethod(REST_API_URLS.USERS_ME_URL);

            if (userResponse) {
                setUser(userResponse);
            }

            setUserFetched(true);
            return userResponse;
        } catch (err) {
            console.error("Error refreshing users:", err);
        }finally {
            setLoading(false);
        }
    };

    const createClientsWithAdditionalData = useCallback((clientsToMap, serviceOrdersToMap) => {

        const mappedClients = clientsToMap.map(client => {

            const clientOrders = serviceOrdersToMap.filter(order => order.clientId === client.id);

            const distinctServiceFormats = Array.from(
                new Set(clientOrders.map(order => mapAccessorToHeader(order.serviceFormat, Format)))
            ).join(", ");


            return {
                ...client,
                numberOfServices: clientOrders.length,
                serviceFormats: distinctServiceFormats || "",
            };
        });

        setClients(mappedClients);
        setFilteredClients(mappedClients);

    }, []);

    const createTechniciansWithAdditionalData = useCallback((techniciansToMap, serviceOrdersToMap) => {

        const mappedTechnicians = techniciansToMap.map(technician => {
            const technicianOrders = serviceOrdersToMap.filter(order => order.technicianId === technician.id);

            return {
                ...technician,
                numberOfServices: technicianOrders.length,
            };
        });

        setTechnicians(mappedTechnicians);
        setFilteredTechnicians(mappedTechnicians);
    }, []);

    const createServiceOrdersWithAdditionalData = useCallback((filteredClientsToMap, serviceOrdersToMap) => {

        const clientsForOrder = Object.fromEntries(filteredClientsToMap.map(client => [client.id, client.name]));

        const mappedOrders = serviceOrdersToMap.map(order => ({
            ...order,
            serviceFormat: mapAccessorToHeader(order.serviceFormat, Format),
            status: mapAccessorToHeader(order.status, Status),
            serviceType: mapAccessorToHeader(order.serviceType, Type),
            clientName: clientsForOrder[order.clientId],
        }));

        setServiceOrders(mappedOrders)
        setFilteredServiceOrders(mappedOrders);
    }, []);

    const fetchData = useCallback(async () => {
        if (dataFetched) return;

        setLoading(true);

        try {
            const clientsResponse = await fetchClients();
            const techniciansResponse = await fetchTechnicians();
            const serviceOrdersResponse = await fetchServiceOrders();

            if (clientsResponse && serviceOrdersResponse) {

                createClientsWithAdditionalData(clientsResponse.clients, serviceOrdersResponse.serviceOrders);
                createServiceOrdersWithAdditionalData(clientsResponse.clients, serviceOrdersResponse.serviceOrders);

                if (techniciansResponse && serviceOrdersResponse) {
                    createTechniciansWithAdditionalData(techniciansResponse.technicians, serviceOrdersResponse.serviceOrders);
                }
            }

            if (techniciansResponse && serviceOrdersResponse) {
                createTechniciansWithAdditionalData(techniciansResponse.technicians, serviceOrdersResponse.serviceOrders);
            }

            setDataFetched(true);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    },[]);

    const refreshData = useCallback (async () => {
        setDataFetched(false);
        await fetchData();
    }, [fetchData]);

    const searchClients = useCallback((input) => {
        const search = input?.trim().toLowerCase() || "";

        const filtered = clients.filter((client) => {
            return (
                client.name?.toLowerCase().includes(search) ||
                client.phoneNumber?.toString().includes(search) ||
                client.email?.toLowerCase().includes(search) ||
                client.serviceFormats?.toLowerCase().includes(search)
            );
        });

        setFilteredClients(filtered);
    }, [clients]);

    const searchTechnicians = useCallback((input) => {

        const search = input?.trim().toLowerCase() || "";

        const filtered = technicians.filter((technician) => {
            return (
                technician.firstName?.toLowerCase().includes(search) ||
                technician.lastName?.toLowerCase().includes(search) ||
                technician.phoneNumber?.toString().includes(search) ||
                technician.email?.toLowerCase().includes(search)
            );
        });

        setFilteredTechnicians(filtered);
    }, [technicians]);

    const searchServiceOrders = useCallback((input) => {

        const filtered = filterServiceOrders(serviceOrders, input);

        setFilteredServiceOrders(filtered);
    }, [serviceOrders]);

    const filterServiceOrders = (orders, input) => {
        const search = input?.trim().toLowerCase() || "";

        return orders.filter((serviceOrder) => {
            return (
                serviceOrder.clientName?.toLowerCase().includes(search) ||
                serviceOrder.serviceType?.toLowerCase().includes(search) ||
                serviceOrder.serviceFormat?.toLowerCase().includes(search) ||
                serviceOrder.dateTimeOfService?.toLowerCase().includes(search) ||
                serviceOrder.status?.toLowerCase().includes(search) ||
                serviceOrder.serviceDuration?.toLowerCase().includes(search)
            );
        });
    }

    return (
        <AppContext.Provider
            value={{
                clients,
                filteredClients,
                setFilteredClients,
                technicians,
                filteredTechnicians,
                setFilteredTechnicians,
                serviceOrders,
                filteredServiceOrders,
                filteredUserServiceOrders,
                setFilteredServiceOrders,
                setFilteredUserServiceOrders,
                searchClients,
                searchTechnicians,
                searchServiceOrders,
                loading,
                fetchData,
                fetchUser,
                refreshData,
                user,
                editionTrigger,
                setEditionTrigger,
                selectedRow,
                setSelectedRow,
                register,
                setRegister,
                loggedIn,
                setLoggedIn
            }}
        >
            {children}
        </AppContext.Provider>
    );
};