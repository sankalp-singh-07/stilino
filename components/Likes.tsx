'use client';

import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

const Likes = ({
	postId,
	initialLikes,
}: {
	postId: string;
	initialLikes: Promise<any>;
}) => {
	const [likes, setLikes] = useState(initialLikes);

	useEffect(() => {
		const postRef = doc(db, 'likes', postId);
		const unsubscribe = onSnapshot(postRef, (doc) => {
			if (doc.exists()) {
				setLikes(doc.data()?.users.length || 0);
			}
		});
		return () => unsubscribe();
	}, [postId]);

	return <p className="text-white text-base font-medium">{likes}</p>;
};

export default Likes;
