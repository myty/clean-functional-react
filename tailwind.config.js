// tailwind.config.js
module.exports = {
    purge: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            spacing: {
                22: "5.5rem",
                26: "6.5rem",
            },
        },
        maxHeight: {
            0: "0",
            "1/4": "25%",
            "1/2": "50%",
            "3/4": "75%",
            full: "100%",
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
