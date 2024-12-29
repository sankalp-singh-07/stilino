import { NextAuthOptions } from 'next-auth';
import Github from 'next-auth/providers/github';

export const options: NextAuthOptions = {
	providers: [
		Github({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		}),
	],
};
