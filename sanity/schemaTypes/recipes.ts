import { defineField, defineType } from 'sanity';

export const recipes = defineType({
	name: 'recipes',
	title: 'Recipes',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) =>
				Rule.required()
					.min(3)
					.max(30)
					.error('Title must be between 3 and 30 characters.'),
		}),

		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
			},
		}),

		defineField({
			name: 'author',
			title: 'Author',
			type: 'reference',
			to: { type: 'author' },
		}),

		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			validation: (Rule) =>
				Rule.required()
					.min(5)
					.max(150)
					.error('Description must be between 5 and 150 characters.'),
		}),

		defineField({
			name: 'category',
			title: 'Category',
			type: 'array',
			of: [{ type: 'string' }],
			validation: (Rule) =>
				Rule.required()
					.min(1)
					.max(5)
					.error('Select at least 5 categories.'),
			options: {
				layout: 'tags',
			},
		}),

		defineField({
			name: 'media',
			title: 'Media',
			type: 'array',
			of: [
				{ type: 'image', options: { hotspot: true } },
				{
					type: 'file',
					title: 'Video',
					options: { accept: 'video/*' },
				},
			],
			validation: (Rule) =>
				Rule.max(1).error('Only one file (image or video) is allowed.'),
		}),

		defineField({
			name: 'ingredients',
			title: 'Ingredients',
			type: 'array',
			of: [
				defineField({
					name: 'ingredient',
					title: 'Ingredient',
					type: 'object',
					fields: [
						{
							name: 'quantity',
							title: 'Quantity',
							type: 'string',
							validation: (Rule) =>
								Rule.required().error('Quantity is required.'),
						},
						{
							name: 'product',
							title: 'Product',
							type: 'string',
							validation: (Rule) =>
								Rule.required().error(
									'Product name is required.'
								),
						},
					],
				}),
			],
		}),

		defineField({
			name: 'steps',
			title: 'Steps',
			type: 'array',
			of: [
				defineField({
					name: 'step',
					title: 'Step',
					type: 'object',
					fields: [
						{
							name: 'instruction',
							title: 'Instruction',
							type: 'text',
							validation: (Rule) =>
								Rule.required()
									.min(5)
									.max(500)
									.error(
										'Instruction must be between 5 and 500 characters.'
									),
						},
						{
							name: 'time',
							title: 'Time (minutes)',
							type: 'number',
							validation: (Rule) =>
								Rule.required()
									.min(1)
									.error(
										'Each step must take at least 1 minute.'
									),
						},
					],
				}),
			],
		}),
	],
});
