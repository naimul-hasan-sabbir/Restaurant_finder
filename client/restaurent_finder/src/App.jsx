import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import UpdatePage from './routes/UpdatePage';
import RestaurentDetailPage from './routes/RestaurentDetailPage';
import {
	RestaurentsContext,
	RestaurentsContextProvider,
} from './context/RestaurentContext';

const App = () => {
	return (
		<RestaurentsContextProvider>
			<div class="container">
				<Router>
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route
							exact
							path="/restaurents/:id/update"
							element={<UpdatePage />}
						/>
						<Route
							exact
							path="/restaurents/:id"
							element={<RestaurentDetailPage />}
						/>
					</Routes>
				</Router>
			</div>
		</RestaurentsContextProvider>
	);
};

export default App;
