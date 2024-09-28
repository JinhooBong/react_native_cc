import React from 'react';

const useAppwrite = (fn) => {
	const [data, setData] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	const fetchData = async () => {
		setIsLoading(true);

		try {
			const response = await fn();
			setData(response);
		} catch (error) {
			Alert.alert('Error', error.message);
		} finally {
			setIsLoading(false);
		}
	}

	React.useEffect(() => {
		fetchData();
	}, []);

	const refetch = () => fetchData();

	return { data, isLoading, refetch };
}

export default useAppwrite;