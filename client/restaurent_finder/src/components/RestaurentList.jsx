import React, { useContext, useEffect } from 'react';
import RestaurentFinder from '../apis/RestaurentFinder';
import { RestaurentsContext } from '../context/RestaurentContext';
import { useNavigate } from 'react-router-dom';

const RestaurentList = (props) => {
	const { restaurents, setRestaurents } = useContext(RestaurentsContext);
	let navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await RestaurentFinder.get('/');
				setRestaurents(response.data.data.restaurents);
			} catch (err) {}
		};
		fetchData();
	}, []);

	const handleDelete = async (e, id) => {
		e.stopPropagation();

		try {
			const response = await RestaurentFinder.delete(`/${id}`);
			setRestaurents(
				restaurents.filter((restaurent) => {
					return restaurent.id !== id;
				})
			);
		} catch (err) {
			console.log(err);
		}
	};

	const handleUpdate = (e, id) => {
		e.stopPropagation();
		navigate(`/restaurents/${id}/update`);
	};

	const handleRestaurentSelect = (id) => {
		navigate(`/restaurents/${id}`);
	};

	return (
		<div className="list-group">
			<table class="table table-dark table-hover">
				<thead class="thead-dark">
					<tr>
						<th scope="col">Restaurant</th>
						<th scope="col">Location</th>
						<th scope="col">Price Range</th>
						<th scope="col">Ratings</th>
						<th scope="col">Edit</th>
						<th scope="col">Delete</th>
					</tr>
				</thead>
				<tbody>
					{restaurents &&
						restaurents.map((restaurent) => {
							return (
								<tr
									onClick={() => handleRestaurentSelect(restaurent.id)}
									key={restaurent.id}
								>
									<td>{restaurent.name}</td>
									<td>{restaurent.location}</td>
									<td>{restaurent.price_range}</td>
									<td>reviews</td>
									<td>
										<button
											onClick={(e) => handleUpdate(e, restaurent.id)}
											className="bt btn-warning"
										>
											Update
										</button>
									</td>
									<td>
										<button
											onClick={(e) => handleDelete(e, restaurent.id)}
											className="btn btn-danger"
										>
											Delete
										</button>
									</td>
								</tr>
							);
						})}
					{/* <tr>
						<td>Burger King</td>
						<td>Mirpur-1</td>
						<td>$$$</td>
						<td>Rating</td>
						<td>
							<button className="bt btn-warning">Update</button>
						</td>
						<td>
							<button className="btn btn-danger">Delete</button>
						</td>
					</tr>
					<tr>
						<td>Burger King</td>
						<td>Mirpur-1</td>
						<td>$$$</td>
						<td>Rating</td>
						<td>
							<button className="bt btn-warning">Update</button>
						</td>
						<td>
							<button className="btn btn-danger">Delete</button>
						</td>
					</tr> */}
				</tbody>
			</table>
		</div>
	);
};

export default RestaurentList;
