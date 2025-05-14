import {
    CustomButton,
    DropDownList,
    Searchbar,
    ServiceOrderCreationPopup,
    ServiceOrderEditionPopup,
    Sidebar,
    Table,
    TableColumns,
    UserBar
} from "../../components";
import React, {useContext, useEffect, useMemo, useState} from "react";
import "../../styles";
import {sortData, Titles} from "../../utils";
import {PlusIcon} from "../../assets";
import {AppContext} from "../../context";

export const UserServiceOrdersPage = () => {
    const {
        serviceOrders,
        technicians,
        setFilteredServiceOrders,
        searchUserServiceOrders,
        loading,
        user,
        selectedRow,
        fetchData,
        setEditionTrigger,
        editionTrigger
    } = useContext(AppContext);

    const [triggerButton, setTriggerButton] = useState(false);

    const columns = TableColumns(Titles.serviceOrdersPageTitle);

    const handleSelection = (columnName) => {
        sortData(columnName, columns, serviceOrders, setFilteredServiceOrders);
    };

    const orders = useMemo(() => {
        if (!serviceOrders || !technicians || !user) return [];

        const userTechnician = technicians.find(tech => tech.userId === user.id);
        if (!userTechnician) return [];


        return serviceOrders.filter(order => order.technicianId === userTechnician.userId);
    }, [serviceOrders, technicians, user]);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="app">
            <Sidebar />
            <div className="mainContainer">
                <UserBar title={Titles.userServiceOrdersPageTitle} />
                <div className="aboveTableContainer">
                    <DropDownList
                        columns={columns.filter(col => col.Header !== "")}
                        onSelectColumn={handleSelection}
                        title={Titles.sortByTitle}
                        className={"dropDownListContainer"}
                        required={false}
                    />
                    <Searchbar onSearch={(input) => searchUserServiceOrders(input)} />
                    <CustomButton
                        className="addButton"
                        icon={<PlusIcon />}
                        setTriggerButton={setTriggerButton}
                    >
                        Add service order
                    </CustomButton>
                </div>
                {!loading ? (
                    orders.length > 0 ? (
                        <Table data={orders} type={Titles.userServiceOrdersPageTitle} />
                    ) : (
                        <span style={{ fontWeight: "bold" }}>There are not any service orders assigned to you!</span>
                    )
                ) : null}
            </div>

            <ServiceOrderCreationPopup
                triggerButton={triggerButton}
                setTriggerButton={setTriggerButton}
            />

            <ServiceOrderEditionPopup
                triggerButton={editionTrigger}
                setTriggerButton={setEditionTrigger}
                row={selectedRow}
            />
        </div>
    );
};
