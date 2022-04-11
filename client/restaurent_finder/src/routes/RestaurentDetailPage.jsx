import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RestaurentFinder from '../apis/RestaurentFinder';
import { RestaurentsContext } from '../context/RestaurentContext';

const RestaurentDetailPage = () => {
	const { id } = useParams();
	const { selectedRestaurent, setSelectedRestaurent } =
		useContext(RestaurentsContext);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await RestaurentFinder.get(`/${id}`);

				setSelectedRestaurent(response.data.data.restaurent);
			} catch (err) {
				console.log(err);
			}
		};

		fetchData();
	}, []);

	return <div>{selectedRestaurent && selectedRestaurent.name}</div>;
};

export default RestaurentDetailPage;
