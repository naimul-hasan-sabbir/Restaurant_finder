import React, { useState, createContext } from 'react';

export const RestaurentsContext = createContext();

export const RestaurentsContextProvider = (props) => {
	const [restaurents, setRestaurents] = useState([]);
	const [selectedRestaurent, setSelectedRestaurent] = useState([]);

	const addRestaurents = (restaurent) => {
		setRestaurents([...restaurents, restaurent]);
	};

	return (
		<RestaurentsContext.Provider
			value={{
				restaurents,
				setRestaurents,
				addRestaurents,
				selectedRestaurent,
				setSelectedRestaurent,
			}}
		>
			{props.children}
		</RestaurentsContext.Provider>
	);
};
