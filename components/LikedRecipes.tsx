import { client } from '@/sanity/lib/client';
import { RECIPE_BY_ID_QUERY } from '@/sanity/lib/queries';
import React from 'react';
import ItemCard, { ItemCardType } from './ItemCard';

const LikedRecipes = async ({ id }: { id: string }) => {
	const recipe = await client.fetch(RECIPE_BY_ID_QUERY, { id });
	console.log('here is the recipes : ', recipe);

	return (
		<>
			<ItemCard key={recipe._id} post={recipe} />
		</>
	);
};
export default LikedRecipes;
