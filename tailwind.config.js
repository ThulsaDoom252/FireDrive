/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            width: {
                '300': '300px !important',
                '500': '500px',
            },
            height: {
                '300': '300px !important',
                '200': '200px',
            },
        },
    },
    plugins: [],
}