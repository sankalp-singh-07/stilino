import { dateFormat } from '@/lib/utils';
import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Author, Recipes } from '@/sanity/types';
import Image from 'next/image';

export type ItemCardType = Omit<Recipes, 'author'> & { author?: Author };

const ItemCard = ({ post }: { post: ItemCardType }) => {
	const { _createdAt, author, title, category, _id, media, description } =
		post;

	let mediaAsset: { url?: string } | null = null;

	if (media && media.length > 0) {
		mediaAsset = media[0]?.asset ? { url: media[0].asset._ref } : null;
	}

	return (
		<li className="item-card group">
			<div className="flex justify-between gap-2">
				<p className="item-card_date">{dateFormat(_createdAt)}</p>
			</div>

			<div className="flex justify-between mt-5 gap-5">
				<div className="flex-1">
					<Link href={`/user/${author?._id}`}>
						<p className="font-medium text-[16px] text-black line-clamp-1">
							{author?.name}
						</p>
					</Link>
					<Link href={`/content/${_id}`}>
						<h3 className="font-semibold text-[26px] text-black line-clamp-1">
							{title}
						</h3>
					</Link>
				</div>
				<Link href={`/user/${author?._id}`}>
					<img
						src={author?.image!}
						alt={author?.name!}
						className="avatar"
					/>
				</Link>
			</div>

			<Link href={`/content/${_id}`}>
				<p className="item-card_desc">{description}</p>
				{mediaAsset && (
					<Image
						src={mediaAsset?.url || '/default-placeholder.png'}
						alt="placeholder"
						className="item-card_img"
					/>
				)}
			</Link>

			<div className="flex justify-between mt-5">
				<div className="flex flex-wrap items-center justify-start gap-2 w-1/2">
					{category?.map((set, ind) => (
						<div key={ind}>
							<Link href={`/?query=${set?.toLowerCase()}`}>
								<p className="px-3 py-2 border-2 border-black rounded-full font-semibold text-[14px] text-black">
									{set}
								</p>
							</Link>
						</div>
					))}
				</div>
				<Button className="item-card_btn" asChild>
					<Link href={`/content/${_id}`}>Details</Link>
				</Button>
			</div>
		</li>
	);
};

export default ItemCard;
