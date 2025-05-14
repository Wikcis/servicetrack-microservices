import Popup from "reactjs-popup";
import {IconXButton} from "../../iconButton/IconXButton";
import React from "react";

export const AlreadyExistingUserPopup = ({triggerButton, setTriggerButton}) => {

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
                            User with this email already exists.
                        </span>

                    </div>
                </div>
            </Popup>
        </div>
    );
};
