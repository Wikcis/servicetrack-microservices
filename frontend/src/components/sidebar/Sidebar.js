import {Logo} from "../../assets";
import {SidebarData} from "./SidebarData";
import {useNavigate, useLocation} from "react-router-dom";
import {useContext} from "react";
import {AppContext} from "../../context";

export const Sidebar = ({withoutData}) => {
    const {user} = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <aside className="sidebar">
            <div className="logoContainer">
                <Logo/>
            </div>
            <ul className="sidebarList">
                {!withoutData && SidebarData(user?.role).map((item, index) => {
                    const isActive = location.pathname === item.link;

                    return (
                        <li
                            className={`sidebarItem ${isActive ? "active" : ""}`}
                            key={index}
                            onClick={() => navigate(item.link)}
                        >
                            <div className="icon">
                                {isActive ? item.primaryIcon : item.icon}
                            </div>
                            <div className="title">{item.title}</div>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};