import React from "react";
import "./title.css"

export const Title = ({children}) => {

    return (
        <div className="titleContainer">
            <div className="contentNameContainer">
                <span>{children}</span>
                <hr className="contentNameLine"/>
            </div>
        </div>
    )
};

