import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		rules: {
			// Disable the rule that enforces the use of <Image />
			'@next/next/no-img-element': 'off',
			'@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
		},
	},
];

export default eslintConfig;
