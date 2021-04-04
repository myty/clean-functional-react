import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC<{}> = () => {
    return (
        <div>
            <div className="text-center">
                <h1 className="text-7xl pt-24 pb-4 px-4 subpixel-antialiased font-semibold">
                    Clean Hooks
                </h1>
                <h1 className="text-7xl text-gray-700 pt-4 pb-24  px-4 subpixel-antialiased font-semibold">
                    Examples
                </h1>
            </div>
            <div className="flex flex-row justify-around">
                <Link
                    className="hover:font-semibold hover:underline py-4 px-8 hover:bg-red-200 rounded"
                    to="/bad">
                    Bad
                </Link>
                <Link
                    className="hover:font-semibold hover:underline py-4 px-8 hover:bg-green-200 rounded"
                    to="/good">
                    Good
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
