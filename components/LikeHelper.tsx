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
	const [likesCount, setLikesCount] = useState(0);
	const [liked, setLiked] = useState(false);

	const initializeFirestore = async () => {
		const postRef = doc(db, 'likes', postId);
		const userRef = doc(db, 'users', userId);

		const postSnap = await getDoc(postRef);
		if (!postSnap.exists()) {
			await setDoc(postRef, { users: [] });
		}

		const userSnap = await getDoc(userRef);
		if (!userSnap.exists()) {
			await setDoc(userRef, { likedPosts: [] });
		}
	};

	const handleLikeToggle = async () => {
		try {
			const postRef = doc(db, 'likes', postId);
			const userRef = doc(db, 'users', userId);

			const postSnap = await getDoc(postRef);
			if (!postSnap.exists()) {
				await setDoc(postRef, { users: [] });
			}

			const userSnap = await getDoc(userRef);
			if (!userSnap.exists()) {
				await setDoc(userRef, { likedPosts: [] });
			}

			if (liked) {
				await updateDoc(postRef, {
					users: arrayRemove(userId),
				});
				await updateDoc(userRef, {
					likedPosts: arrayRemove(postId),
				});
				setLikesCount((prev) => prev - 1);
			} else {
				await updateDoc(postRef, {
					users: arrayUnion(userId),
				});
				await updateDoc(userRef, {
					likedPosts: arrayUnion(postId),
				});
				setLikesCount((prev) => prev + 1);
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
