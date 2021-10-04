import React from "react";
import { NavLink } from "react-router-dom";
import history from "../../history";

function HeaderNavDepth2({ menuItem }) {
    const children = menuItem.children || [];

    const handleAddMenu = () => {
        history.push("/nav?depth2=" + menuItem.path);
    };

    return (
        <div className="headerNavDepth2">
            <div className="headerNavDepth2__items">
                {children.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        activeClassName="active"
                    >
                        {item.name}
                    </NavLink>
                ))}
                <i
                    className="fas fa-plus-circle"
                    onClick={() => handleAddMenu()}
                ></i>
            </div>
        </div>
    );
}

export default React.memo(HeaderNavDepth2);
