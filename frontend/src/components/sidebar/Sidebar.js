import {Logo} from "../../assets";
import {SidebarData} from "./SidebarData";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AppContext} from "../../context";

export const Sidebar = ({withoutData}) => {

    const {user} = useContext(AppContext);

    const navigate = useNavigate();
    const currentPath = window.location.pathname;

    return (
        <div className="sidebar">
            <div className="logoContainer">
                <Logo/>
            </div>
            <ul className="sidebarList">
                {!withoutData
                    ? SidebarData(user?.role).map((item, index) => {
                        const isActive = currentPath === item.link;

                        return (
                            <li
                                className={`row ${isActive ? "active" : ""}`}
                                key={index}
                                onClick={() => navigate(item.link)}
                            >
                                <div id="icon">
                                    {isActive ? item.primaryIcon : item.icon}
                                </div>
                                <div id="title">{item.title}</div>
                                {isActive && <div className="ellipse"/>}
                            </li>
                        );
                    })
                    : null}
            </ul>
        </div>
    );
};

