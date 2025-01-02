'use server';

import { options } from '@/options';
import { getServerSession } from 'next-auth/next';
import { parseServerActionResponse } from './utils';
import slugify from 'slugify';
import { writeClient } from '@/sanity/lib/write';

export const createContent = async (
	prevState: any,
	formData: FormData,
	pitch: string
) => {
	const session = await getServerSession(options);

	if (!session)
		return parseServerActionResponse({
			error: 'No user found',
			status: 'ERROR',
		});

	const { title, description, category, link } = Object.fromEntries(
		Array.from(formData).filter(([key]) => key !== 'pitch')
	);

	const slug = slugify(title as string, { lower: true, strict: true });

	try {
		const recipe = {
			title,
			description,
			category,
			image: link,
			slug: {
				_type: slug,
				current: slug,
			},
			author: {
				_type: 'reference',
				_ref: session?.id,
			},
			pitch,
		};

		const result = await writeClient.create({
			_type: 'recipe',
			...recipe,
		});

		return parseServerActionResponse({
			...result,
			error: '',
			status: 'SUCCESS',
		});
	} catch (error) {
		console.log(error);

		return parseServerActionResponse({
			error: JSON.stringify(error),
			status: 'ERROR',
		});
	}
};
