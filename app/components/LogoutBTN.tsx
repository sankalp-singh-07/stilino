'use client';

import React from 'react';
import { signOut } from 'next-auth/react';

const LogoutBTN = () => {
	return (
		<button
			onClick={async () => {
				await signOut();
			}}
			className="px-8 py-2 text-white text-sm font-medium bg-tertiary rounded-full  hover:bg-secondary"
		>
			Log Out
		</button>
	);
};

export default LogoutBTN;
