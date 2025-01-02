import { client } from '@/sanity/lib/client';
import { RECIPES_BY_AUTHOR_QUERY } from '@/sanity/lib/queries';
import React from 'react';
import ItemCard, { ItemCardType } from './ItemCard';

const UserRecipes = async ({ id }: { id: string }) => {
	const recipes = await client.fetch(RECIPES_BY_AUTHOR_QUERY, { id });

	return (
		<>
			{recipes.length > 0 ? (
				recipes.map((recipe: ItemCardType) => (
					<ItemCard key={recipe._id} post={recipe} />
				))
			) : (
				<p className="no-result">No posts yet</p>
			)}
		</>
	);
};
export default UserRecipes;
