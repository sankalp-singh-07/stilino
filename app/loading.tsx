import React from 'react';

const Loading = () => {
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="rounded-full h-5 w-5 bg-primary animate-ping"></div>
		</div>
	);
};

export default Loading;
