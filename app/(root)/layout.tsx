import React from 'react';
import Navbar from '../../components/Navbar';
import { Toaster } from '@/components/ui/toaster';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<>
			<Navbar />
			{children}
			<Toaster />
		</>
	);
};

export default Layout;
