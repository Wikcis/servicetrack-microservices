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
} from "../../components"
import React, {useContext, useEffect, useState} from "react";
import "../../styles"
import {sortData, Titles} from "../../utils";
import {PlusIcon} from "../../assets";
import {AppContext} from "../../context";

export const ServiceOrdersPage = () => {

    const {
        filteredServiceOrders,
        setFilteredServiceOrders,
        searchServiceOrders,
        loading,
        user,
        setEditionTrigger,
        editionTrigger,
        selectedRow,
        fetchData
    } = useContext(AppContext);

    const [triggerButton, setTriggerButton] = useState(false);

    const columns = TableColumns(Titles.serviceOrdersPageTitle, user);

    const handleSelection = (columnName) => {
        sortData(columnName, columns, filteredServiceOrders, setFilteredServiceOrders);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="app">
            <Sidebar/>
            <div className="mainContainer">
                <UserBar title={Titles.serviceOrdersPageTitle}/>
                <div className="aboveTableContainer">
                    <DropDownList
                        columns={columns.filter(col => col.Header !== "")}
                        onSelectColumn={handleSelection}
                        title={Titles.sortByTitle}
                        className={"dropDownListContainer"}
                    />
                    <Searchbar onSearch={(input) => searchServiceOrders(input)}/>
                    {user?.role !== "USER" ?
                        <CustomButton
                            className="addButton"
                            icon={<PlusIcon/>}
                            setTriggerButton={setTriggerButton}
                        >
                            Add service order
                        </CustomButton>
                        : null
                    }
                </div>
                {!loading ? (
                    <Table
                        data={filteredServiceOrders}
                        type={Titles.serviceOrdersPageTitle}
                    />
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
