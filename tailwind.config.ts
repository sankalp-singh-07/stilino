import type { Config } from 'tailwindcss';

export default {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#0a2647',
				secondary: '#3498db',
				tertiary: '#5dade2',
				black: '#0E0F19',
				whiteBg: '#F0F0F0',
				white: '#FAFAFA',
			},
			fontFamily: {
				sans: ['var(--font-inter-sans)', 'sans-serif'],
			},
		},
	},
	plugins: [
		require('tailwindcss-animate'),
		require('@tailwindcss/typography'),
	],
} satisfies Config;
