import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';

export const showSuccessToast = (message) => {
	toast.success(message);
};

export const showErrorToast = (message) => {
	toast.error(message);
};

const Toast = () => {
	return <ToastContainer />;
};

export default Toast;
