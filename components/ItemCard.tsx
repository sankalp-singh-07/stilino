import { dateFormat } from '@/lib/utils';
import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Author, Recipes } from '@/sanity/types';
import { getLikes } from '@/lib/action';
import { Heart } from 'lucide-react';

export type ItemCardType = Omit<Recipes, 'author'> & { author?: Author };

const ItemCard = async ({ post }: { post: ItemCardType }) => {
	const { _createdAt, author, title, category, _id, media, description } =
		post;

	let mediaAsset = null;

	const likes = await getLikes(_id);
	console.log('likes for post', likes);

	if (media) {
		mediaAsset = media[0]?.asset;
	}

	return (
		<li className="item-card group">
			<div className="flex justify-between gap-2">
				<p className="item-card_date">{dateFormat(_createdAt)}</p>
				<p className="item-card_date flex justify-center items-center gap-2">
					<Heart size={20} /> {likes}
				</p>
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
					<img
						src={mediaAsset?.url || null}
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
