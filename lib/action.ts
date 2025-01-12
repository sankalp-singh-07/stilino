'use server';

import { options } from '@/options';
import { getServerSession } from 'next-auth/next';
import { parseServerActionResponse } from './utils';
import slugify from 'slugify';
import { writeClient } from '@/sanity/lib/write';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { nanoid } from 'nanoid';

interface FormDataType {
	title: string;
	description: string;
	category: string[];
	media: string[];
	ingredients: { quantity: string; product: string }[];
	steps: { instruction: string; time: number }[];
}

export const createContent = async (formData: FormDataType) => {
	const session = await getServerSession(options);

	if (!session) {
		return parseServerActionResponse({
			error: 'No user found',
			status: 'ERROR',
		});
	}

	const { title, description, category, media, ingredients, steps } =
		formData;

	const slug = slugify(title, { lower: true, strict: true });

	try {
		const recipes = {
			title,
			description,
			category,
			media: media.map((assetId) => ({
				_key: nanoid(),
				_type: 'image',
				asset: { _type: 'reference', _ref: assetId },
			})),
			slug: {
				_type: 'slug',
				current: slug,
			},
			ingredients,
			steps,
			author: {
				_type: 'reference',
				_ref: session.id,
			},
		};

		const result = await writeClient.create({
			_type: 'recipes',
			...recipes,
		});

		return parseServerActionResponse({
			...result,
			error: '',
			status: 'SUCCESS',
		});
	} catch (err) {
		console.error(err);
		return parseServerActionResponse({
			error: JSON.stringify(err),
			status: 'ERROR',
		});
	}
};

export const uploadImageToSanity = async (file: File): Promise<string> => {
	try {
		const asset = await writeClient.assets.upload('image', file, {
			contentType: file.type,
			filename: file.name,
		});
		return asset._id; // Return the asset ID for referencing in documents
	} catch (err) {
		console.error('Error uploading image to Sanity:', err);
		throw new Error('Failed to upload image to Sanity');
	}
};

export const getLikes = async (id: string) => {
	const postRef = doc(db, 'likes', id);
	const postSnap = await getDoc(postRef);

	const likesCount = postSnap.exists()
		? postSnap.data()?.users.length || 0
		: 0;

	return likesCount;
};

export const getLikedPosts = async (id: string) => {
	try {
		const userRef = doc(db, 'users', id);
		const userSnap = await getDoc(userRef);

		if (!userSnap.exists()) {
			return [];
		}
		const { likedPosts = [] } = userSnap.data();
		return likedPosts;
	} catch (error) {
		console.log('Error getting liked posts', error);
		return [];
	}
};
