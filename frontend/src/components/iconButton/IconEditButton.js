import React, {useContext} from "react";
import {IconButton, ThemeProvider} from "@mui/material";
import {Theme} from "../../utils";
import {EditIcon} from "../../assets";
import {AppContext} from "../../context";

export const IconEditButton = ({ row }) => {

    const {setEditionTrigger, setSelectedRow} = useContext(AppContext);

    const editItem = () => {
       setSelectedRow(row);
       setEditionTrigger(true);
    };

    return (
        <ThemeProvider theme={Theme}>
            <IconButton size="small" onClick={editItem}>
                <EditIcon/>
            </IconButton>
        </ThemeProvider>
    )
}