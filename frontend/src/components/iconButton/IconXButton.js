import React from "react";
import {IconButton, ThemeProvider} from "@mui/material";
import {Theme} from "../../utils";
import {XIcon} from "../../assets";

export const IconXButton = ({ setTriggerButton }) => {

    const handleClick = () => {
        setTriggerButton((prev) => !prev);
    };

    return (
        <ThemeProvider theme={Theme}>
            <IconButton
                size="small"
                onClick={handleClick}
            >
                <XIcon />
            </IconButton>
        </ThemeProvider>
    );
};
