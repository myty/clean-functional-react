import React from "react";
import Button from "./button";
import "../index.css";
// import { docs } from "@vitro/cli/docs";

export default {
    title: "Button",
};

// docs`
// # hello
// # paragraph
// `;

export const DefaultButton = ({}) => {
    return <Button>Default Button</Button>;
};

export const DisabledButton = ({}) => {
    return <Button disabled={true}>Disabled Button</Button>;
};
