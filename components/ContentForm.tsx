'use client';

import React, { useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { createContent, uploadImageToSanity } from '@/lib/action';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';

const ContentForm = () => {
	const [error, setError] = useState<Record<string, string[]>>({});
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [categories, setCategories] = useState<string[]>([]);
	const [mediaFile, setMediaFile] = useState<File | null>(null);
	const [ingredients, setIngredients] = useState<
		{ quantity: string; product: string }[]
	>([]);
	const [steps, setSteps] = useState<{ instruction: string; time: number }[]>(
		[]
	);
	const [newIngredient, setNewIngredient] = useState({
		quantity: '',
		product: '',
	});
	const [newStep, setNewStep] = useState({ instruction: '', time: '' });
	const router = useRouter();
	const [isPending, setIsPending] = useState(false);

	const handleAddCategory = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			const value = e.currentTarget.value.trim();
			if (value && categories.length < 5) {
				setCategories((prev) => [...prev, value]);
				e.currentTarget.value = '';
			} else if (categories.length >= 5) {
				toast({
					title: 'Error',
					description: 'You can only add up to 5 categories.',
					variant: 'destructive',
				});
			}
		}
	};

	const handleAddIngredient = () => {
		if (newIngredient.quantity && newIngredient.product) {
			setIngredients((prev) => [
				...prev,
				{ _key: nanoid(), ...newIngredient },
			]);
			setNewIngredient({ quantity: '', product: '' });
		} else {
			toast({
				title: 'Error',
				description: 'Please fill in both quantity and product fields.',
				variant: 'destructive',
			});
		}
	};

	const handleAddStep = () => {
		if (newStep.instruction && newStep.time) {
			setSteps((prev) => [
				...prev,
				{
					_key: nanoid(),
					instruction: newStep.instruction,
					time: Number(newStep.time),
				},
			]);
			setNewStep({ instruction: '', time: '' });
		} else {
			toast({
				title: 'Error',
				description: 'Please fill in both instruction and time fields.',
				variant: 'destructive',
			});
		}
	};

	const handleSubmit = async () => {
		setIsPending(true);
		try {
			const mediaAssetIds = mediaFile
				? [
						{
							_key: nanoid(),
							assetId: await uploadImageToSanity(mediaFile),
						},
					]
				: [];

			const formData = {
				title,
				description,
				category: categories,
				media: mediaAssetIds.map((media) => media.assetId),
				ingredients,
				steps,
			};

			const result = await createContent(formData);

			if (result.status === 'SUCCESS') {
				toast({
					title: 'Success',
					description: 'Content created successfully!',
				});
				router.push(`/content/${result._id}`);
			}
		} catch (err) {
			console.error(err);
			toast({
				title: 'Error',
				description: 'An unexpected error occurred.',
				variant: 'destructive',
			});
		} finally {
			setIsPending(false);
		}
	};

	return (
		<div className="content-form">
			<div>
				<label htmlFor="title">Title</label>
				<Input
					id="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
				{error.title && <p>{error.title.join(', ')}</p>}
			</div>

			<div>
				<label htmlFor="description">Description</label>
				<Textarea
					id="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
				/>
				{error.description && <p>{error.description.join(', ')}</p>}
			</div>

			<div>
				<label>Categories</label>
				<Input
					placeholder="Type and press Enter"
					onKeyDown={handleAddCategory}
				/>
				<div>
					{categories.map((category, index) => (
						<span key={index}>{category}</span>
					))}
				</div>
			</div>

			<div>
				<label>Upload Image</label>
				<Input
					type="file"
					accept="image/*"
					onChange={(e) => setMediaFile(e.target.files?.[0] || null)}
				/>
				{mediaFile && <p>Selected File: {mediaFile.name}</p>}
			</div>

			<div>
				<label>Ingredients</label>
				<div>
					<Input
						placeholder="Quantity"
						value={newIngredient.quantity}
						onChange={(e) =>
							setNewIngredient({
								...newIngredient,
								quantity: e.target.value,
							})
						}
					/>
					<Input
						placeholder="Product"
						value={newIngredient.product}
						onChange={(e) =>
							setNewIngredient({
								...newIngredient,
								product: e.target.value,
							})
						}
					/>
					<Button onClick={handleAddIngredient}>
						Add Ingredient
					</Button>
				</div>
				<ul>
					{ingredients.map((ing, idx) => (
						<li key={idx}>{`${ing.quantity} - ${ing.product}`}</li>
					))}
				</ul>
			</div>

			<div>
				<label>Steps</label>
				<div>
					<Textarea
						placeholder="Instruction"
						value={newStep.instruction}
						onChange={(e) =>
							setNewStep({
								...newStep,
								instruction: e.target.value,
							})
						}
					/>
					<Input
						type="number"
						placeholder="Time (minutes)"
						value={newStep.time}
						onChange={(e) =>
							setNewStep({ ...newStep, time: e.target.value })
						}
					/>
					<Button onClick={handleAddStep}>Add Step</Button>
				</div>
				<ul>
					{steps.map((step, idx) => (
						<li
							key={idx}
						>{`${step.instruction} - ${step.time} mins`}</li>
					))}
				</ul>
			</div>

			<Button onClick={handleSubmit}>
				<Send /> {isPending ? 'Submitting...' : 'Submit Your Recipe'}
			</Button>
		</div>
	);
};

export default ContentForm;
