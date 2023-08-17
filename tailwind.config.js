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
            keyframes: {
                'marquee': {
                    '0%': {transform: 'translateX(100%)'},
                    '100%': {transform: 'translateX(-100%)'},
                },
            },
            inset: {
                'custom-80': '80px',
                'custom-57': '57px',
                'custom-20': '85px',
                'custom-50': '140px',
                'custom-50%': '50%',
            },
            screens: {
                'alert-sm': '568px',
                'header-xs': '476px',
                'xs': '400px',
                'navbar-xs': '400px',
                'custom-800': '800px'
            },
            backgroundColor: {
                'settingsBar': 'rgba(255,255,255,0.5)'
            },
            width: {
                '80%': '80%',
                '20%': '20%',
                '90vw': '90vw',
                '80vw': '80vw',
                'userModal': '400px',
                '150': '150px',
                '200': '200px',
                '300': '300px',
                '400': '400px',
                '500': '500px',
                '554': '554px',
                '600': '600px',
                '800': '800px',
            },
            height: {
                '10%': '10%',
                '20%': '20%',
                '90vh': '90vh',
                '80vh': '80h',
                "45": "45px",
                "40": "40px",
                '300': '300px',
                '200': '200px',
                '62': '130px',
                'playerHeight': '50px'
            },
            zIndex: {
                'max': '999999999999'
            },
            maxWidth: {
                '90screen': '90vw',
                '300': '300px',
            },
            maxHeight: {
                '90screen': '80vh'
            },

        },
    },
    plugins: [],
}