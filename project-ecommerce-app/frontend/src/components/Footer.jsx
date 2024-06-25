const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<div className='bg-primary-black text-primary-gray text-sm w-full p-6'>
			<p className='container mx-auto text-center'>
				&copy; {currentYear} <span className='ml-2'>Dominika Jelińska</span>
			</p>
		</div>
	);
};

export default Footer;
