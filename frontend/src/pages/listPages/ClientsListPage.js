import {
    ClientCreationPopup,
    ClientEditionPopup,
    CustomButton,
    DropDownList,
    Searchbar,
    Sidebar,
    Table,
    TableColumns,
    UserBar
} from "../../components";
import React, {useContext, useEffect, useState} from "react";
import "../../styles";
import {sortData, Titles} from "../../utils";
import "../../components";
import {PlusIcon} from "../../assets";
import {AppContext} from "../../context";

export const ClientsListPage = () => {
    const {searchClients, filteredClients, setFilteredClients, loading, user,
        setEditionTrigger, editionTrigger, selectedRow, fetchData} = useContext(AppContext);

    const [triggerButton, setTriggerButton] = useState(false);
    const columns = TableColumns(Titles.clientsPageTitle, user);
    const handleSelection = (columnName) => {
        sortData(columnName, columns, filteredClients, setFilteredClients);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="app">
            <Sidebar/>
            <div className="mainContainer">
                <UserBar title={Titles.clientsPageTitle}/>
                <div className="aboveTableContainer">
                    <DropDownList columns={columns.filter(col => col.Header !== "")} onSelectColumn={handleSelection}
                                  title={Titles.sortByTitle} className={"dropDownListContainer"}/>
                    <Searchbar onSearch={(input) => searchClients(input)}/>
                    {user?.role !== "USER" ?
                        <CustomButton className="addButton" icon={<PlusIcon/>} setTriggerButton={setTriggerButton}>
                            Add client
                        </CustomButton> : null}
                </div>
                {!loading ? (<Table data={filteredClients || []} type={Titles.clientsPageTitle}/>) : null}
            </div>
            <ClientCreationPopup triggerButton={triggerButton} setTriggerButton={setTriggerButton}/>

            <ClientEditionPopup triggerButton={editionTrigger} setTriggerButton={setEditionTrigger} row={selectedRow}/>
        </div>
    );
};

