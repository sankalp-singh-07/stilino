'use client';
import React from 'react';
import ItemCard, { ItemCardType } from './ItemCard';
import { useState } from 'react';

const ItemCardHelper = ({ posts }: { posts: ItemCardType[] }) => {
	const [postShow, setPostShow] = useState(6);

	const handlePostShow = () => setPostShow((prev) => prev + 6);

	return (
		<div className="flex flex-col justify-evenly">
			<ul className="mt-6 card_grid">
				{posts?.length > 0 ? (
					posts
						.slice(0, postShow)
						.map((post: ItemCardType) => (
							<ItemCard key={post._id} post={post} />
						))
				) : (
					<p className="no-results">No items found 😅</p>
				)}
			</ul>
			{postShow < posts.length && (
				<button
					onClick={handlePostShow}
					className="mt-4 bg-primary w-fit text-white text-lg font-medium mx-auto px-4 py-2 rounded"
				>
					Show More
				</button>
			)}
		</div>
	);
};

export default ItemCardHelper;
