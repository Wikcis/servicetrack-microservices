import React from "react";
import {IconEditButton} from "./IconEditButton";
import {IconDeleteButton} from "./IconDeleteButton";

export const EditDeleteIconButtonsContainer = ({ type, row }) => {

    return (
        <div className="iconButton">
            <IconEditButton type={type} row={row} />
            <IconDeleteButton type={type} row={row}/>
        </div>
    )
}
