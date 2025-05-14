import {
    CustomButton,
    CustomPassword,
    CustomTextField,
    EmptyFieldsPopup,
    LoggedIn, Registered,
    Sidebar,
    WrongValuePopup
} from "../../components";
import React, {useContext} from "react";
import "../../styles";
import {Titles} from "../../utils";
import "../../components";
import {loginUser} from "../../api/auth";
import {useNavigate} from "react-router-dom";
import {REST_API_URLS} from "../../api/apiConstants";
import {NotExistingUserPopup} from "../../components/popup/errorPopup/NotExistingUserPopup";
import {AppContext} from "../../context";

export const LoginPage = () => {

    const navigate = useNavigate();

    const {fetchUser, fetchData, setLoggedIn, loggedIn, register, setRegister} = useContext(AppContext);

    const [emptyWarningTrigger, setEmptyWarningTrigger] = React.useState(false);
    const [wrongValuesTrigger, setWrongValuesTrigger] = React.useState(false);
    const [notExistingUserTrigger, setNotExistingUserTrigger] = React.useState(false);

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [validate, setValidate] = React.useState(false);

    const handleLogin = async () => {

        if (email === "" || password === "") {
            setEmptyWarningTrigger(true);
            return null;
        }

        const res = await loginUser(email.toLowerCase(), password);

        if (res) {
            setLoggedIn(true);

            await fetchUser();
            await fetchData();

            navigate(REST_API_URLS.ONLY_TECHNICIANS_URL);
        } else {
            setNotExistingUserTrigger(true);
            return null;
        }
    };

    return (
        <div className="app">
            <Sidebar withoutData={true}/>
            <div className="mainContainer">

                <div className="logInCredentialsContainer">

                    <div className="credentialsHeader">
                        <h3 className="credentialsText">Welcome back to Service Track</h3>
                        <h3 className="credentialsTitle">Sign in</h3>
                        <h3 className="credentialsDescription">
                            Don't have account?
                            <a className="link"
                               href={true}
                               onClick={() => navigate(REST_API_URLS.ONLY_REGISTRATION_URL)}
                            >
                                {" Sign up"}
                            </a>
                        </h3>
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
                        <span className="labelField">Enter your password</span>
                        <span className="textField">
                            <CustomPassword
                                password={password}
                                setPassword={setPassword}
                                label={"Password"}
                                required={true}
                                validate={validate}
                                minLength={9}
                                maxLength={64}
                            />
                        </span>
                    </div>

                    <div className="but">
                        <CustomButton
                            className="logInButton"
                            type={Titles.loginTitle}
                            credentials={handleLogin}
                            validate={setValidate}
                        >
                            Log in
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

            <NotExistingUserPopup
                triggerButton={notExistingUserTrigger}
                setTriggerButton={setNotExistingUserTrigger}
            />

            <LoggedIn
                triggerButton={loggedIn}
                setTriggerButton={setLoggedIn}
            />

            <Registered
                triggerButton={register}
                setTriggerButton={setRegister}
            />
        </div>
    );
};

