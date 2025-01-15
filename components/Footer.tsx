'use client';

const Footer = () => {
	// const [email, setEmail] = useState('');

	// const handleSubmit = (e: FormEvent) => {
	// 	e.preventDefault();

	// 	if (!email) {
	// 		alert('Please enter a valid email address');
	// 		return;
	// 	}

	// 	console.log('Email submitted:', email);
	// 	setEmail('');
	// };

	return (
		<div className="ml-4 mr-4 mt-2 mb-6">
			<div className="w-full bg-primary h-fit text-white flex  items-center md:py-10 py-8 px-8  md:px-12 rounded-lg  justify-between">
				<p className="text-sm md:text-base">Stilino. Made in 2025.</p>
				<p className="text-sm md:text-base">Dev 👋</p>

				{/* <h1 className="px-4 py-2 tracking-tighter font-semibold text-whiteBg text-[32px] md:text-[72px] sm:text-[48px] max-w-4xl text-center my-4 sm:leading-[48px] leading-[30px]">
					STILINO.
				</h1> */}
				{/* <div className="w-full flex items-center justify-center flex-col">
					<p className="font-normal text-sm sm:text-base text-white max-w-2xl text-center">
						{message}
					</p>
					<form
						onSubmit={handleSubmit}
						className="max-w-lg w-full mt-8 flex items-center gap-3"
					>
						<input
							type="email"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="flex-1 text-base placeholder:text-black placeholder:opacity-40 placeholder:text-sm w-full h-auto outline-none rounded-full px-4 py-2"
						/>
						<button
							type="submit"
							className="rounded-full bg-tertiary px-4 py-2 text-white text-sm font-semibold"
						>
							Subscribe
						</button>
					</form>
				</div> */}
				{/* <div className="border-t-2 border-tertiary border-opacity-10 mt-auto flex justify-between w-full px-3 md:px-12 py-3 text-white text-base font-medium">			 */}

				{/* </div> */}
			</div>
		</div>
	);
};

export default Footer;
