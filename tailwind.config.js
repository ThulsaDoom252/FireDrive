/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                'alert-sm': '568px',
                'header-xs': '476px',
                'xs': '400px',
            },
            width: {
                '300': '300px',
                '500': '500px',
                '600': '600px',
                '800': '800px',
            },
            height: {
                '300': '300px',
                '200': '200px',
            },
            maxWidth: {
                '300': '300px',
            }
        },
    },
    plugins: [],
}