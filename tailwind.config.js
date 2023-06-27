/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            width: {
                '300': '300px !important',
            },
            height: {
                '300': '300px !important',
            },
        },
    },
    plugins: [],
}