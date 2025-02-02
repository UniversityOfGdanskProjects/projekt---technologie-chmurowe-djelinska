/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			'primary-white': '#fafafa',
			'secondary-white': '#f4f4f5',
			'primary-gray': '#e4e4e7',
			'secondary-gray': '#9f9fa1',
			'accent-green': '#94b9af',
			'accent-red': '#9b6a6c',
			'primary-black': '#1b1725',
		},
		extend: {},
	},
	plugins: [require('@tailwindcss/forms')],
};
