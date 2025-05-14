import {
    CustomButton,
    DropDownList, LoggedIn,
    Searchbar,
    Sidebar,
    Table,
    TableColumns,
    TechnicianCreationPopup,
    TechnicianEditionPopup,
    UserBar
} from "../../components"
import React, {useContext, useEffect, useState} from "react";
import "../../styles"
import {sortData, Titles} from "../../utils";
import {PlusIcon} from "../../assets";
import {AppContext, REST_API_URLS} from "../../context";
import {getToken} from "../../api/apiFunctions";
import {useNavigate} from "react-router-dom";

export const TechniciansListPage = () => {

    const navigate = useNavigate();
    const {
        filteredTechnicians,
        setFilteredTechnicians,
        loading,
        searchTechnicians,
        user,
        setEditionTrigger,
        editionTrigger,
        selectedRow,
        fetchData,
        loggedIn,
        setLoggedIn
    } = useContext(AppContext);

    const [triggerButton, setTriggerButton] = useState(false);

    const columns = TableColumns(Titles.techniciansPageTitle, user);

    const handleSelection = (columnName) => {
        sortData(columnName, columns, filteredTechnicians, setFilteredTechnicians);
    };
    
    useEffect(() => {
        const checkTokenAndFetchData = async () => {
            const token = await getToken();
            if (!token) {
                navigate(REST_API_URLS.LOGIN_URL);
                return;
            }

            fetchData();
        };

        checkTokenAndFetchData();
    }, []);


    return (<div className="app">
            <Sidebar/>
            <div className="mainContainer">
                <UserBar title={Titles.techniciansPageTitle}/>
                <div className="aboveTableContainer">
                    <DropDownList
                        columns={columns.filter(col => col.Header !== "")}
                        onSelectColumn={handleSelection}
                        title={Titles.sortByTitle}
                        className={"dropDownListContainer"}
                    />
                    <Searchbar onSearch={(input) => searchTechnicians(input)}/>
                    {user?.role !== "USER" ?
                        <CustomButton
                            className="addButton"
                            icon={<PlusIcon/>}
                            setTriggerButton={setTriggerButton}
                        >
                            Add technician
                        </CustomButton>
                        : null
                    }
                </div>
                {!loading ? (
                    <Table
                        data={filteredTechnicians || []}
                        type={Titles.techniciansPageTitle}
                    />
                ) : null}
            </div>
            <TechnicianCreationPopup
                triggerButton={triggerButton}
                setTriggerButton={setTriggerButton}
            />

            <TechnicianEditionPopup
                triggerButton={editionTrigger}
                setTriggerButton={setEditionTrigger}
                row={selectedRow}
            />

            <LoggedIn
                triggerButton={loggedIn}
                setTriggerButton={setLoggedIn}
            />
        </div>

    );
};
