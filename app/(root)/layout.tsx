import React from 'react';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<>
			{/* <Navbar /> */}
			{children}
		</>
	);
};

export default Layout;
