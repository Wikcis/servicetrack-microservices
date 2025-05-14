import Popup from "reactjs-popup";
import {CustomTextField} from "../../textField/CustomTextField";
import {CustomButton} from "../../button/CustomButton";
import React, {useContext} from "react";
import {IconXButton} from "../../iconButton/IconXButton";
import {isAlpha, isNumeric, Titles} from "../../../utils";
import {EmptyFieldsPopup} from "../errorPopup/EmptyFieldsPopup";
import {AppContext} from "../../../context";
import {WrongValuePopup} from "../errorPopup/WrongValuePopup";

export const TechnicianEditionPopup = ({triggerButton, setTriggerButton, row}) => {

    const {refreshData} = useContext(AppContext);

    const [id, setId] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [emptyWarningTrigger, setEmptyWarningTrigger] = React.useState(false);
    const [wrongValuesTrigger, setWrongValuesTrigger] = React.useState(false);
    const [validate, setValidate] = React.useState(false);

    React.useEffect(() => {
        if (row) {
            setId(row.original.id || "");
            setFirstName(row.original.firstName || "");
            setLastName(row.original.lastName || "");
            setEmail(row.original.email || "");
            setPhoneNumber(row.original.phoneNumber || "");
        }
    }, [row]);

    const createRequestBody = () => {

        if (!isAlpha(firstName) || !isAlpha(lastName) || !isNumeric(phoneNumber)) {
            setWrongValuesTrigger(true);
            return null;
        }

        if (firstName === "" || lastName === "" || email === "" || phoneNumber === "") {
            setEmptyWarningTrigger(true);
            return null;
        }

        return JSON.stringify({
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
        });
    }

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
                            <h3 className="popupTitle">Edit Technician</h3>
                            <IconXButton className="closeButton" setTriggerButton={setTriggerButton}/>
                        </div>

                        <div className="gridContainer">
                            <div className="gridItem">
                                <span className="labelField">Enter first name</span>
                                <span className="textField">
                                    <CustomTextField
                                        label={"First Name"}
                                        value={firstName}
                                        setText={setFirstName}
                                        maxLength={24}
                                        alpha={true}
                                        required={true}
                                        validate={validate}
                                    />
                                </span>

                            </div>

                            <div className="gridItem">
                                <span className="labelField">Enter last name</span>
                                <span className="textField">
                                    <CustomTextField
                                        label={"Last Name"}
                                        value={lastName}
                                        setText={setLastName}
                                        maxLength={32}
                                        alpha={true}
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
                                        value={email}
                                        setText={setEmail}
                                        maxLength={32}
                                        email={true}
                                        disabled={true}
                                        required={true}
                                    />
                                </span>
                            </div>

                            <div className="gridItem">
                                <span className="labelField">Enter phone number</span>
                                <span className="textField">
                                    <CustomTextField
                                        label={"Phone number"}
                                        value={phoneNumber}
                                        setText={setPhoneNumber}
                                        maxLength={9}
                                        minLength={9}
                                        numeric={true}
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
                                type={Titles.techniciansPageTitle}
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
