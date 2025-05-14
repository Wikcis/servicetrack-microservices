import Popup from "reactjs-popup";
import {CustomTextField} from "../../textField/CustomTextField";
import {CustomButton} from "../../button/CustomButton";
import {IconXButton} from "../../iconButton/IconXButton";
import React, {useContext, useEffect} from "react";
import {isNumeric, Titles} from "../../../utils";
import {EmptyFieldsPopup} from "../errorPopup/EmptyFieldsPopup";
import {AppContext} from "../../../context";
import {WrongValuePopup} from "../errorPopup/WrongValuePopup";

export const ClientCreationPopup = ({triggerButton, setTriggerButton}) => {

    const {refreshData} = useContext(AppContext);

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [emptyWarningTrigger, setEmptyWarningTrigger] = React.useState(false);
    const [wrongValuesTrigger, setWrongValuesTrigger] = React.useState(false);

    const [validate, setValidate] = React.useState(false);


    const clearValues = () => {
        setName("");
        setEmail("");
        setPhoneNumber("");
    };

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
            id: window.crypto.randomUUID(),
            name: name,
            email: email,
            phoneNumber: phoneNumber
        });
    };

    useEffect(() => {
        if (triggerButton) {
            clearValues();
        }
    }, [triggerButton]);

    return (
        <div>
            <Popup
                open={triggerButton}
                modal
                nested
                closeOnDocumentClick={false}
                onClose={() => {
                    clearValues();
                    refreshData();
                }}
            >
                <div className="popupOverlay">
                    <div className="singleColumnPopUpContainer">

                        <div className="popupHeader">
                            <h3 className="popupTitle">Add New Client</h3>
                            <IconXButton className="closeButton" setTriggerButton={setTriggerButton}/>
                        </div>

                        <div className="gridContainer">

                            <div className="gridItem">
                                <span className="labelField">Enter client name</span>
                                <span className="textField">
                                    <CustomTextField
                                        required={true}
                                        label={"Name"}
                                        setText={setName}
                                        maxLength={32}
                                        validate={validate}
                                    />
                                </span>
                            </div>

                            <div className="gridItem">
                                <span className="labelField">Enter Email</span>
                                <span className="textField">
                                    <CustomTextField
                                        required={true}
                                        label={"Email"}
                                        setText={setEmail}
                                        maxLength={32}
                                        email={true}
                                        validate={validate}
                                    />
                                </span>
                            </div>

                            <div className="gridItem">
                                <span className="labelField">Enter phone number</span>
                                <span className="textField">
                                    <CustomTextField
                                        required={true}
                                        label={"Phone number"}
                                        setText={setPhoneNumber}
                                        maxLength={9}
                                        minLength={9}
                                        numeric={true}
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
                                Save
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
