import { Skeleton } from '@/components/ui/skeleton';
import UserRecipes from '@/components/UserRecipes';
import { options } from '@/options';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';
import { getServerSession } from 'next-auth/next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
	const id = (await params).id;

	const session = await getServerSession(options);

	const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

	if (!user) return notFound();

	return (
		<>
			<div className="profile_container">
				<div className="profile_card">
					<div className="profile_title">
						<p className="text-lg text-black font-semibold uppercase text-center line-clamp-1">
							{user.name}
						</p>
					</div>
					<img
						src={user.image}
						alt={user.name}
						className="w-[200px] h-[200px] profile_image"
					/>
					<p className="text-xl font-extrabold text-white mt-5 text-center">
						@{user?.username}
					</p>
					<p className="mt-1 text-center font-medium text-whiteBg line-clamp-2">
						{user.bio}
					</p>
				</div>
				<div className="flex-1 flex flex-col gap-5 lg:-mt-5">
					<p className="text-30-bold">
						{session?.id === id ? 'Your' : 'All'} Startups
					</p>
					<ul className="card_grid-sm">
						<Suspense fallback={<p>Loading...</p>}>
							<UserRecipes id={id} />
						</Suspense>
					</ul>
				</div>
			</div>
		</>
	);
};

export default page;
