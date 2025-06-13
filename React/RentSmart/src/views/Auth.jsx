import React from "react";
import Header from "../components/Header";
import Form from "../components/Form"

function Auth(){
    return(
    <>
    <Header class="header-auth"/>
    <Form route="/login" name="Login" inputs={[{name: "Name", type:"text"}]}/>
    </>
)
}

export default Auth;