import React, { HTMLProps, PropsWithChildren } from "react";

interface ButtonProps
    extends Pick<HTMLProps<HTMLButtonElement>, "onClick" | "disabled"> {}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
    children,
    disabled = false,
    onClick,
}) => {
    return (
        <button
            className={buildClassNames(disabled)}
            disabled={disabled}
            onClick={onClick}>
            {children}
        </button>
    );
};

function buildClassNames(disabled: boolean) {
    const baseClassNames = "px-2";

    if (disabled) {
        return `${baseClassNames} cursor-auto text-gray-200 cursor-none`;
    }

    return `${baseClassNames} hover:underline hover:font-semibold`;
}

export default Button;
