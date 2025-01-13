import Footer from '@/components/Footer';
import ItemCardHelper from '@/components/ItemCardHelper';
import Searchbar from '@/components/Searchbar';
import { options } from '@/options';
// import { client } from '@/sanity/lib/client';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { RECIPES_QUERY } from '@/sanity/lib/queries';
import { getServerSession } from 'next-auth/next';

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ query?: string }>;
}) {
	const query = (await searchParams).query;

	const params = { search: query || null };

	// const posts = await client.fetch(RECIPES_QUERY);

	const session = await getServerSession(options);
	// if (session) console.log(session?.id);

	const { data: posts } = await sanityFetch({ query: RECIPES_QUERY, params });

	// console.log(JSON.stringify(posts));

	return (
		<>
			<div className="ml-4 mr-4 mt-3 mb-6 ">
				<div className="hero_container pattern">
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
					<ItemCardHelper posts={posts} />
				</div>
			</div>
			<SanityLive />
			<Footer />
		</>
	);
}
