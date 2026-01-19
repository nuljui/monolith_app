/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'canvas': '#DAD4C7',  // Warm Stone
                'ink': '#1D1D1F',     // Near Black
                'accent': '#38999B',  // Terra Cotta / Rust - Verified
                'faded': 'rgba(29, 29, 31, 0.4)', // Translucent ink
            },
            fontFamily: {
                sans: ['"Inter"', 'sans-serif'], // Inter Only
            },
            borderColor: {
                DEFAULT: '#e5e7eb',
                'accent': '#38999B', // Explicit Accent Border
            },
            boxShadow: {
                'artifact': '0 4px 20px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
            }
        },
    },
    plugins: [],
}
