import {TextField, ThemeProvider} from "@mui/material";
import {Theme} from "../../utils"

export const Searchbar = ({ onSearch }) => {

    const handleInputChange = (e) => {
        const textToLowerCase = e.target.value.toLowerCase();

        onSearch(textToLowerCase);
    }

    return (
        <div className="searchbarInput">
            <ThemeProvider theme={Theme}>
                <TextField className="searchbar"
                           id="outlined-basic"
                           onChange={handleInputChange}
                           variant="outlined"
                           fullWidth
                           label="Search"
                           color="primary"
                />
            </ThemeProvider>
        </div>

    )
}