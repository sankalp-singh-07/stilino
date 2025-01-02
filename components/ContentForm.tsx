'use client';
import React, { useActionState, useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { createContent } from '@/lib/action';

const ContentForm = () => {
	const [error, setError] = useState<Record<string, string>>({});
	const [valueContent, setValueContent] = useState('');
	const router = useRouter();

	const handleSubmit = async (prevState: any, formData: FormData) => {
		try {
			const formValues = {
				title: formData.get('title') as string,
				description: formData.get('description') as string,
				category: formData.get('category') as string,
				link: formData.get('link') as string,
				valueContent,
			};

			await formSchema.parseAsync(formValues);

			const result = await createContent(
				prevState,
				formData,
				valueContent
			);

			if (result.status == 'SUCCESS') {
				toast({
					title: 'Success',
					description:
						'Your content has been created successfully. Taking you to content. Please wait ... 😁',
				});

				router.push(`/content/${result._id}`);
			}

			return result;
		} catch (error) {
			if (error instanceof z.ZodError) {
				const fieldErorrs = error.flatten().fieldErrors;

				setError(fieldErorrs as unknown as Record<string, string>);

				toast({
					title: 'Error',
					description: 'Please check your inputs and try again',
					variant: 'destructive',
				});

				return {
					...prevState,
					error: 'Validation failed',
					status: 'ERROR',
				};
			}

			toast({
				title: 'Error',
				description: 'An unexpected error has occurred',
				variant: 'destructive',
			});

			return {
				...prevState,
				error: 'An unexpected error has occurred',
				status: 'ERROR',
			};
		}
	};

	const [state, formAction, isPending] = useActionState(handleSubmit, {
		error: '',
		status: 'INITIAL',
	});

	return (
		<>
			<form action={formAction} className="content-form">
				<div>
					<label htmlFor="title" className="content-form_label">
						Title
					</label>
					<Input
						id="title"
						name="title"
						className="content-form_input"
						required
						placeholder="Your Title Here"
					/>
					{error.title && (
						<p className="content-form_error">{error.title}</p>
					)}
				</div>

				<div>
					<label htmlFor="description" className="content-form_label">
						Description
					</label>
					<Textarea
						id="description"
						name="description"
						className="content-form_textarea"
						required
						placeholder="Your Description Here"
					/>
					{error.description && (
						<p className="content-form_error">
							{error.description}
						</p>
					)}
				</div>

				<div>
					<label htmlFor="category" className="content-form_label">
						Category
					</label>
					<Input
						id="category"
						name="category"
						className="content-form_input"
						required
						placeholder="Your Category Here"
					/>
					{error.category && (
						<p className="content-form_error">{error.category}</p>
					)}
				</div>

				<div>
					<label htmlFor="link" className="content-form_label">
						Image URL
					</label>
					<Input
						id="link"
						name="link"
						className="content-form_input"
						required
						placeholder="Your Image Here"
					/>
					{error.link && (
						<p className="content-form_error">{error.link}</p>
					)}
				</div>

				<div data-color-mode="light">
					<label
						htmlFor="valueContent"
						className="content-form_label"
					>
						Pitch
					</label>
					<MarkdownEditor
						value={valueContent}
						onChange={(value) => setValueContent(value || '')}
						id="valueContent"
						preview="edit"
						height={300}
						style={{ borderRadius: 20, overflow: 'hidden' }}
						textareaProps={{
							placeholder:
								'Briefly describe your idea and what problem it solves',
						}}
						previewOptions={{
							disallowedElements: ['style'],
						}}
					/>
					{error.pitch && (
						<p className="content-form_error">{error.pitch}</p>
					)}
				</div>
				<Button
					type="submit"
					className="content-form_btn text-white"
					disabled={isPending}
				>
					{isPending ? 'Submitting...' : 'Submit Your Work'}
					<Send className="size-6" />
				</Button>
			</form>
		</>
	);
};

export default ContentForm;
