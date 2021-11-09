import React, { useState, Fragment } from "react";
import { NavLink } from "react-router-dom";


//redux
import { useSelector } from "react-redux";

//추천 페이지
function RecommendNav(props) {
    
    const { menuItems } = useSelector((state) => state.menu); // 전체 메뉴 아이템
    const [menuPath, setMenuPath] = useState(""); // 자식 메뉴 오픈 여부
    const user = useSelector(state => state.user);
    
    const { RecommendMenuItems } = useSelector((state) => state.menu); // 전체 메뉴 아이템
    console.log(menuItems);
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
                <div>
                    <div className="headerNav__items">
                        {RecommendMenuItems && RecommendMenuItems.map((item) => (
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
                               
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}



export default RecommendNav

