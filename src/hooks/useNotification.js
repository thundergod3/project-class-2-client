import { toast } from "react-toastify";

const toastConfig = {
	autoClose: 5000,
	position: toast.POSITION.TOP_CENTER,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
};

const useNotification = () => {
	const openNotificationSuccess = (title) =>
		toast(title, {
			type: toast.TYPE.SUCCESS,
			...toastConfig,
		});

	const openNotificationInfo = (title) =>
		toast(title, {
			type: toast.TYPE.INFO,
			...toastConfig,
		});

	const openNotificationError = (title) =>
		toast(title, {
			type: toast.TYPE.ERROR,
			...toastConfig,
		});

	return {
		openNotificationSuccess,
		openNotificationInfo,
		openNotificationError,
	};
};

export default useNotification;
