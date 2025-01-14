import Loading from '@/app/loading';
import ContentForm from '@/components/ContentForm';
import React, { Suspense } from 'react';

const page = () => {
	return (
		<div>
			<Suspense fallback={<Loading />}>
				<ContentForm />
			</Suspense>
		</div>
	);
};

export default page;
