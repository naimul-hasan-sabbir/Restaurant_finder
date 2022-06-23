import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RestaurentFinder from '../apis/RestaurentFinder';
import Reviews from '../components/Reviews';
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

	return (
		<div>
			{selectedRestaurent && (
				<>
					<div className="mt-3">
						<Reviews />
					</div>
				</>
			)}
		</div>
	);
};

export default RestaurentDetailPage;
