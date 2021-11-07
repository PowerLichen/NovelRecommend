import React, { useState,} from "react";
import { NavLink } from "react-router-dom";
import history from "../../history";
import Genre from '../views/GenrePage/GenrePage'

function HeaderNavDepth2({ menuItem }) {
    const children = menuItem.children || [];
    const [genre, setgenre] =useState('');

    const handleAddMenu = () => {
        history.push("/nav?depth2=" + menuItem.path);
    };
    const OnMouseClick = (value) => {
        setgenre(value);
        console.log(value)
        console.log(genre)
    };
    
    return (
        <div className="headerNavDepth2">
            <div className="headerNavDepth2__items">
                {children.map((item) => (
                    
                    <NavLink
                        key={item.path}
                        to={item.path}
                        
                        activeClassName="active"
                        onClick={() =>
                            OnMouseClick(item.value)
                        }
                    >
                        {item.name}
                    </NavLink>
                ))}
                
                <i
                    className="fas fa-plus-circle"
                    onClick={() => handleAddMenu()}
                ></i>
            </div>
            <div>
            {/* <Genre genrez={genre} /> */}
        </div>
        </div>
        
        
    );
}

export default React.memo(HeaderNavDepth2);
