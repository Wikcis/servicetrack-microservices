import { ThemeProvider } from "@mui/material";
import { Theme } from "../../utils";
import React, { useState, useEffect } from "react";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormHelperText, FormControl } from "@mui/material";
import 'dayjs/locale/en-gb';
import dayjs from "dayjs";

export const CustomTimePicker = ({ onSelectedTime, title, className, value, required, validate }) => {
    const [selectedTime, setSelectedTime] = useState(value ? dayjs(value, "HH:mm") : null);
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState("");

    const validateTime = (time) => {
        if (required && !time) {
            setError(true);
            setHelperText("This field is required");
            return false;
        }
        setError(false);
        setHelperText("");
        return true;
    };

    const handleChange = (time) => {
        setSelectedTime(time);
        if (time) {
            onSelectedTime(time.format("HH:mm:ss"));
        }
        validateTime(time);
    };

    useEffect(() => {
        if (validate) {
            validateTime(selectedTime);
        }
    }, [validate]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
            <ThemeProvider theme={Theme}>
                <FormControl className={className} error={error} required={required} fullWidth>
                    <TimePicker
                        label={title}
                        value={selectedTime}
                        onChange={handleChange}
                        format="HH:mm"
                    />
                    {error && <FormHelperText>{helperText}</FormHelperText>}
                </FormControl>
            </ThemeProvider>
        </LocalizationProvider>
    );
};
