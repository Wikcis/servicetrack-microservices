import { TextField, ThemeProvider } from "@mui/material";
import { isAlpha, isNumeric, isValidEmail, Theme } from "../../utils";
import React, { useState, useEffect } from "react";

export const CustomTextField = ({
                                    label, setText, maxLength, alpha, numeric, email, value, disabled, minLength, required, validate
                                }) => {
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState("");
    const [localText, setLocalText] = useState(value || "");

    const validateInput = (inputValue) => {
        if (required && !inputValue) {
            setError(true);
            setHelperText("This field is required.");
            return false;
        }

        if (alpha && !isAlpha(inputValue)) {
            setError(true);
            setHelperText("Only alphabetic characters are allowed.");
            return false;
        }

        if (numeric && !isNumeric(inputValue)) {
            setError(true);
            setHelperText("Only numeric characters are allowed.");
            return false;
        }

        if (email && !isValidEmail(inputValue)) {
            setError(true);
            setHelperText("Invalid email format.");
            return false;
        }

        if (minLength && inputValue.length < minLength) {
            setError(true);
            setHelperText(`Must be at least ${minLength} characters.`);
            return false;
        }

        setError(false);
        setHelperText("");
        return true;
    };

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setLocalText(inputValue);
        setText(inputValue);
        validateInput(inputValue);
    };

    const handleBlur = () => {
        validateInput(localText);
    };

    useEffect(() => {
        if (validate) {
            validateInput(localText);
        }
    }, [validate]);

    return (
        <ThemeProvider theme={Theme}>
            <TextField
                required={required}
                id={error ? "outlined-error-helper-text" : "outlined-basic"}
                onChange={handleInputChange}
                onBlur={handleBlur}
                variant="outlined"
                value={localText}
                fullWidth
                label={label}
                color="primary"
                error={error}
                helperText={helperText}
                inputProps={{ maxLength, minLength }}
                disabled={disabled}
            />
        </ThemeProvider>
    );
};
