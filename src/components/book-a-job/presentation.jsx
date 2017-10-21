import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class extends Component {
	constructor(props) {
		super(props);
		console.log('props', props);
		this._pickupAddressInputProps = {
			value: '',
			onChange: address => this.props.onChange('pickupAddress', address),
			onBlur: () => {
				console.log('blur!');
			},
			type: 'search',
			placeholder: 'Pickup address...',
			autoFocus: true,
		}
		this._deliveryAddressInputProps = {
			value: '',
			onChange: address => this.props.onChange('deliveryAddress', address),
			onBlur: () => {
				console.log('blur!');
			},
			type: 'search',
			placeholder: 'Delivery address...',
			autoFocus: true,
		}
		this.submit = this.submit.bind(this);
	}
	submit(event) {
		event.preventDefault()
		this.props.submit(this.props.form);
		// geocodeByAddress(this.state.pickupAddress)
		// .then(results => getLatLng(results[0]))
		// .then(results => {
		// 	this.props.submit({...this.state,
		// 		pickupAddress: results[0].formatted_address);
		// })
		// .catch(error => console.error('Error', error))
	}
	render() {
		return (
			<div>
				<h2>Book a Job</h2>
				<p>{this.props.isSubmitting ? "SUBMITTING":""}</p>
				<p>{JSON.stringify(this.props.form)}</p>
				<p>No account required. We offer the most direct courier service in Melbourne, your booking is sent to all our couriers. When booking please give as much 'Additional Information' as you can, Its most helpful if you make a description of your delivery. This will improve the service provided as it makes the couriers job easier. By completing a booking your agreeing to Cargone Couriers Terms and Conditions
		Booking confirmation if requested is sent only after a courier has accepted your booking on the day of service.</p>
				<h3>Personal information</h3>
				<form className="form" onSubmit={this.submit}>
					<div className="form-group">
						<label for="customerName">Name</label>
						<input
							value={this.props.form.customerName}
							onChange={event => this.props.onChange('customerName', event.target.value)}
							type="text"
							className="form-control"
							id="customer-name"
							placeholder="Enter your name"
						/>
					</div>
					<div className="form-group">
						<label for="companyName">Company name</label>
						<input
							value={this.props.form.companyName}
							onChange={event => this.props.onChange('companyName', event.target.value)}
							type="text"
							className="form-control"
							id="customer-companyName"
							placeholder="Enter your company's n
						me" />
					</div>
					<div className="form-group">
						<label for="emailAddress">Email address</label>
						<input
							value={this.props.form.emailAddress}
							onChange={event => this.props.onChange('emailAddress', event.target.value)}
							type="email"
							className="form-control"
							id="customer-emailAddress"
							aria-describedby="emailHelp"
							placeholder="Enter email"
						/>
						<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
					</div>
					<div className="form-group">
						<label for="phoneNumber">Contact number</label>
						<input
							value={this.props.form.phoneNumber}
							onChange={event => this.props.onChange('phoneNumber', event.target.value)}
							type="tel"
							className="form-control"
							id="customer-phoneNumber"
							placeholder="Your contact phone number"
						/>
					</div>

					<h3>Pick up address</h3>
					<div className="form-group">
						<label for="customerName">Contact name</label>
						<input
							type="text"
							className="form-control"
							id="pickup-name"
							placeholder="Enter contact name"
						/>
					</div>
					<div className="form-group">
						<label for="companyName">Company name</label>
						<input
							type="text"
							className="form-control"
							id="pickup-companyName"
							placeholder="Enter company name"
						/>
					</div>
					<div className="form-group">
						<label for="address">Pick up address</label>
						<PlacesAutocomplete inputProps={{
							...this._pickupAddressInputProps,
							value: this.props.form.pickupAddress
						}} />
					</div>

					<h3>Drop off address</h3>
					<div className="form-group">
						<label for="customerName">Contact name</label>
						<input
							type="text" className="form-control" id="delivery-name" placeholder="Enter contact name" />
					</div>
					<div className="form-group">
						<label for="companyName">Company name</label>
						<input
							type="text" className="form-control" id="delivery-companyName" placeholder="Enter company name" />
					</div>
					<div className="form-group">
						<label for="address">Delivery address</label>
						<PlacesAutocomplete inputProps={{
							...this._deliveryAddressInputProps,
							value: this.props.form.deliveryAddress
						}} />
					</div>
					<button type="submit" className="btn btn-primary">{!this.props.isSubmitting ? "Add this job +" : "Adding job..."}</button>
					<div class="alert alert-danger">
						<strong>Danger!</strong> Indicates a dangerous or potentially negative action.
					</div>
				</form>
			</div>
		)
	}
}