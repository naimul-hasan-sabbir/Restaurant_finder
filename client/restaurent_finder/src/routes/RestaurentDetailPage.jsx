import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RestaurentFinder from '../apis/RestaurentFinder';
import StarRating from '../components/StarRating';
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

	return <div>{selectedRestaurent && <StarRating rating={3} />}</div>;
};

export default RestaurentDetailPage;
