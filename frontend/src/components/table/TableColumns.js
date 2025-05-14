import React, {Fragment, useContext} from "react";
import {EditDeleteIconButtonsContainer} from "../iconButton/EditDeleteIconButtonsContainer";
import {Titles} from "../../utils";
import {AppContext} from "../../context";

const numberColumn = {
    Header: "Nr",
    accessor: "checkBox",
    style: {width: "5%"},
    Cell: ({ row }) => row.index + 1,
};

const phoneNumberColumn = {
    Header: "Phone number",
    accessor: "phoneNumber",
    style: {width: "12%"},
}

const emailColumn = {
    Header: "Email",
    accessor: "email",
    style: {width: "22%"},
}

const createTechniciansColumns = (type, role) => [

    numberColumn,
    {
        Header: "First Name",
        accessor: "firstName",
        style: {width: "15%"},
    },
    {
        Header: "Last Name",
        accessor: "lastName",
        style: {width: "20%"},
    },
    phoneNumberColumn,
    emailColumn,
    {
        Header: "Number of Services",
        accessor: "numberOfServices",
        style: {width: "10%"},
    },
    ...(role !== "USER"
        ? [
            {
                Header: "",
                accessor: "edition",
                style: { width: "7%" },
                Cell: ({ row }) => (
                    <EditDeleteIconButtonsContainer type={type} row={row} />
                ),
            },
        ]
        : []),
];

const createClientColumns = (type, role) => [

    numberColumn,
    {
        Header: "Name",
        accessor: "name",
        style: {width: "20%"},
    },
    phoneNumberColumn,
    emailColumn,
    {
        Header: "Service Formats",
        accessor: "serviceFormats",
        style: {width: "15%"},
    },
    {
        Header: "Number of Services",
        accessor: "numberOfServices",
        style: {width: "10%"},
    },
    ...(role !== "USER"
        ? [
            {
                Header: "",
                accessor: "edition",
                style: { width: "7%" },
                Cell: ({ row }) => (
                    <EditDeleteIconButtonsContainer type={type} row={row} />
                ),
            },
        ]
        : []),
];

const createServiceOrdersColumns = (type, role) => [
    numberColumn,
    {
        Header: "Client Name",
        accessor: "clientName",
        style: {width: "15%"},
    },
    {
        Header: "Type of Service",
        accessor: "serviceType",
        style: {width: "15%"},
    },
    {
        Header: "Service Format",
        accessor: "serviceFormat",
        style: {width: "12%"},
    },
    {
        Header: "Time of service",
        accessor: "dateTimeOfService",
        style: {width: "15%"},
        Cell: ({row}) => (
            <Fragment>{formatDateTime(row.original.dateTimeOfService)}</Fragment>
        ),
    },
    {
        Header: "Status",
        accessor: "status",
        style: {width: "12%"},
    },
    {
        Header: "Duration of service",
        accessor: "serviceDuration",
        style: {width: "12%"},
    },
    ...(role !== "USER"
        ? [
            {
                Header: "",
                accessor: "edition",
                style: {width: "7%"},
                Cell: ({row}) => <EditDeleteIconButtonsContainer type={type} row={row}/>
            },
        ]
        : []),

];

const createUserServiceOrdersColumns = (type) => [
    numberColumn,
    {
        Header: "Client Name",
        accessor: "clientName",
        style: {width: "15%"},
    },
    {
        Header: "Type of Service",
        accessor: "serviceType",
        style: {width: "15%"},
    },
    {
        Header: "Service Format",
        accessor: "serviceFormat",
        style: {width: "12%"},
    },
    {
        Header: "Time of service",
        accessor: "dateTimeOfService",
        style: {width: "15%"},
        Cell: ({row}) => (
            <Fragment>{formatDateTime(row.original.dateTimeOfService)}</Fragment>
        ),
    },
    {
        Header: "Status",
        accessor: "status",
        style: {width: "12%"},
    },
    {
        Header: "Duration of service",
        accessor: "serviceDuration",
        style: {width: "12%"},
    },
    {
        Header: "",
        accessor: "edition",
        style: {width: "7%"},
        Cell: ({row}) => <EditDeleteIconButtonsContainer type={type} row={row}/>
    },
];

const formatDateTime = (dateTime) => {
    if (!dateTime) return "N/A";
    try {
        const date = new Date(dateTime);
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        }).format(date);
    } catch {
        return "Invalid Date";
    }
};

export const TableColumns = (type, user) => {

    const role = user?.role;

    switch (type) {
        case Titles.techniciansPageTitle:
            return createTechniciansColumns(type, role);
        case Titles.clientsPageTitle:
            return createClientColumns(type, role);
        case Titles.serviceOrdersPageTitle:
            return createServiceOrdersColumns(type, role);
        case Titles.userServiceOrdersPageTitle:
            return createUserServiceOrdersColumns(type);
        default:
            return [];
    }
};

