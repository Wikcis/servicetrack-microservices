import Popup from "reactjs-popup";
import {CustomTextField} from "../../textField/CustomTextField";
import {CustomButton} from "../../button/CustomButton";
import React, {useContext, useEffect} from "react";
import {IconXButton} from "../../iconButton/IconXButton";
import {DropDownList} from "../../dropDownList/DropDownList";
import {Format, Status, Titles, Type} from "../../../utils";
import {EmptyFieldsPopup} from "../errorPopup/EmptyFieldsPopup";
import {CustomDatepicker} from "../../datepicker/CustomDatepicker";
import dayjs from "dayjs";
import {CustomTimePicker} from "../../timepicker/CustomTimePicker";
import {AppContext} from "../../../context";

export const ServiceOrderCreationPopup = ({triggerButton, setTriggerButton}) => {

    const {refreshData, filteredTechnicians, filteredClients, user} = useContext(AppContext);

    const [name, setName] = React.useState("");
    const [technicianName, setTechnicianName] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [date, setDate] = React.useState("");
    const [type, setType] = React.useState("");
    const [format, setFormat] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [comment, setComment] = React.useState("");
    const [duration, setDuration] = React.useState("");
    const [emptyWarningTrigger, setEmptyWarningTrigger] = React.useState(false);
    const [formattedClients, setFormattedClients] = React.useState([])
    const [formattedTechnicians, setFormattedTechnicians] = React.useState([])
    const [validate, setValidate] = React.useState(false);

    const clearValues = () => {
        setName("");
        setTechnicianName("")
        setStatus("");
        setDate("");
        setType("");
        setFormat("");
        setDescription("");
        setComment("");
        setDuration("");
    };

    const createRequestBody = () => {
        if (name === "" || status === "" || (user.role !== "USER" ? technicianName === "" : false) || date === "" || type === "" || format === "") {
            setEmptyWarningTrigger(true);
            return null;
        }

        return JSON.stringify({
            id: window.crypto.randomUUID(),
            technicianId: user.role === "USER" ? user.id : technicianName,
            clientId: name,
            serviceType: type,
            serviceFormat: format,
            serviceDescription: description,
            dateTimeOfService: date,
            status: status,
            serviceDuration: duration,
            comment: comment
        });
    }

    const formatClients = React.useCallback(() => {
        const clients = filteredClients.map(client => ({
            Header: client.name,
            accessor: client.id,
        }));
        setFormattedClients(clients);
    }, [filteredClients]);

    const formatTechnicians = React.useCallback(() => {
        const technicians = filteredTechnicians.map(technician => ({
            Header: technician.firstName + " " + technician.lastName,
            accessor: technician.id
        }));
        setFormattedTechnicians(technicians);
    }, [filteredTechnicians]);

    useEffect(() => {
        if (triggerButton) {
            clearValues();
            formatClients();
            formatTechnicians();
            setStatus("PLANNED");
            setDate(dayjs().add(1, 'day'))
        }
    }, [formatClients, formatTechnicians, triggerButton]);

    return (
        <div>
            <Popup open={triggerButton} modal nested closeOnDocumentClick={false} onClose={() => { clearValues(); refreshData(); }}>
                <div className="popupOverlay">
                    <div className="popUpContainer">
                        <div className="popupHeader">
                            <h3 className="popupTitle">Add New Service Order</h3>
                            <IconXButton className="closeButton" setTriggerButton={setTriggerButton}/>
                        </div>

                        <div className="gridContainer">
                            <div className="rowContainer">
                                <div className={user.role === "USER" ? "singleItem" : "gridItem"}>
                                    <span className="labelField">Client</span>
                                    <DropDownList columns={formattedClients} onSelectColumn={setName} title={Titles.clientNameTitle} className="fullWidthInput" required={true} validate={validate} />
                                </div>
                                {user.role !== "USER" && (
                                    <div className="gridItem">
                                        <span className="labelField">Technician</span>
                                        <DropDownList columns={formattedTechnicians} onSelectColumn={setTechnicianName} title={Titles.technicianNameTitle} className="fullWidthInput" required={true} validate={validate} />
                                    </div>
                                )}
                            </div>

                            <div className="rowContainer">
                                <div className="gridItem">
                                    <span className="labelField">Status</span>
                                    <DropDownList columns={Status} onSelectColumn={setStatus} title={Titles.serviceStatusTitle} className="fullWidthInput" value={status} required={true} validate={validate} />
                                </div>
                                <div className="gridItem">
                                    <span className="labelField">Date of service</span>
                                    <CustomDatepicker className="fullWidthInput" title="Date of service" onSelectedDate={setDate} minDate={status === "DONE" ? dayjs("2020-12-31") : dayjs()} maxDate={status === "DONE" ? dayjs() : dayjs("2035-12-31")} value={dayjs()} />
                                </div>
                            </div>

                            <div className="rowContainer">
                                <div className="gridItem">
                                    <span className="labelField">Service type</span>
                                    <DropDownList columns={Type} onSelectColumn={setType} title={Titles.serviceTypeTitle} className="fullWidthInput" required={true} validate={validate} />
                                </div>
                                <div className="gridItem">
                                    <span className="labelField">Service format</span>
                                    <DropDownList columns={Format} onSelectColumn={setFormat} title={Titles.serviceFormatTitle} className="fullWidthInput" required={true} validate={validate} />
                                </div>
                            </div>

                            <div className="gridItem">
                                <span className="labelField">Description</span>
                                <span className="textField">
                                    <CustomTextField label={"Description"} setText={setDescription} maxLength={512} />
                                </span>
                            </div>

                            <div className="rowContainer">
                                <div className="gridItem">
                                    <span className="labelField">Comment</span>
                                    <span className="textField">
                                        <CustomTextField label={"Comment"} setText={setComment} maxLength={512} />
                                    </span>
                                </div>
                                <div className="gridItem">
                                    <span className="labelField">Duration</span>
                                    <CustomTimePicker onSelectedTime={setDuration} title={Titles.serviceDurationTitle} className="fullWidthInput" />
                                </div>
                            </div>
                        </div>

                        <div className="buttonContainer">
                            <CustomButton className="saveButton" setTriggerButton={setTriggerButton} requestBody={createRequestBody} validate={setValidate} type={Titles.serviceOrdersPageTitle}>
                                Save Order
                            </CustomButton>
                        </div>
                    </div>
                </div>

                <EmptyFieldsPopup triggerButton={emptyWarningTrigger} setTriggerButton={setEmptyWarningTrigger} />
            </Popup>
        </div>
    );
}