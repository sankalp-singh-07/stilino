import ItemCard from '@/components/ItemCard';
import Searchbar from '@/components/Searchbar';

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ query?: string }>;
}) {
	const query = (await searchParams).query;

	const posts = [
		{
			createdAt: new Date(),
			views: '55',
			author: { _id: 1, name: 'Sankalp' },
			_id: 1,
			description: 'This is a description',
			image: 'https://plus.unsplash.com/premium_photo-1677192451109-a7d3762a74fa?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			category: 'Vegan',
			title: 'A plate of hot cross buns',
		},
	];

	return (
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
	);
}
