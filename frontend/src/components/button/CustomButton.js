import React, {useContext} from "react";
import {Button, ThemeProvider} from "@mui/material";
import {logout, Theme, Titles} from "../../utils";
import {postMethod, updateMethod} from "../../services";
import {REST_API_URLS} from "../../api/apiConstants";
import {useNavigate} from "react-router-dom";
import {AppContext} from "../../context";

export const CustomButton = ({ validate = () => [], children, className, setTriggerButton, icon, requestBody, type, generateCSV = () => [], data = () => [], credentials = () => [], user}) => {

    const navigate = useNavigate();

    const {selectedRow} = useContext(AppContext);

    const handleClick = async () => {

        if (requestBody && children === "Update") {

            const requestData = requestBody();

            if(!requestData) {
                return null
            }

            switch (type) {
                case Titles.techniciansPageTitle:
                    await updateMethod(REST_API_URLS.TECHNICIANS_URL+"/"+selectedRow.original.id, requestData);
                    break;
                case Titles.clientsPageTitle:
                    await updateMethod(REST_API_URLS.CLIENTS_URL+"/"+selectedRow.original.id, requestData);
                    break;
                case Titles.serviceOrdersPageTitle:
                    await updateMethod(REST_API_URLS.SERVICEORDERS_URL+"/"+selectedRow.original.id, requestData);
                    break;
                case Titles.userServiceOrdersPageTitle:
                    await updateMethod(REST_API_URLS.SERVICEORDERS_URL+"/"+selectedRow.original.id, requestData);
                    break;
                default:
                    break;
            }
        }else if (requestBody) {

            validate(true);

            const requestData = requestBody();

            if(!requestData) {
                return null
            }
            validate(false);
            switch (type) {
                case Titles.techniciansPageTitle:
                    await postMethod(REST_API_URLS.TECHNICIANS_URL, requestData);
                    break;
                case Titles.clientsPageTitle:
                    await postMethod(REST_API_URLS.CLIENTS_URL, requestData);
                    break;
                case Titles.serviceOrdersPageTitle:
                    await postMethod(REST_API_URLS.SERVICEORDERS_URL, requestData);
                    break;
                case Titles.userServiceOrdersPageTitle:
                    await postMethod(REST_API_URLS.SERVICEORDERS_URL, requestData);
                    break;
                default:
                    break;
            }
        } else if (type === Titles.profileTitle) {
            const tmp = data();

            generateCSV(tmp, user);
        } else if (type === Titles.loginTitle || type === Titles.registerTitle) {
            validate(true);
            credentials();
            validate(false);
            return;
        } else if (type === Titles.logOutTitle) {

            await logout();
            navigate(REST_API_URLS.ONLY_LOGIN_URL, {replace: true});

            navigate(0);
            return;
        }

        setTriggerButton((prev) => !prev);
    };

    return (
        <ThemeProvider theme={Theme}>
            <Button
                className={className}
                variant="contained"
                startIcon={icon}
                color="primary"
                onClick={handleClick}
                sx={{
                    fontSize: {
                        xs: '10px',
                        sm: '15px',
                    },
                }}
            >
                {children}
            </Button>
        </ThemeProvider>
    );
};
