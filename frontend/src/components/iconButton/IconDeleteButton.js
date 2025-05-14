import React, {useContext} from "react";
import {IconButton, ThemeProvider} from "@mui/material";
import {Theme, Titles} from "../../utils";
import {BinIcon} from "../../assets";
import {deleteMethod} from "../../services";
import {AppContext, REST_API_URLS} from "../../context";

export const IconDeleteButton = ({type, row}) => {

    const {refreshData} = useContext(AppContext);

    const deleteItem = async () => {
        try {
            if (type === Titles.techniciansPageTitle) {
                await deleteMethod(REST_API_URLS.TECHNICIANS_URL + "/" + row.original.id);
            } else if (type === Titles.clientsPageTitle) {
                await deleteMethod(REST_API_URLS.CLIENTS_URL + "/" + row.original.id);
            } else if (type === Titles.serviceOrdersPageTitle) {
                await deleteMethod(REST_API_URLS.SERVICEORDERS_URL + "/" + row.original.id);
            } else if (type === Titles.userServiceOrdersPageTitle) {
                await deleteMethod(REST_API_URLS.SERVICEORDERS_URL + "/" + row.original.id);
            }
            console.log("Item deleted successfully: ");
        } catch (error) {
            console.error("Error deleting item: ",  error);
        }
        console.log("Usunięte: ")
        refreshData();
    };

    return (
        <ThemeProvider theme={Theme}>
            <IconButton size="small" onClick={deleteItem}>
                <BinIcon/>
            </IconButton>
        </ThemeProvider>
    );
};
