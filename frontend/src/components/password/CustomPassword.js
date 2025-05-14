import { Theme } from "../../utils";
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    FormHelperText,
    ThemeProvider
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { colors } from "../../constants";
import React, { useState, useEffect } from "react";

export const CustomPassword = ({ password, setPassword, label, required, validate }) => {

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState("");

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validatePassword = (inputValue) => {
        if (required && !inputValue) {
            setError(true);
            setHelperText("This field is required");
            return;
        }

        if (inputValue.length < 5) {
            setError(true);
            setHelperText("Password must be at least 5 characters long");
            return;
        }

        setError(false);
        setHelperText("");
    };

    const handleChange = (event) => {
        const inputValue = event.target.value;
        setPassword(inputValue);
        validatePassword(inputValue);
    };

    useEffect(() => {
        if (validate) {
            validatePassword(password);
        }
    }, [validate]);

    return (
        <ThemeProvider theme={Theme}>
            <FormControl variant="outlined" error={error} fullWidth required={required}>
                <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
                <OutlinedInput
                    id={error ? "outlined-adornment-error-helper-text" : "outlined-adornment-password"}
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handleChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={showPassword ? 'hide the password' : 'display the password'}
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? (
                                    <Visibility style={{ color: colors.primary }} />
                                ) : (
                                    <VisibilityOff style={{ color: colors.primary }} />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                    label={label}
                    variant="outlined"
                    inputProps={{ maxLength: 64, minLength: 5 }}
                />
                {error && <FormHelperText>{helperText}</FormHelperText>}
            </FormControl>
        </ThemeProvider>
    );
};
