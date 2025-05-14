import Popup from "reactjs-popup";
import {CustomButton} from "../button/CustomButton";
import {IconXButton} from "../iconButton/IconXButton";
import React, {useContext} from "react";
import {generateCSVForRange, Titles} from "../../utils";
import {EmptyFieldsPopup} from "./errorPopup/EmptyFieldsPopup";
import {AppContext} from "../../context";
import dayjs from "dayjs";
import {CustomDatepicker} from "../datepicker/CustomDatepicker";

export const TimeRangePopup = ({triggerButton, setTriggerButton}) => {

    const {filteredServiceOrders, user} = useContext(AppContext);

    const [startDate, setStartDate] = React.useState(dayjs());
    const [endDate, setEndDate] = React.useState(dayjs().add(1, 'day'));

    const [emptyWarningTrigger, setEmptyWarningTrigger] = React.useState(false);

    const clearValues = () => {
        setStartDate("");
        setEndDate("");
    };

    const filterData = () => {
        return filteredServiceOrders.filter((item) => {
            const date = new Date(item.dateTimeOfService);

            console.log("Start: " + startDate + " End: " + endDate + " date: " + date);

            return (
                date >= new Date(new Date(startDate).setHours(0, 0, 0, 1)) &&
                date <= new Date(new Date(endDate).setHours(23, 59, 59, 999))
            );
        });
    };

    return (
        <div>
            <Popup
                open={triggerButton}
                modal
                nested
                closeOnDocumentClick={false}
                onClose={() => {
                    clearValues();
                }}
            >
                <div className="popupOverlay">
                    <div className="singleColumnPopUpContainer">

                        <div className="popupHeader">
                            <h3 className="popupTitle">Select Time Range</h3>
                            <IconXButton className="closeButton" setTriggerButton={setTriggerButton}/>
                        </div>

                        <div className="gridContainer">

                            <div className="gridItem">
                                <span className="labelField">Enter beginning of time range</span>
                                <CustomDatepicker
                                    className="popUpDatepicker"
                                    title="Start Date"
                                    onSelectedDate={setStartDate}
                                    minDate={dayjs("2020-01-01")}
                                    maxDate={dayjs("2035-12-31")}
                                    value={dayjs()}
                                />
                            </div>

                            <div className="gridItem">
                                <span className="labelField">Enter ending of time range</span>
                                <CustomDatepicker
                                    className="popUpDatepicker"
                                    title="End Date"
                                    onSelectedDate={setEndDate}
                                    minDate={dayjs("2020-01-01")}
                                    maxDate={dayjs("2035-12-31")}
                                    value={dayjs().add(1, 'day')}
                                />
                            </div>

                        </div>

                        <div className="buttonContainer">
                            <CustomButton
                                className="saveButton"
                                setTriggerButton={setTriggerButton}
                                generateCSV={generateCSVForRange}
                                data={filterData}
                                user={user}
                                type={Titles.profileTitle}
                            >
                                Save
                            </CustomButton>
                        </div>

                    </div>
                </div>

                <EmptyFieldsPopup
                    triggerButton={emptyWarningTrigger}
                    setTriggerButton={setEmptyWarningTrigger}
                />
            </Popup>
        </div>
    );
};
