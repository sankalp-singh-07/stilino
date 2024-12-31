import ItemCard, { ItemCardType } from '@/components/ItemCard';
import Searchbar from '@/components/Searchbar';
// import { client } from '@/sanity/lib/client';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { RECIPES_QUERY } from '@/sanity/lib/queries';

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ query?: string }>;
}) {
	const query = (await searchParams).query;

	const params = { search: query || null };

	// const posts = await client.fetch(RECIPES_QUERY);

	const { data: posts } = await sanityFetch({ query: RECIPES_QUERY, params });

	// console.log(JSON.stringify(posts));

	return (
		<>
			<div className="ml-4 mr-4 mt-3 mb-6 ">
				<div className="pink_container">
					<h1 className="heading">Cook. Share. Inspire.</h1>
					<p className="sub-heading">
						Find, create, and share your favorite recipes with the
						world.
					</p>
					<Searchbar query={query} />
				</div>
				<div className="section_container">
					<p className="text-2xl text-black font-semibold">
						{query
							? `Search results for "${query}"`
							: 'Our Top Recipes'}
					</p>
					<ul className="mt-6 card_grid">
						{posts?.length > 0 ? (
							posts.map((post: ItemCardType) => (
								<ItemCard key={post._id} post={post} />
							))
						) : (
							<p className="no-results">No items found 😅</p>
						)}
					</ul>
				</div>
			</div>
			<SanityLive />
		</>
	);
}
