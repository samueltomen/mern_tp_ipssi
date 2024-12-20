import React from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation } from "react-router-dom";

const Wrapper = ({ children }) => {
    const location = useLocation();
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default Wrapper;