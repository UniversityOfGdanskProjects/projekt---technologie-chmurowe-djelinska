import { PiSpinnerThin } from 'react-icons/pi';

const LoadingMessage = () => {
	return (
		<div className='flex gap-4 items-center'>
			<PiSpinnerThin />
			Loading...
		</div>
	);
};

export default LoadingMessage;
