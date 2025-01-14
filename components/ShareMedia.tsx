'use client';

import React from 'react';
import { Twitter, Facebook, Linkedin, MessageCircle } from 'lucide-react';

const ShareMedia = ({
	postUrl,
	postInfo,
	postImg,
}: {
	postUrl: string;
	postInfo: { title: string; description: string };
	postImg: string;
}) => {
	const { title, description } = postInfo;

	const shareOptions = [
		{
			name: 'Twitter',
			url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
				`${title}\n${description}\n`
			)}&url=${encodeURIComponent(postUrl)}`,
			Icon: Twitter,
		},
		{
			name: 'Facebook',
			url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
			Icon: Facebook,
		},
		{
			name: 'WhatsApp',
			url: `https://wa.me/?text=${encodeURIComponent(
				`${title}\n${description}\n${postUrl}`
			)}`,
			Icon: MessageCircle,
		},
		{
			name: 'LinkedIn',
			url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`,
			Icon: Linkedin,
		},
	];

	return (
		<div className="flex flex-col items-center gap-6">
			<ul className="flex gap-2">
				{shareOptions.map(({ name, url, Icon }) => (
					<li key={name} className="flex items-center">
						<a
							href={url}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center text-primary gap-2 p-2 border-2 text-sm font-medium border-black rounded-lg bg-white hover:bg-secondary hover:text-black "
							aria-label={`Share on ${name}`}
						>
							<Icon className="w-5 h-5" />
							<span className="hidden sm:inline">{name}</span>
						</a>
					</li>
				))}
			</ul>
			{postImg && (
				<div className="w-full max-w-md bg-[#0f325a] rounded-lg shadow-lg overflow-hidden mt-4">
					<img
						src={postImg}
						alt={title}
						className="w-full h-48 object-cover"
					/>
					<div className="p-4">
						<h4 className="text-base font-semibold text-center">
							{title}
						</h4>
						<p className="text-white text-sm font-light">
							{description}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default ShareMedia;
