import Popup from "reactjs-popup";
import {IconXButton} from "../../iconButton/IconXButton";
import React from "react";

export const NotExistingUserPopup = ({triggerButton, setTriggerButton}) => {

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
                            <h3 className="emptyFieldsPopupTitle">Error</h3>
                            <IconXButton className="closeButton" setTriggerButton={setTriggerButton}/>
                        </div>

                        <span className="emptyFieldsLabelField">
                            User with this email doesn't exists.<br/>
                            Register your account to use app.
                        </span>

                    </div>
                </div>
            </Popup>
        </div>
    );
};
