import React, {useContext, useEffect} from "react";
import {Title} from "../title/Title";
import {AppContext, REST_API_URLS} from "../../context";
import {ProfilePageIcon} from "../../assets";
import {useNavigate} from "react-router-dom";

export const UserBar = ({title}) => {
    const navigate = useNavigate();
    const {user, fetchUser} = useContext(AppContext);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <header className="userBarContainer">
            <div className="titleContainer">
                <Title>{title}</Title>
            </div>

            {user && (
                <div className="userWithIconContainer">
                    <div className="userInfoContainer">
                        <span className="userRoleText">
                            {user.role === "USER" && "Technician: "}
                            <span className="userNameContainer">
                                {user.firstName} {user.lastName}
                            </span>
                        </span>

                        {user.role === "USER" && user.phoneNumber && (
                            <span className="userPhoneText">
                                phone number:
                                <span className="phoneNumber">{user.phoneNumber}</span>
                            </span>
                        )}
                    </div>

                    <div
                        className="profileIconWrapper"
                        onClick={() => navigate(REST_API_URLS.ONLY_PROFILE_URL)}
                    >
                        <ProfilePageIcon className="profileIcon" />
                    </div>
                </div>
            )}
        </header>
    );
};