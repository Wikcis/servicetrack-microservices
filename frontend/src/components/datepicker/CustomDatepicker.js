import {ThemeProvider} from "@mui/material";
import {Theme} from "../../utils"
import React, {useState} from "react";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/en-gb';
import dayjs from "dayjs";

export const CustomDatepicker = ({onSelectedDate, title, className, minDate, maxDate, value}) => {

    const [selectedDate, setSelectedDate] = useState(dayjs(Date.parse(value)) || dayjs());

    const handleChange = (date) => {
        setSelectedDate(date);
        onSelectedDate(date);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
            <ThemeProvider theme={Theme}>
                <DatePicker
                    className={className}
                    label={title}
                    onChange={handleChange}
                    value={selectedDate}
                    minDate={minDate}
                    maxDate={maxDate}
                />
            </ThemeProvider>
        </LocalizationProvider>
    )
}