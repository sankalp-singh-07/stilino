import React from 'react';
import { options } from '../options';
import { getServerSession } from 'next-auth/next';
import LoginBTN from './LoginBTN';
import UserPanel from './UserPanel';

const Authentication = async () => {
	const session = await getServerSession(options);
	return (
		<div className="flex items-center">
			{session ? (
				<UserPanel session={session} />
			) : (
				<div>
					<LoginBTN />
				</div>
			)}
		</div>
	);
};

export default Authentication;
