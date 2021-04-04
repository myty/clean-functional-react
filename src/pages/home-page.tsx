import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC<{}> = () => {
    return (
        <div>
            <div className="text-center">
                <h1 className="px-4 pt-24 pb-4 subpixel-antialiased font-semibold text-7xl">
                    Clean Hooks
                </h1>
                <div className="mx-auto w-36">
                    <hr />
                </div>
                <h1 className="px-4 pt-4 pb-24 text-5xl subpixel-antialiased font-semibold text-gray-700">
                    Examples
                </h1>
            </div>
            <div className="flex flex-row justify-around">
                <Link
                    className="px-8 py-4 rounded hover:font-semibold hover:underline hover:bg-red-200"
                    to="/bad">
                    Bad
                </Link>
                <Link
                    className="px-8 py-4 rounded hover:font-semibold hover:underline hover:bg-green-200"
                    to="/good">
                    Good
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
