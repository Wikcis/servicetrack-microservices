import Popup from "reactjs-popup";
import {IconXButton} from "../iconButton/IconXButton"
import React from "react";

export const LoggedIn = ({triggerButton, setTriggerButton}) => {

    return (
        <div>
            <Popup
                open={triggerButton}
                modal
                nested
                closeOnDocumentClick={false}
            >
                <div className="emptyFieldsPopupOverlay">
                    <div className="emptyFieldsPopupContainer">
                        <div className="popupHeader">
                            <h3 className="success">Success</h3>
                            <IconXButton className="closeButton" setTriggerButton={setTriggerButton}/>
                        </div>

                        <span className="emptyFieldsLabelField">
                            You are successfully logged in
                        </span>

                    </div>
                </div>
            </Popup>
        </div>
    );
};
