/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                customInputColor: '#f2f2f2',
            },
            inset: {
                'custom-80': '80px',
                'custom-57': '57px',
                'custom-20': '85px',
                'custom-50': '65px',
            },
            screens: {
                'alert-sm': '568px',
                'header-xs': '476px',
                'xs': '400px',
                'navbar-xs': '400px',
                'custom-800': '800px'
            },
            width: {
                '150': '150px',
                '200': '200px',
                '300': '300px',
                '400': '400px',
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