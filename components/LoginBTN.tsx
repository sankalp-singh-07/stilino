'use client';
import React from 'react';
import { signIn } from 'next-auth/react';
import Github from 'next-auth/providers/github';

const LoginBTN = () => {
	return (
		<button
			onClick={async () => await signIn('github')}
			className="px-8 py-2 text-white text-sm font-medium bg-tertiary rounded-full  hover:bg-secondary"
		>
			LOGIN
		</button>
	);
};

export default LoginBTN;
