import { FormControl, InputLabel, MenuItem, Select, ThemeProvider, FormHelperText } from "@mui/material";
import { Theme, Titles } from "../../utils";
import { useState, useEffect } from "react";

export const DropDownList = ({
                                 columns, onSelectColumn, title, className, value, data, required, validate
                             }) => {
    const formattedValue =
        value && title !== Titles.technicianNameTitle && title !== Titles.clientNameTitle
            ? { Header: value, accessor: String(value).toUpperCase().replace(/\s+/g, "_") }
            : { Header: data?.find(obj => value === obj.accessor), accessor: value };

    const validValues = columns.map((item) => item.accessor);
    const defaultSelectedColumn = validValues.includes(formattedValue?.accessor)
        ? formattedValue?.accessor
        : "";

    const [selectedColumn, setSelectedColumn] = useState(defaultSelectedColumn);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!validValues.includes(selectedColumn)) {
            setSelectedColumn("");
        }
    }, [columns, selectedColumn]);

    const validateSelection = (value) => {
        if (required) {
            setError(!value);
        }
    };

    const handleChange = (event) => {
        const valueToChange = event.target.value;
        setSelectedColumn(valueToChange);
        onSelectColumn(valueToChange);
        validateSelection(valueToChange);
    };

    const handleBlur = () => {
        validateSelection(selectedColumn);
    };

    useEffect(() => {
        if (validate) {
            validateSelection(selectedColumn);
        }
    }, [validate]);

    return (
        <ThemeProvider theme={Theme}>
            <FormControl className={className} error={error} required={required}>
                <InputLabel id="demo-simple-select-label">{title}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedColumn || ""}
                    label={title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                >
                    {columns.map((item, index) => (
                        item !== "" && (
                            <MenuItem key={index} value={item.accessor}>
                                {item.Header}
                            </MenuItem>
                        )
                    ))}
                </Select>
                {error && <FormHelperText>This field is required</FormHelperText>}
            </FormControl>
        </ThemeProvider>
    );
};
