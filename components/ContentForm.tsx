'use client';
import React, { useActionState, useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';

const ContentForm = () => {
	const [error, setError] = useState<Record<string, string>>({});
	const [valueContent, setValueContent] = useState('');
	const isPending = false;

	return (
		<>
			<form action={() => {}} className="content-form">
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
					<label htmlFor="pitch" className="content-form_label">
						Pitch
					</label>
					<MarkdownEditor
						value={valueContent}
						onChange={setValueContent}
						id="pitch"
						style={{
							borderRadius: 30,
							overflow: 'hidden',
							height: '300px',
						}}
						placeholder="Briefly describe your idea and what problem it solves"
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
