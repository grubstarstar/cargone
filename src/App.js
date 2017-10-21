import React, { Component } from 'react';
import { Provider } from 'react-redux';

import './App.css';
import LoggedOutLayout from './components/layout/logged-out';
import BookAJob from './components/book-a-job';
import store from './config/store'

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<LoggedOutLayout>
					<BookAJob />
				</LoggedOutLayout>
			</Provider>
		);
	}
}

export default App;
