import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.{js,jsx,ts,tsx}',
    ],

    theme: {
        extend: {
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                // Manabi Link Custom Colors
                'wisdom-blue': '#2a7a8c',
                'energetic-yellow': '#ffc947',
                'charcoal-gray': '#343a40',
                'silver-gray': '#6c757d',
                'off-white': '#f8f9fa',
                'success-green': '#28a745',
                'warning-red': '#dc3545',
                'light-border': '#e9ecef',
                'input-border': '#ced4da',
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};
