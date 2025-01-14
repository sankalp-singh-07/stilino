import { dateFormat } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import {
	RECIPE_BY_ID_QUERY,
	RECIPES_BY_AUTHOR_ID_QUERY,
} from '@/sanity/lib/queries';
import { Share } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import { getLikes } from '@/lib/action';
import Likes from '@/components/Likes';
import { getServerSession } from 'next-auth';
import { options } from '@/options';
import LikeButton from '@/components/LikeHelper';
import ItemCardHelper from '@/components/ItemCardHelper';
import Footer from '@/components/Footer';
import Loading from '@/app/loading';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
	const id = (await params).id;

	const likesCount = await getLikes(id);

	const session = await getServerSession(options);
	const userId = session?.id || null;

	const post = await client.fetch(RECIPE_BY_ID_QUERY, { id });

	if (!post) return notFound();

	let totalTime = 0;

	const {
		_createdAt,
		author,
		title,
		category,
		media,
		description,
		ingredients,
		steps,
	} = post;

	let mediaAsset = null;
	const authorId = author?._id;
	const recipes = await client.fetch(RECIPES_BY_AUTHOR_ID_QUERY, {
		authorId,
		id,
	});

	if (media) {
		mediaAsset = media[0]?.asset;
	}

	return (
		<Suspense fallback={<Loading />}>
			<div className="ml-4 mr-4 mt-3 mb-6 ">
				<div className="hero_container">
					<p className="sub-heading-post">
						Published on {dateFormat(_createdAt)}
					</p>
					<h1 className="heading-post">{title}</h1>
					<p className="sub-heading-post">{description}</p>
					<div className="flex flex-wrap items-center justify-center gap-2 w-1/2 mt-8">
						{category?.map((set: string, ind: number) => (
							<div key={ind}>
								<Link href={`/?query=${set?.toLowerCase()}`}>
									<p className="text-white text-sm font-medium bg-red-400 px-3 py-2 rounded-full">
										{set}
									</p>
								</Link>
							</div>
						))}
					</div>
				</div>
				<div className="w-full bg-primary mt-6 h-fit flex justify-between items-center py-6 px-8 rounded-lg">
					<Link
						href={`/user/${author?._id}`}
						className="h-full text-white flex gap-5 items-center"
					>
						<img src={author.image} alt="A" className="avatar" />
						<div>
							<h1 className="uppercase">{author.name}</h1>
							<h1>@{author.username}</h1>
						</div>
					</Link>
					<div className="h-full  gap-7 flex items-center">
						{userId && (
							<div className="flex cursor-pointer gap-1 items-center">
								<LikeButton postId={id} userId={userId} />
								<Likes postId={id} initialLikes={likesCount} />
							</div>
						)}
						<div className="like flex items-center cursor-pointer">
							<Share className="size-6 text-white" />
						</div>
					</div>
				</div>
				<div className="mt-6 md:w-[60vw] md:h-[60vh] sm:w-[80vw] sm:h-[40vh]  max-w-7xl rounded-lg mx-auto flex justify-center overflow-hidden border-4 border-primary">
					{mediaAsset && (
						<img
							src={mediaAsset?.url || null}
							alt="placeholder"
							className="w-full h-full object-cover"
						/>
					)}
				</div>
				<div className="mt-6 mx-auto h-fit rounded-lg leading-relaxed text-sm md:text-base md:flex items-start gap-2 md:w-[60vw] sm:w-[80vw] overflow-hidden">
					<div className="w-full md:w-fit border-4 border-primary px-7 py-5 rounded-lg mb-4">
						<h1 className="text-2xl underline mb-3">INGREDIENTS</h1>
						{ingredients.map(
							(
								ingred: { quantity: string; product: string },
								ind: number
							) => (
								<div
									key={ind}
									className="flex items-center gap-2 my-2"
								>
									<p className="flex items-center py-2 px-3 bg-primary text-white rounded-lg">
										{ingred.quantity} : {ingred.product}
									</p>
								</div>
							)
						)}
					</div>

					<div>
						<div className="w-fit border-4 border-primary px-7 py-5 rounded-lg">
							<h1 className="text-2xl underline mb-4">
								STEPS TO MAKE THIS DISH
							</h1>
							{steps.map(
								(
									step: { instruction: string; time: number },
									ind: number
								) => {
									totalTime += step.time;
									return (
										<div
											key={ind}
											className="flex items-stretch justify-between my-2 text-white rounded-lg"
										>
											<p className="flex-1 px-3 py-2 bg-primary rounded-lg md:rounded-l-lg md:rounded-r-none">
												Instruction: {step.instruction}.
											</p>

											<p className="hidden md:flex w-24 px-3 py-2 bg-slate-600 rounded-r-lg items-center justify-center text-center">
												Time: {step.time} min
											</p>
										</div>
									);
								}
							)}
						</div>

						<div className="w-full mt-4 border-4 border-primary bg-primary px-7 py-5 rounded-lg">
							<h1 className="text-2xl font-semibold text-center text-white">
								Total Time: {totalTime} minutes
							</h1>
						</div>
					</div>
				</div>
				<div>
					{recipes.length > 0 && (
						<div className="mt-12 border-opacity-30 border-t-2 border-primary">
							<h1 className="text-3xl mt-6 text-center text-black font-semibold uppercase">
								More Posts By {author.name}
							</h1>
							<ItemCardHelper posts={recipes} />
						</div>
					)}
				</div>
			</div>
			<Footer
				message={`Subscribe to keep up with fresh blogs by ${author.name}.`}
			/>
		</Suspense>
	);
};

export default page;
