import { dateFormat } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { RECIPE_BY_ID_QUERY } from '@/sanity/lib/queries';
import { Heart, MessageCircle, Share } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import markdownit from 'markdown-it';

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
	const id = (await params).id;

	const post = await client.fetch(RECIPE_BY_ID_QUERY, { id });

	if (!post) return notFound();

	const md = markdownit();
	const contentParsed = md.render(post?.pitch || '');

	return (
		<>
			<div className="ml-4 mr-4 mt-3 mb-6 ">
				<div className="hero_container">
					<p className="sub-heading-post">
						Published on {dateFormat(post._createdAt)}
					</p>
					<h1 className="heading-post">{post.title}</h1>
					<p className="sub-heading-post">{post.description}</p>
					<Link href={`/?query=${post.category?.toLowerCase()}`}>
						<p className="text-white text-sm font-medium bg-red-400 px-3 py-2 mt-8 rounded">
							{post.category}
						</p>
					</Link>
				</div>
				<div className="w-full bg-primary mt-6 h-fit flex justify-between items-center py-6 px-8 rounded-lg">
					<Link
						href={`/user/${post.author?._id}`}
						className="h-full text-white flex gap-5 items-center"
					>
						<img
							src={post.author.image}
							alt="A"
							className="avatar"
						/>
						<div>
							<h1 className="uppercase">sankalp</h1>
							<h1>@sankalp</h1>
						</div>
					</Link>
					<div className="h-full  gap-7 flex items-center">
						<div className="like flex items-center cursor-pointer gap-1">
							<Heart className="size-6 text-white hover:text-red-800" />
							<p className="text-white text-base font-medium">
								{post.views}
							</p>
						</div>
						<div className="like flex items-center cursor-pointer gap-1">
							<MessageCircle className="size-6 text-white" />
							<p className="text-white text-base font-medium">
								{post.views}
							</p>
						</div>
						<div className="like flex items-center cursor-pointer">
							<Share className="size-6 text-white" />
						</div>
					</div>
				</div>
				<div className="mt-6 md:w-[60vw] md:h-[60vh] sm:w-[80vw] sm:h-[40vh]  max-w-7xl rounded-lg mx-auto flex justify-center overflow-hidden border-4 border-primary">
					<img
						src={post.image}
						alt="content-main-image"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="mt-6 md:w-[60vw] sm:w-[80vw] h-fit px-7 py-5  max-w-7xl rounded-lg mx-auto flex justify-center overflow-hidden border-4 border-primary text-lg leading-relaxed">
					{contentParsed ? (
						<article
							className="prose"
							dangerouslySetInnerHTML={{ __html: contentParsed }}
						/>
					) : (
						<p className="no-result">
							Nothing to display here 🥲...
						</p>
					)}
				</div>
			</div>
		</>
	);
};

export default page;
