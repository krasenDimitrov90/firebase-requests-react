import React from "react";
import Navigation from "./Navigation";

const Layout = (props) => {
    console.log('In Layout');
    return (
        <>
            <Navigation />
            <main>{props.children}</main>
        </>
    );
};

export default Layout;