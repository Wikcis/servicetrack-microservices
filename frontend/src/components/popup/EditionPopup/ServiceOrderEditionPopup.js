import Popup from "reactjs-popup";
import {CustomTextField} from "../../textField/CustomTextField";
import {CustomButton} from "../../button/CustomButton";
import React, {useContext} from "react";
import {IconXButton} from "../../iconButton/IconXButton";
import {DropDownList} from "../../dropDownList/DropDownList";
import {Format, Status, Titles, Type} from "../../../utils";
import {EmptyFieldsPopup} from "../errorPopup/EmptyFieldsPopup";
import {CustomDatepicker} from "../../datepicker/CustomDatepicker";
import dayjs from "dayjs";
import {CustomTimePicker} from "../../timepicker/CustomTimePicker";
import {AppContext} from "../../../context";

export const ServiceOrderEditionPopup = ({triggerButton, setTriggerButton, row}) => {

    const {
        refreshData,
        filteredTechnicians,
        filteredClients,
        user
    } = useContext(AppContext);

    const [id, setId] = React.useState("");
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

    React.useEffect(() => {
        if (row) {
            setId(row?.original.id)
            setName(row?.original.clientId);
            setTechnicianName(row?.original.technicianId);
            setStatus(row?.original.status);
            setDate(row?.original.dateTimeOfService);
            setType(row?.original.serviceType);
            setFormat(row?.original.serviceFormat);
            setDescription(row?.original.serviceDescription);
            setComment(row?.original.comment);
            setDuration(row?.original.serviceDuration);
        }
    }, [row]);

    const createRequestBody = () => {

        if (name === "" || status === "" || (user.role !== "USER" ? technicianName === "" : false) || date === "" || type === "" || format === "") {
            setEmptyWarningTrigger(true);
            return null;
        }
        return JSON.stringify({
            id: id,
            technicianId: user.role === "USER" ? user.id : technicianName,
            clientId: name,
            serviceType: String(type).toUpperCase().replace(/\s+/g, "_"),
            serviceFormat: String(format).toUpperCase().replace(/\s+/g, "_"),
            serviceDescription: description,
            dateTimeOfService: date,
            status: String(status).toUpperCase().replace(/\s+/g, "_"),
            serviceDuration: duration,
            comment: comment
        });
    }

    const formatClients = React.useCallback(() => {
        const formattedClients = filteredClients.map(client => ({
            Header: client.name,
            accessor: client.id,
        }));
        setFormattedClients(formattedClients);
    }, [filteredClients]);


    const formatTechnicians = React.useCallback(() => {
        const formattedTechnicians = filteredTechnicians.map(technician => ({
            Header: technician.firstName + " " + technician.lastName,
            accessor: technician.id
        }));
        setFormattedTechnicians(formattedTechnicians);
    }, [filteredTechnicians]);

    React.useEffect(() => {
        const fetchData = async () => {
            await formatTechnicians();
            await formatClients();
        };

        fetchData();
    }, [formatClients, formatTechnicians, triggerButton]);

    return (
        <div>
            <Popup
                open={triggerButton}
                modal
                nested
                closeOnDocumentClick={false}
                onClose={() => {
                    refreshData();
                }}

            >
                <div className="popupOverlay">
                    <div className="popUpContainer">

                        <div className="popupHeader">
                            <h3 className="popupTitle">Edit Service Order</h3>
                            <IconXButton className="closeButton" setTriggerButton={setTriggerButton}/>
                        </div>

                        <div className="gridContainer">

                            <div className="rowContainer">
                                <div className={user.role === "USER" ? "singleItem" : "gridItem"}>
                                    <span className="labelField">Enter client name</span>
                                    <DropDownList
                                        columns={formattedClients}
                                        onSelectColumn={setName}
                                        title={Titles.clientNameTitle}
                                        className={"popUpDropDownListContainer"}
                                        value={name}
                                        data={formattedClients}
                                        required={true}
                                    />
                                </div>

                                {user.role !== "USER" ? <div className="gridItem">
                                    <span className="labelField">Enter Technician name</span>
                                    <DropDownList
                                        columns={formattedTechnicians}
                                        onSelectColumn={setTechnicianName}
                                        title={Titles.technicianNameTitle}
                                        className={"popUpDropDownListContainer"}
                                        value={technicianName}
                                        data={formattedTechnicians}
                                        required={true}
                                    />
                                </div> : null}
                            </div>

                            <div className="rowContainer">
                                <div className="gridItem">
                                    <span className="labelField">Select Status</span>
                                    <DropDownList
                                        columns={Status}
                                        onSelectColumn={setStatus}
                                        title={Titles.serviceStatusTitle}
                                        className={"popUpDropDownListContainer"}
                                        value={status}
                                        required={true}
                                    />
                                </div>

                                <div className="gridItem">
                                    <span className="labelField">Pick Date of service</span>
                                    <CustomDatepicker
                                        className="popUpDatepicker"
                                        title="Date of service"
                                        onSelectedDate={setDate}
                                        minDate={status === "Done" ? dayjs("2020-12-31") : dayjs()}
                                        maxDate={status === "Done" ? dayjs() : dayjs("2035-12-31")}
                                        value={dayjs(date)}
                                    />
                                </div>
                            </div>

                            <div className="rowContainer">
                                <div className="gridItem">
                                    <span className="labelField">Select service type</span>
                                    <DropDownList
                                        columns={Type}
                                        onSelectColumn={setType}
                                        title={Titles.serviceTypeTitle}
                                        className={"popUpDropDownListContainer"}
                                        value={type}
                                        required={true}
                                    />
                                </div>

                                <div className="gridItem">
                                    <span className="labelField">Select service format</span>
                                    <DropDownList
                                        columns={Format}
                                        onSelectColumn={setFormat}
                                        title={Titles.serviceFormatTitle}
                                        className={"popUpDropDownListContainer"}
                                        value={format}
                                        required={true}
                                    />
                                </div>
                            </div>


                            <div className="gridItem">
                                <span className="labelField">Enter description of the service</span>
                                <span className="description">
                                    <CustomTextField
                                        label={"Description"}
                                        setText={setDescription}
                                        maxLength={512}
                                        value={description}
                                    />
                                </span>
                            </div>


                            <div className="rowContainer">
                                <div className="gridItem">
                                    <span className="labelField">Enter comment of the service</span>
                                    <span className="textField">
                                        <CustomTextField
                                            label={"Comment"}
                                            setText={setComment}
                                            maxLength={512}
                                            value={comment}
                                        />
                                    </span>
                                </div>

                                <div className="gridItem">
                                    <span className="labelField">Select Service Duration</span>
                                    <CustomTimePicker
                                        onSelectedTime={setDuration}
                                        title={Titles.serviceDurationTitle}
                                        className={"popUpTimepicker"}
                                        value={duration}
                                        required={status === "DONE"}
                                        validate={validate}
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="buttonContainer">
                            <CustomButton
                                className="saveButton"
                                setTriggerButton={setTriggerButton}
                                requestBody={createRequestBody}
                                type={Titles.serviceOrdersPageTitle}
                                validate={setValidate}
                            >
                                Update
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
}