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
    }, []);

    return (
        <div className="userBarContainer">
            <div className="userWithIconContainer">
                <div className="userInfoContainer">
                    <span>
                        {user?.role === "USER" ? "Technician: " : null}
                        <span className="userNameContainer">
                            {user.firstName} {user.lastName}
                        </span>
                    </span>
                    {user?.role === "USER" ?
                        <span>phone number:
                            <span className="phoneNumber">
                                {user.phoneNumber}
                            </span>
                        </span> : null}
                </div>
                <ProfilePageIcon
                    className="profileIcon"
                    onClick={() => navigate(REST_API_URLS.ONLY_PROFILE_URL)}
                />
            </div>
            <Title>{title}</Title>
        </div>
    )
};

