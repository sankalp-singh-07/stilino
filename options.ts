import Github from 'next-auth/providers/github';
import { client } from './sanity/lib/client';
import { AUTHOR_BY_GITHUB_ID_QUERY } from './sanity/lib/queries';
import { writeClient } from './sanity/lib/write';
import { NextAuthOptions } from 'next-auth';

export const options: NextAuthOptions = {
	providers: [
		Github({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		}),
	],
	callbacks: {
		async signIn({ user, account, profile }) {
			if (profile) {
				const { id, login, bio } = profile as {
					id: string;
					login: string;
					bio?: string;
				};

				const existingUser = await client
					.withConfig({ useCdn: false })
					.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
						id,
					});

				if (!existingUser) {
					await writeClient.create({
						_type: 'author',
						id,
						name: user.name,
						username: login,
						email: user.email,
						image: user.image,
						bio: bio || '',
					});
				}
			}

			return true;
		},
		async jwt({ token, account, profile }) {
			if (account && profile) {
				const user = await client
					.withConfig({ useCdn: false })
					.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
						id: (profile as { id: string }).id,
					});

				token.id = user?._id;
			}

			return token;
		},
		async session({ session, token }) {
			Object.assign(session, { id: token.id });
			return session;
		},
	},
};
