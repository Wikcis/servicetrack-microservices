import Popup from "reactjs-popup";
import {IconXButton} from "../../iconButton/IconXButton";
import React from "react";

export const WrongValuePopup = ({triggerButton, setTriggerButton}) => {

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
                            <h3 className="emptyFieldsPopupTitle">Wrong values</h3>
                            <IconXButton className="closeButton" setTriggerButton={setTriggerButton}/>
                        </div>

                        <span className="emptyFieldsLabelField">
                            Fields contain incorrect values. <br/>
                            Fill them with valid input to add an object.
                        </span>

                    </div>
                </div>
            </Popup>
        </div>
    );
};
