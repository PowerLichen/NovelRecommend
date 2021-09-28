import React, { useState, Fragment } from "react";
import { NavLink } from "react-router-dom";

import logo from "../../images/logo.png";
import HeaderNavDepth1 from "./HeaderNavDepth1";

//redux
import { useSelector } from "react-redux";

const HeaderNav = () => {
    const { menuItems } = useSelector((state) => state.menu); // 전체 메뉴 아이템
    const [menuPath, setMenuPath] = useState(""); // 자식 메뉴 오픈 여부

    // Open Menu
    const handleMouseEnter = (path) => {
        setMenuPath(path);
    };

    // Close Menu
    const handleMouseLeave = () => {
        setMenuPath("");
    };

    return (
        <div className="headerNav" onMouseLeave={handleMouseLeave}>
            <div className="_container">
                <NavLink to="/">
                    <img src={logo} alt="logo" /> 리액트
                </NavLink>

                <div>
                    <div className="headerNav__items">
                        {menuItems.map((item) => (
                            <Fragment key={item.path}>
                                <NavLink
                                    to={item.path}
                                    activeClassName="active"
                                    onMouseEnter={() =>
                                        handleMouseEnter(item.path)
                                    }
                                >
                                    {item.name}
                                </NavLink>
                                {item.path === menuPath && item.children && (
                                    <HeaderNavDepth1 menuItem={item} />
                                )}
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderNav;
