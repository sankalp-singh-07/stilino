'use client';

import React, { useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Loader2, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { createContent, uploadImageToSanity } from '@/lib/action';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';

const ContentForm = () => {
	const [error] = useState<Record<string, string[]>>({});
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
		<>
			<div className="mx-4 mt-3 mb-6 ">
				<div className="w-full bg-primary md:min-h-[120px] min-h-[120px] flex justify-center items-center flex-col md:py-10 py-3 px-3 rounded-lg">
					<h1 className="uppercase px-4 py-2 tracking-tighter font-semibold text-whiteBg md:text-[60px] sm:leading-[64px] sm:text-[44px] text-[24px] leading-[30px] max-w-5xl text-center my-5">
						Let's <span className="text-secondary">cook</span>{' '}
						something <span className="text-secondary">YUMMY</span>.
					</h1>
				</div>
			</div>
			<div className="content-form overflow-hidden">
				<div>
					<label htmlFor="title" className="content-form_label">
						Title
					</label>
					<Input
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
						className="content-form_input"
						placeholder="Recipe Title"
					/>
					{error.title && <p>{error.title.join(', ')}</p>}
				</div>

				<div>
					<label htmlFor="description" className="content-form_label">
						Description
					</label>
					<Textarea
						id="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
						className="content-form_textarea"
						placeholder="Recipe Description"
					/>
					{error.description && <p>{error.description.join(', ')}</p>}
				</div>

				<div>
					<label className="content-form_label">Categories</label>
					<Input
						placeholder="Type and press ENTER"
						onKeyDown={handleAddCategory}
						className="content-form_input"
					/>
					<div className="mt-4 py-2 overflow-scroll hide-scroll">
						{categories.map((category, index) => (
							<span key={index} className="category-style">
								{category}
							</span>
						))}
					</div>
				</div>

				<div>
					<label className="content-form_label">Upload Image</label>
					<Input
						type="file"
						accept="image/*"
						onChange={(e) =>
							setMediaFile(e.target.files?.[0] || null)
						}
						className="content-form_input cursor-pointer"
					/>
					{mediaFile && (
						<p className="text-sm font-medium mt-2 ml-2 overflow-scroll hide-scroll">
							Selected File: {mediaFile.name}
						</p>
					)}
				</div>

				<div>
					<label className="content-form_label">Ingredients</label>
					<div>
						<Input
							placeholder="Quantity"
							className="content-form_input"
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
							className="content-form_input mb-3"
							value={newIngredient.product}
							onChange={(e) =>
								setNewIngredient({
									...newIngredient,
									product: e.target.value,
								})
							}
						/>
						<Button
							onClick={handleAddIngredient}
							className="content-form_btn"
						>
							Add Ingredient
						</Button>
					</div>
					<ul>
						{ingredients.map((ing, idx) => (
							<li
								key={idx}
								className="mt-2 ml-3 font-medium"
							>{`${ing.quantity} - ${ing.product}`}</li>
						))}
					</ul>
				</div>

				<div>
					<label className="content-form_label">Steps</label>
					<div>
						<Textarea
							placeholder="Instruction"
							className="content-form_textarea"
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
							className="content-form_input mb-3"
							value={newStep.time}
							onChange={(e) =>
								setNewStep({ ...newStep, time: e.target.value })
							}
						/>
						<Button
							onClick={handleAddStep}
							className="content-form_btn"
						>
							Add Step
						</Button>
					</div>
					<ul>
						{steps.map((step, idx) => (
							<li
								key={idx}
								className="mt-2 ml-3 font-medium"
							>{`${step.instruction} - ${step.time} mins`}</li>
						))}
					</ul>
				</div>

				<Button
					onClick={handleSubmit}
					className="content-form_btn"
					disabled={isPending}
				>
					{!isPending ? (
						<>
							<Send /> Submit Your Recipe
						</>
					) : (
						<>
							<Loader2 className="animate-spin" />
							Submitting...
						</>
					)}
				</Button>
			</div>
		</>
	);
};

export default ContentForm;
