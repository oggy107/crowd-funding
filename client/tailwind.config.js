/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                epilogue: ["Epilogue", "sans-serif"],
            },
            boxShadow: {
                secondary: "10px 10px 20px rgba(2, 2, 2, 0.25)",
            },
            backgroundColor: {
                primary: "#1c1c24",
                primary_2: "#1dc071",
                secondary_2: "#8c6dfd",
            },
            textColor: {
                placeholder: "#4b5264",
                secondary: "#808191",
                secondary_2: "#b2b3bd",
            },
        },
    },
    plugins: [],
};
