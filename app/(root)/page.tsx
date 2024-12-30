import Searchbar from '../components/Searchbar';

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ query?: string }>;
}) {
	const query = (await searchParams).query;

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
		</div>
	);
}
