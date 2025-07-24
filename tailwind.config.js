//  Latest Headline Section Config.

module.exports = {
    theme: {
        extend: {
            animation: {
                'marquee': 'marquee 20s linear infinite',
                'marquee-slow': 'marquee 40s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
            },
        },
    },
    variants: {
        extend: {},
    },
};




// News Highlights Section Config.

// tailwind.config.js
module.exports = {
    theme: {
        extend: {
            animation: {
                marquee: 'marquee 30s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
            },
        },
    },
    plugins: [],
};
