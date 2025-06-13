import React from "react";
import logo from "../assets/logo.svg"

function Header(props){
    return(
    <header className={props.class}>
        <img src={logo} alt="logo" />
        <h1>RentSmart</h1>
    </header>
    )
}

export default Header;