import {
    ClientsIcon,
    PrimaryClientsIcon,
    PrimaryServiceOrdersIcon,
    PrimaryTechnicianIcon,
    ServiceOrdersIcon,
    TechnicianIcon
} from "../../assets"
import {REST_API_URLS} from "../../api/apiConstants";
import React from "react";


export const SidebarData = (role) => [
    {
        title: "Technicians",
        icon: <TechnicianIcon />,
        primaryIcon: <PrimaryTechnicianIcon />,
        link: REST_API_URLS.ONLY_TECHNICIANS_URL
    },
    {
        title: "Service Orders",
        icon: <ServiceOrdersIcon/>,
        primaryIcon: <PrimaryServiceOrdersIcon/>,
        link: REST_API_URLS.ONLY_SERVICEORDERS_URL
    },
    {
        title: "Clients",
        icon: <ClientsIcon/>,
        primaryIcon: <PrimaryClientsIcon/>,
        link: REST_API_URLS.ONLY_CLIENTS_URL
    },
    ...(role === "USER"
        ? [
            {
                title: "Your Service Orders",
                icon: <ServiceOrdersIcon/>,
                primaryIcon: <PrimaryServiceOrdersIcon/>,
                link: REST_API_URLS.ONLY_USER_SERVICEORDERS_URL
            },
        ]
        : []),

];

