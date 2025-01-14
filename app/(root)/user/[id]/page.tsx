import Loading from '@/app/loading';
import LikedRecipes from '@/components/LikedRecipes';
import UserRecipes from '@/components/UserRecipes';
import { getLikedPosts } from '@/lib/action';
import { options } from '@/options';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';
import { getServerSession } from 'next-auth/next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
	const id = (await params).id;

	const likedPostsArr = await getLikedPosts(id);

	const session = await getServerSession(options);

	const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

	if (!user) return notFound();

	return (
		<Suspense fallback={<Loading />}>
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
					<p className="mt-1 text-center text-sm font-normal text-whiteBg">
						{user.bio}
					</p>
				</div>
				<div className="flex flex-col gap-10">
					<div className="flex-1 flex flex-col gap-5 lg:-mt-5">
						<p className="text-[30px] font-bold">
							{session?.id === id ? 'Your' : 'All'} Recipes
						</p>
						<ul className="card_grid-sm">
							<UserRecipes id={id} />
						</ul>
					</div>

					<div className="flex-1 flex flex-col gap-5 lg:-mt-5">
						<p className="text-[30px] font-bold">Liked Recipes</p>
						<ul className="card_grid-sm">
							{likedPostsArr.length > 0 ? (
								likedPostsArr.map((likedId: string) => (
									<LikedRecipes id={likedId} key={likedId} />
								))
							) : (
								<p className="no-result">No posts yet</p>
							)}
						</ul>
					</div>
				</div>
			</div>
		</Suspense>
	);
};

export default page;
