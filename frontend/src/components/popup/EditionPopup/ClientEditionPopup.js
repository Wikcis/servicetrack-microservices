import Popup from "reactjs-popup";
import {CustomTextField} from "../../textField/CustomTextField";
import {CustomButton} from "../../button/CustomButton";
import {IconXButton} from "../../iconButton/IconXButton";
import React, {useContext} from "react";
import {isNumeric, Titles} from "../../../utils";
import {EmptyFieldsPopup} from "../errorPopup/EmptyFieldsPopup";
import {AppContext} from "../../../context";
import {WrongValuePopup} from "../errorPopup/WrongValuePopup";

export const ClientEditionPopup = ({triggerButton, setTriggerButton, row}) => {

    const {refreshData} = useContext(AppContext);

    const [id, setId] = React.useState("");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [emptyWarningTrigger, setEmptyWarningTrigger] = React.useState(false);
    const [wrongValuesTrigger, setWrongValuesTrigger] = React.useState(false);
    const [validate, setValidate] = React.useState(false);

    React.useEffect(() => {
        if (row) {
            setId(row.original.id || "");
            setName(row.original.name || "");
            setEmail(row.original.email || "");
            setPhoneNumber(row.original.phoneNumber || "");
        }
    }, [row]);

    const createRequestBody = () => {

        if(!isNumeric(phoneNumber)) {
            setWrongValuesTrigger(true);
            return null;
        }

        if (name === "" || email === "" || phoneNumber === "") {
            setEmptyWarningTrigger(true);
            return null;
        }

        return JSON.stringify({
            id: id,
            name: name,
            email: email,
            phoneNumber: phoneNumber
        });
    };

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
                    <div className="singleColumnPopUpContainer">

                        <div className="popupHeader">
                            <h3 className="popupTitle">Edit Client</h3>
                            <IconXButton className="closeButton" setTriggerButton={setTriggerButton}/>
                        </div>

                        <div className="gridContainer">

                            <div className="gridItem">
                                <span className="labelField">Enter client name</span>
                                <span className="textField">
                                    <CustomTextField
                                        label={"Name"}
                                        setText={setName}
                                        maxLength={32}
                                        value={name}
                                        required={true}
                                        validate={validate}
                                    />
                                </span>
                            </div>

                            <div className="gridItem">
                                <span className="labelField">Enter Email</span>
                                <span className="textField">
                                    <CustomTextField
                                        label={"Email"}
                                        setText={setEmail}
                                        maxLength={32}
                                        email={true}
                                        disabled={true}
                                        value={email}
                                    />
                                </span>
                            </div>

                            <div className="gridItem">
                                <span className="labelField">Enter phone number</span>
                                <span className="textField">
                                    <CustomTextField
                                        label={"Phone number"}
                                        setText={setPhoneNumber}
                                        maxLength={9}
                                        minLength={9}
                                        numeric={true}
                                        value={phoneNumber}
                                        required={true}
                                        validate={validate}
                                    />
                                </span>

                            </div>
                        </div>

                        <div className="buttonContainer">
                            <CustomButton
                                className="saveButton"
                                setTriggerButton={setTriggerButton}
                                requestBody={createRequestBody}
                                type={Titles.clientsPageTitle}
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

                <WrongValuePopup
                    triggerButton={wrongValuesTrigger}
                    setTriggerButton={setWrongValuesTrigger}
                />
            </Popup>
        </div>
    );
};
