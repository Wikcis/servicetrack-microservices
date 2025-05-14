import React from "react";
import {Checkbox, ThemeProvider} from "@mui/material";
import {Theme} from "../../utils";

export const CustomCheckbox = () => {

    return (
        <ThemeProvider theme={Theme}>
            <Checkbox color="primary"/>
        </ThemeProvider>
    )
}