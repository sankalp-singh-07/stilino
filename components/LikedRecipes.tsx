import { client } from '@/sanity/lib/client';
import { RECIPE_BY_ID_QUERY } from '@/sanity/lib/queries';
import React from 'react';
import ItemCard from './ItemCard';

const LikedRecipes = async ({ id }: { id: string }) => {
	const recipe = await client.fetch(RECIPE_BY_ID_QUERY, { id });

	return (
		<>
			<ItemCard key={recipe._id} post={recipe} />
		</>
	);
};
export default LikedRecipes;
