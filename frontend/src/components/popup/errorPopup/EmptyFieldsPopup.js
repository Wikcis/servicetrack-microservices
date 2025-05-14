import Popup from "reactjs-popup";
import {IconXButton} from "../../iconButton/IconXButton";
import React from "react";

export const EmptyFieldsPopup = ({triggerButton, setTriggerButton}) => {

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
                            <h3 className="emptyFieldsPopupTitle">Empty values</h3>
                            <IconXButton className="closeButton" setTriggerButton={setTriggerButton}/>
                        </div>

                        <span className="emptyFieldsLabelField">
                            Some fields are empty. <br/>
                            Fill them to add an object.
                        </span>

                    </div>
                </div>
            </Popup>
        </div>
    );
};
