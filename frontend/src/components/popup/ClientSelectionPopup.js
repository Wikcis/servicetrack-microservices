import Popup from "reactjs-popup";
import {CustomButton} from "../button/CustomButton";
import {IconXButton} from "../iconButton/IconXButton";
import React, {useContext, useEffect} from "react";
import {generateCSVForClient, Titles} from "../../utils";
import {EmptyFieldsPopup} from "./errorPopup/EmptyFieldsPopup";
import {AppContext} from "../../context";
import {DropDownList} from "../dropDownList/DropDownList";

export const ClientSelectionPopup = ({triggerButton, setTriggerButton}) => {

    const {filteredServiceOrders, filteredClients, filteredUserServiceOrders, user} = useContext(AppContext);
    
    const [formattedClients, setFormattedClients] = React.useState([]);
    const [selectedClient, setSelectedClient] = React.useState([]);
    
    const [emptyWarningTrigger, setEmptyWarningTrigger] = React.useState(false);

    const clearValues = () => {
        setFormattedClients([""]);
    };

    useEffect(() => {
        if (triggerButton) {
            clearValues();
            formatClients();
        }
    }, [triggerButton]);

    const filterData = () => {

        const clientToCompare = filteredClients.find((item) => item.id === selectedClient);

        return filteredServiceOrders.filter((order) => order.clientName === clientToCompare.name);
    };

    const formatClients = React.useCallback(() => {
        const formattedClients = filteredClients.map(client => ({
            Header: client.name,
            accessor: client.id,
        }));
        setFormattedClients(formattedClients);
    }, [filteredClients]);

    return (
        <div>
            <Popup
                open={triggerButton}
                modal
                nested
                closeOnDocumentClick={false}
                onClose={() => {
                    clearValues();
                }}
            >
                <div className="popupOverlay">
                    <div className="singleColumnPopUpContainer">

                        <div className="popupHeader">
                            <h3 className="popupTitle">Select Client</h3>
                            <IconXButton className="closeButton" setTriggerButton={setTriggerButton}/>
                        </div>

                        <div className="gridContainer">

                            <div className="gridItem">
                                <span className="labelField">Enter client name</span>
                                <DropDownList
                                    columns={formattedClients}
                                    onSelectColumn={setSelectedClient}
                                    title={Titles.clientNameTitle}
                                    className={"popUpDropDownListContainer"}
                                />
                            </div>

                        </div>

                        <div className="buttonContainer">
                            <CustomButton
                                className="saveButton"
                                setTriggerButton={setTriggerButton}
                                generateCSV={generateCSVForClient}
                                data={filterData}
                                user={user}
                                type={Titles.profileTitle}
                            >
                                Save
                            </CustomButton>
                        </div>

                    </div>
                </div>

                <EmptyFieldsPopup
                    triggerButton={emptyWarningTrigger}
                    setTriggerButton={setEmptyWarningTrigger}
                />
            </Popup>
        </div>
    );
};
