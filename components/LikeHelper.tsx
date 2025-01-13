'use client';

import { useState } from 'react';
import { db } from '../lib/firebase';
import {
	doc,
	getDoc,
	setDoc,
	updateDoc,
	arrayUnion,
	arrayRemove,
} from 'firebase/firestore';
import { Heart } from 'lucide-react';

type LikeButtonProps = {
	postId: string;
	userId: string;
};

const LikeButton = ({ postId, userId }: LikeButtonProps) => {
	const [liked, setLiked] = useState(false);

	const handleLikeToggle = async () => {
		try {
			const postRef = doc(db, 'likes', postId);
			const userRef = doc(db, 'users', userId);

			// Ensure the `likes` and `users` documents exist
			const [postSnap, userSnap] = await Promise.all([
				getDoc(postRef),
				getDoc(userRef),
			]);
			if (!postSnap.exists()) await setDoc(postRef, { users: [] });
			if (!userSnap.exists()) await setDoc(userRef, { likedPosts: [] });

			// Toggle like
			if (liked) {
				await Promise.all([
					updateDoc(postRef, { users: arrayRemove(userId) }),
					updateDoc(userRef, { likedPosts: arrayRemove(postId) }),
				]);
			} else {
				await Promise.all([
					updateDoc(postRef, { users: arrayUnion(userId) }),
					updateDoc(userRef, { likedPosts: arrayUnion(postId) }),
				]);
			}

			setLiked(!liked);
		} catch (error) {
			console.error('Error toggling like:', error);
		}
	};

	return (
		<div>
			<button onClick={handleLikeToggle}>
				{liked ? (
					<Heart className="size-6 text-white fill-white" />
				) : (
					<Heart className="size-6 text-white hover:text-red-800" />
				)}
			</button>
		</div>
	);
};

export default LikeButton;
