import { z } from 'zod';

export const formSchema = z.object({
	title: z
		.string()
		.min(3, { message: 'Title must be at least 3 characters long.' })
		.max(30, { message: 'Title must be at most 30 characters long.' }),

	description: z
		.string()
		.min(5, { message: 'Description must be at least 5 characters long.' })
		.max(150, {
			message: 'Description must be at most 150 characters long.',
		}),

	category: z
		.array(
			z
				.string()
				.min(3, {
					message:
						'Category name must be at least 3 characters long.',
				})
				.max(20, {
					message:
						'Category name must be at most 20 characters long.',
				})
		)
		.min(1, { message: 'At least one category is required.' })
		.max(5, { message: 'You can select up to 5 categories only.' }),

	media: z
		.array(z.string())
		.min(1, { message: 'At least one media file is required.' })
		.refine((media) => media.every((id) => id.startsWith('image-')), {
			message: 'Media must contain valid Sanity asset IDs.',
		}),

	ingredients: z.array(
		z.object({
			quantity: z.string().min(1, { message: 'Quantity is required.' }),
			product: z
				.string()
				.min(1, { message: 'Product name is required.' }),
		})
	),

	steps: z
		.array(
			z.object({
				_key: z.string(),
				instruction: z
					.string()
					.min(5, {
						message:
							'Instruction must be at least 5 characters long.',
					})
					.max(500, {
						message:
							'Instruction must be at most 500 characters long.',
					}),
				time: z
					.number()
					.min(1, { message: 'Time must be at least 1 minute.' }),
			})
		)
		.min(1, { message: 'At least one step is required.' }),
});
