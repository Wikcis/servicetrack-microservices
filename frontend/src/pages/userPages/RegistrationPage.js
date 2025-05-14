import {CustomButton, CustomTextField, EmptyFieldsPopup, Registered, Sidebar, WrongValuePopup} from "../../components";
import React, {useContext} from "react";
import "../../styles";
import {isAlpha, isNumeric, isValidEmail, Titles} from "../../utils";
import "../../components";
import {useNavigate} from "react-router-dom";
import {registerUser} from "../../api/auth";
import {REST_API_URLS} from "../../api/apiConstants";
import {AlreadyExistingUserPopup} from "../../components/popup/errorPopup/AlreadyExistingUserPopup";
import {CustomPassword} from "../../components";
import {postMethod} from "../../services";
import {AppContext} from "../../context";

export const RegistrationPage = () => {

    const navigate = useNavigate();

    const {register, setRegister} = useContext(AppContext);

    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [repeatPassword, setRepeatPassword] = React.useState("");

    const [emptyWarningTrigger, setEmptyWarningTrigger] = React.useState(false);
    const [wrongValuesTrigger, setWrongValuesTrigger] = React.useState(false);
    const [alreadyExistingUserTrigger, setAlreadyExistingUserTrigger] = React.useState(false);

    const [validate, setValidate] = React.useState(false);

    const handleRegister = async () => {

        if (!firstName || firstName === "" ||
            !lastName || lastName === "" ||
            !email || email === "" ||
            !password || password === "" ||
            !repeatPassword || repeatPassword === "" ||
            !phoneNumber || phoneNumber === "" ||
            password !== repeatPassword
        ) {
            setEmptyWarningTrigger(true);
            return null;
        }

        if (!isAlpha(firstName) ||
            !isAlpha(lastName) ||
            !isNumeric(phoneNumber) ||
            !isValidEmail(email) ||
            password !== repeatPassword
        ) {
            setWrongValuesTrigger(true);
            return null;
        }

        const createdId = await registerUser(firstName, lastName, email.toLowerCase(), password, phoneNumber);

        if (createdId !== null && createdId !== undefined) {
            setRegister(true);

            const technicianBody = JSON.stringify({
                id: window.crypto.randomUUID(),
                userId: createdId,
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
            });

            await postMethod(REST_API_URLS.TECHNICIANS_URL, technicianBody);

            navigate(REST_API_URLS.ONLY_LOGIN_URL);
        } else {
            setAlreadyExistingUserTrigger(true);
            return null;
        }
    };

    return (
        <div className="app">
            <Sidebar withoutData={true}/>
            <div className="mainContainer">
                <div className="credentialsContainer">

                    <div className="credentialsHeader">
                        <h3 className="credentialsText">Welcome to Service Track</h3>
                        <h3 className="credentialsTitle">{" Sign up"}</h3>
                        <h3 className="credentialsDescription">
                            Already have account?
                            <a href={true}
                               className="link"
                               onClick={() => navigate(REST_API_URLS.ONLY_LOGIN_URL)}
                            >
                                {" Sign in"}
                            </a>
                        </h3>
                    </div>

                    <div className="gridItem">
                        <span className="labelField">Enter your first name</span>
                        <span className="textField">
                            <CustomTextField
                                label={"First name"}
                                setText={setFirstName}
                                maxLength={32}
                                alpha={true}
                                required={true}
                                validate={validate}
                            />
                        </span>
                    </div>

                    <div className="gridItem">
                        <span className="labelField">Enter your last name</span>
                        <span className="textField">
                            <CustomTextField
                                label={"Last name"}
                                setText={setLastName}
                                maxLength={32}
                                alpha={true}
                                required={true}
                                validate={validate}
                            />
                        </span>
                    </div>

                    <div className="gridItem">
                        <span className="labelField">Enter your email</span>
                        <span className="textField">
                            <CustomTextField
                                label={"Email"}
                                setText={setEmail}
                                email={true}
                                maxLength={32}
                                required={true}
                                validate={validate}
                            />
                        </span>
                    </div>

                    <div className="gridItem">
                        <span className="labelField">Enter your phone number</span>
                        <span className="textField">
                            <CustomTextField
                                label={"Phone Number"}
                                setText={setPhoneNumber}
                                maxLength={9}
                                minLength={9}
                                numeric={true}
                                required={true}
                                validate={validate}
                            />
                        </span>
                    </div>

                    <div className="gridItem">
                        <span className="labelField">Enter your password</span>
                        <span className="textField">
                            <CustomPassword
                                password={password}
                                setPassword={setPassword}
                                label={"Password"}
                                minLength={9}
                                maxLength={64}
                                required={true}
                                validate={validate}
                            />

                        </span>
                    </div>

                    <div className="gridItem">
                        <span className="labelField">Repeat your password</span>
                        <span className="textField">
                            <CustomPassword
                                password={repeatPassword}
                                setPassword={setRepeatPassword}
                                label={"Repeat Password"}
                                required={true}
                                validate={validate}
                            />
                        </span>
                    </div>

                    <div className="but">
                        <CustomButton
                            className="logInButton"
                            credentials={handleRegister}
                            validate={setValidate}
                            type={Titles.registerTitle}
                        >
                            Register
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

            <AlreadyExistingUserPopup
                triggerButton={alreadyExistingUserTrigger}
                setTriggerButton={setAlreadyExistingUserTrigger}
            />

            <Registered
                triggerButton={register}
                setTriggerButton={setRegister}
            />
        </div>
    );
};

