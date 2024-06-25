import { useGetUser, useUpdateUser } from '../api/UserApi';

import LoadingMessage from '../components/LoadingMessage';
import UserProfileForm from '../forms/UserProfileForm';

const UserProfilePage = () => {
	const { user, isLoading: isGetLoading } = useGetUser();
	const { updateUser, isLoading: isUpdateLoading } = useUpdateUser();

	if (isGetLoading) {
		return <LoadingMessage />;
	}

	return (
		<div>
			<h2 className='text-2xl tracking-wider mb-6'>User Profile</h2>
			{user && (
				<UserProfileForm
					onSubmit={updateUser}
					isLoading={isUpdateLoading}
					user={user}
				/>
			)}
		</div>
	);
};

export default UserProfilePage;
