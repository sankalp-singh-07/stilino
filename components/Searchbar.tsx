import React from 'react';
import Form from 'next/form';
import SearchClear from './SearchClear';
import { Search } from 'lucide-react';

const Searchbar = ({ query }: { query?: string }) => {
	return (
		<>
			<Form action="/" scroll={false} className="search-form">
				<input
					name="query"
					defaultValue={query}
					placeholder="Search for a recipe"
					className="search-input"
				/>
				<div className="flex gap-2">
					{query && <SearchClear />}
					<button className="search-btn text-white " type="submit">
						<Search className="size-5" />
					</button>
				</div>
			</Form>
		</>
	);
};

export default Searchbar;
