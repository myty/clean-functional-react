import React from "react";
import { NavLink } from "react-router-dom";

const PageNavigation: React.FC<{}> = () => {
    return (
        <div className="w-full p-2 text-center bg-gray-200 border-b-2 border-gray-200">
            <NavLink
                className="px-2 hover:underline"
                activeClassName="underline font-semibold"
                to={"/bad"}>
                Bad
            </NavLink>
            <NavLink
                className="px-2 hover:underline"
                activeClassName="underline font-semibold"
                to={"/good"}>
                Good
            </NavLink>
        </div>
    );
};

export default PageNavigation;
