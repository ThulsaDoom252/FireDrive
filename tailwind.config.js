/** @type {import('tailwindcss').Config} */


module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        animatedSettings: {
            animatedSpeed: 1000,
            heartBeatSpeed: 500,
            hingeSpeed: 2000,
            bounceInSpeed: 750,
            bounceOutSpeed: 750,
            animationDelaySpeed: 500,
            classes: ['bounce', 'heartBeat']
        },

        extend: {
            colors: {
                'night': '#f6f6f6',
                day: '#000000',
                customInputColor: '#f2f2f2',
            },
            backgroundImage: {
                'desert-main': "url('/src/images/DESERT.jpg')",
                'day-main': "url('/src/images/BG.jpg')",
                'night-main': "url('/src/images/NIGHT.jpg')",


            },
            keyframes: {
                'marquee': {
                    '0%': {transform: 'translateX(100%)'},
                    '100%': {transform: 'translateX(-100%)'},
                },
            },
            inset: {
                'minus30': '-30px',
                'volumeBar': '65px',
                'volumeBarLeft': '-40px',
                '0.4': '0.01px',
                'custom-80': '80px',
                'custom-57': '57px',
                'custom-20': '85px',
                'custom-50': '140px',
                'custom-50%': '50%',
                'audioPlayerVolumeBar': '0.1px'
            },
            screens: {
                'alert-sm': '568px',
                'header-xs': '476px',
                'xs': '400px',
                'navbar-xs': '400px',
                'custom-800': '800px'
            },
            backgroundColor: {
                'desert-prime': '#ffc08b',
                'desert-sec': '#383634',
                'day-prime': '#30eeff',
                'day-sec': '#ffffff',
                'night-prime': '#2a4cde',
                'night-sec': '#2e3333',
            },
            width: {
                '25%': '25%',
                '40%': '40%',
                '100%': '100%',
                '60%': '60%',
                '70%': '70%',
                '75%': '75%',
                '80%': '80%',
                '90%': '90%',
                '20%': '20%',
                '75vw': '75vw',
                '90vw': '90vw',
                '80vw': '80vw',
                '100vw': '100vw',
                'modal': '400px',
                '150': '150px',
                '200': '200px',
                '300': '300px',
                '400': '400px',
                '500': '500px',
                '554': '554px',
                '600': '600px',
                '800': '800px',
                'player-controls': '870px',
                'image-settings': '400px',
                'video-controls': '750px',
            },
            height: {
                'homeItemBlock': '160px',
                'mobileHomeItemsBlock': '100px',
                '10%': '10%',
                '15%': '15%',
                '20%': '20%',
                '45%': '45%',
                '60%': '60%',
                '80%': '80%',
                '85%': '85%',
                '90%': '90%',
                '100%': '100%',
                '70%': '70%',
                '10vh': '10vh',
                '60vh': '60vh',
                '75vh': '75vh',
                '90vh': '90vh',
                '70vh': '70vh',
                '80vh': '80h',
                '100vh': '100vh',
                "45": "45px",
                "40": "40px",
                '300': '300px',
                '200': '200px',
                '62': '130px',
                'playerHeight': '40px',
                'mobilePlayerHeight': '70px',
                'inputContainerHeight': '63px',
                'signUpInputContainerHeight': '40px',

            },
            zIndex: {
                '1': '1',
                '2': '2',
                '3': '3',
                '4': '4',
                '5': '5',
                '6': '6',
                '7': '7',
                'max': '999999999999'
            },
            maxWidth: {
                'homeItemBlock': '1024px',
                'imageListItem': '100px',
                'videoListItem': '100px',
                '75vw': '75vw',
                '90screen': '90vw',
                '95vw': '95vw',
                '300': '300px',
                'player-controls': '870px',
            },
            maxHeight: {
                '75vh': '75vh',
                '90screen': '90vh',
                '95vh': '95vh',
            },

        },
    },
    plugins: [],
}