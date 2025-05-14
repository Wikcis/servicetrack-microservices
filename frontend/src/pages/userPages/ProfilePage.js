import {ClientSelectionPopup, CustomButton, Sidebar, TimeRangePopup, UserBar} from "../../components";
import React, {useContext, useEffect, useState} from "react";
import "../../styles";
import {Titles} from "../../utils";
import "../../components";
import {AppContext} from "../../context";

export const ProfilePage = () => {

    const {fetchData, user} = useContext(AppContext);

    const [triggerButtonForTime, setTriggerButtonForTime] = useState(false);
    const [triggerButtonForClient, setTriggerButtonForClient] = useState(false);


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="app">
            <Sidebar/>
            <div className="mainContainer">
                <UserBar title={Titles.profileTitle}/>

                <div className={"profileContentContainer"}>
                    <div className="gridContainer">

                        <div className="gridItem">
                            <span className="labelField">First name</span>
                            <span className="textField">{user.firstName}</span>
                        </div>

                        <div className="gridItem">
                            <span className="labelField">Last name</span>
                            <span className="textField">{user.lastName}</span>
                        </div>

                        <div className="gridItem">
                            <span className="labelField">Phone number</span>
                            <span className="textField">{user.phoneNumber}</span>
                        </div>

                        <div className="gridItem">
                            <span className="labelField">Email</span>
                            <span className="textField">{user.email}</span>
                        </div>
                    </div>


                    <div className="profileButtonContainer">
                        <CustomButton
                            className="profileButton"
                            setTriggerButton={setTriggerButtonForTime}
                        >
                            Generate Report in given time range
                        </CustomButton>

                        <CustomButton
                            className="profileButton"
                            setTriggerButton={setTriggerButtonForClient}
                        >
                            Generate Report for specific Client
                        </CustomButton>

                        <CustomButton
                            className="logOutButton"
                            type={Titles.logOutTitle}
                        >
                            {Titles.logOutTitle}
                        </CustomButton>
                    </div>
                </div>


            </div>

            <TimeRangePopup
                triggerButton={triggerButtonForTime}
                setTriggerButton={setTriggerButtonForTime}
            />

            <ClientSelectionPopup
                triggerButton={triggerButtonForClient}
                setTriggerButton={setTriggerButtonForClient}
            />
        </div>
    );
};