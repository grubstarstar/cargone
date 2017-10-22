import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import 'bootstrap';

import './App.css';
import NavBar, { NavItem } from './components/navbar';
import LoggedOutLayout from './components/layout/logged-out';
import Home from './components/home';
import BookAJob from './components/book-a-job';
import About from './components/about';
import DeliveryRange from './components/delivery-range';
import SignIn from './components/sign-in';
import Contact from './components/contact';
import Service from './components/service';

import store from './config/store';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<LoggedOutLayout>
						<NavBar>
							<NavItem to="/">Home</NavItem>
							<NavItem to="/book-a-job">Book a job</NavItem>
							<NavItem to="/about">About</NavItem>
							<NavItem to="/delivery-range">Delivery range</NavItem>
							<NavItem to="/contact">Contact us</NavItem>
							<NavItem to="/service">Service</NavItem>
							<NavItem to="/sign-in">Sign in</NavItem>
						</NavBar>
						<Route exact path="/" component={Home}/>
						<Route exact path="/book-a-job" component={BookAJob}/>
						<Route path="/about" component={About}/>
						<Route path="/delivery-range" component={DeliveryRange}/>
						<Route path="/contact" component={Contact}/>
						<Route path="/service" component={Service}/>
						<Route path="/sign-in" component={SignIn}/>
					</LoggedOutLayout>
				</Router>
			</Provider>
		);
	}
}

export default App;
