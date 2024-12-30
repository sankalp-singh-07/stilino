import Link from 'next/link';
import React from 'react';
import Authentication from './Authentication';

const Navbar = () => {
	return (
		<div className="ml-4 mr-4 mt-3 mb-6 h-14">
			<div className="w-full h-full bg-primary flex justify-between sm:px-7 px-4 rounded-lg">
				<div className=" h-full flex justify-center items-center">
					<Link
						href="/"
						className="text-white sm:text-xl md:text-2xl text-lg font-semibold"
					>
						Stilino.
					</Link>
				</div>
				<div className="h-full flex gap-4">
					<Authentication />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
