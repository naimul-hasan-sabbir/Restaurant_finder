import React, { useContext, useState } from 'react';
import RestaurentFinder from '../apis/RestaurentFinder';
import { RestaurentsContext } from '../context/RestaurentContext';

const AddRestaurent = () => {
	const { addrestaurents } = useContext(RestaurentsContext);

	const [name, setName] = useState('');
	const [location, setLocation] = useState('');
	const [priceRange, setPriceRange] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await RestaurentFinder.post('/', {
				name,
				location,
				price_range: priceRange,
			});
			addrestaurents(response.data.data.restaurent);
			console.log(response);
		} catch (err) {}
	};

	return (
		<div>
			<form action="">
				<div class="row">
					<div className="col">
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							type="text"
							class="form-control"
							placeholder="Name"
						/>
					</div>
					<div className="col">
						<input
							value={location}
							onChange={(e) => setLocation(e.target.value)}
							type="text"
							class="form-control"
							placeholder="Location"
						/>
					</div>
					<div className="col">
						<select
							value={priceRange}
							onChange={(e) => setPriceRange(e.target.value)}
							class="form-select"
							aria-label="Default select example"
						>
							<option selected>Price Range</option>
							<option value="100">$</option>
							<option value="200">$$</option>
							<option value="300">$$$</option>
							<option value="400">$$$$</option>
							<option value="500">$$$$$</option>
						</select>
					</div>

					<div class="col">
						<button
							onClick={handleSubmit}
							type="submit"
							class="btn btn-primary mb-3"
						>
							Add
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddRestaurent;
