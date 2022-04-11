import React from 'react';
import AddRestaurent from '../components/AddRestaurent';
import Header from '../components/Header';
import RestaurentList from '../components/RestaurentList';

const Home = () => {
	return (
		<div>
			<Header />
			<AddRestaurent />
			<RestaurentList />
		</div>
	);
};

export default Home;
