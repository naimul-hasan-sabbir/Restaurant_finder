import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RestaurentFinder from '../apis/RestaurentFinder';
import { RestaurentsContext } from '../context/RestaurentContext';

const Updaterestaurent = (props) => {
	const { id } = useParams();
	let navigate = useNavigate();
	//const { restaurents } = useContext(RestaurentsContext);
	//console.log(test);
	const [name, setName] = useState('');
	const [location, setLocation] = useState('');
	const [priceRange, setPriceRange] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			const response = await RestaurentFinder.get(`/${id}`);
			setName(response.data.data.restaurent.name);
			setLocation(response.data.data.restaurent.location);
			setPriceRange(response.data.data.restaurent.price_range);
		};
		fetchData();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const updateRestaurent = await RestaurentFinder.put(`/${id}`, {
			name,
			location,
			price_range: priceRange,
		});
		navigate('/');
	};

	return (
		<div>
			<form action="">
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						id="name"
						className="form-control"
						type="text"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="location">Location</label>
					<input
						value={location}
						onChange={(e) => setLocation(e.target.value)}
						id="location"
						className="form-control"
						type="text"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="price_range">Price Range</label>
					<input
						value={priceRange}
						onChange={(e) => setPriceRange(e.target.value)}
						id="price_range"
						className="form-control"
						type="number"
					/>
				</div>
				<button onClick={handleSubmit} type="button" class="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
};

export default Updaterestaurent;
