import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class extends Component {
	constructor(props) {
		super(props);
		this._cssClasses = {
			root: 'form-group',
			input: 'form-control',
			autocompleteContainer: 'my-autocomplete-container'
		}
		this._pickupAddressInputProps = {
			value: '',
			onChange: address => this.props.onChange('pickupAddress', address),
			onBlur: () => {
				console.log('blur!');
			},
			type: 'search',
			placeholder: 'Pickup address...',
			autoFocus: false,
		}
		this._deliveryAddressInputProps = {
			value: '',
			onChange: address => this.props.onChange('deliveryAddress', address),
			onBlur: () => {
				console.log('blur!');
			},
			type: 'search',
			placeholder: 'Delivery address...',
			autoFocus: false,
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
				<p>No account required. We offer the most direct courier service in Melbourne, your booking is sent to all our couriers. When booking please give as much 'Additional Information' as you can, It's most helpful if you make a description of your delivery. This will improve the service provided as it makes the couriers job easier. By completing a booking you're agreeing to Cargone Couriers Terms and Conditions</p>
				<p>Booking confirmation if requested is sent only after a courier has accepted your booking on the day of service.</p>
				<h3>Personal information</h3>
				<form className="form" onSubmit={this.submit}>
					<div className="form-group">
						<label htmlFor="customerName">Name</label>
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
						<label htmlFor="companyName">Company name</label>
						<input
							value={this.props.form.companyName}
							onChange={event => this.props.onChange('companyName', event.target.value)}
							type="text"
							className="form-control"
							id="customer-companyName"
							placeholder="Enter your company's name" />
					</div>
					<div className="form-group">
						<label htmlFor="emailAddress">Email address</label>
						<input
							value={this.props.form.emailAddress}
							onChange={event => this.props.onChange('emailAddress', event.target.value)}
							type="email"
							className="form-control"
							id="customer-emailAddress"
							aria-describedby="emailHelp"
							placeholder="Enter email"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="phoneNumber">Contact number</label>
						<input
							value={this.props.form.phoneNumber}
							onChange={event => this.props.onChange('phoneNumber', event.target.value)}
							type="tel"
							className="form-control"
							id="customer-phoneNumber"
							placeholder="Your contact phone number"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="additionalInformation">Additional information</label>
						<textarea
							value={this.props.form.additionalInformation}
							onChange={event => this.props.onChange('additionalInformation', event.target.value)}
							type="tel"
							className="form-control"
							id="additionalInformation"
							placeholder="any additional information"
						/>
					</div>

					<h3>Pick up address</h3>
					<div className="form-group">
						<label htmlFor="pickupName">Contact name</label>
						<input
							value={this.props.form.pickupName}
							onChange={event => this.props.onChange('pickupName', event.target.value)}
							type="text"
							className="form-control"
							id="pickup-name"
							placeholder="Enter contact name"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="pickupCompanyName">Company name</label>
						<input
							value={this.props.form.pickupCompanyName}
							onChange={event => this.props.onChange('pickupCompanyName', event.target.value)}
							type="text"
							className="form-control"
							id="pickupCompanyName"
							placeholder="Enter company name"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="address">Pick up address</label>
						<PlacesAutocomplete classNames={this._cssClasses} inputProps={{
							...this._pickupAddressInputProps,
							value: this.props.form.pickupAddress
						}} />
					</div>
					<div className="form-group">
						<label htmlFor="pickupPhoneNumber">Contact number</label>
						<input
							value={this.props.form.pickupPhoneNumber}
							onChange={event => this.props.onChange('pickupPhoneNumber', event.target.value)}
							type="tel"
							className="form-control"
							id="pickup-PhoneNumber"
							placeholder="Your contact phone number"
						/>
					</div>

					<h3>Drop off address</h3>
					<div className="form-group">
						<label htmlFor="deliveryName">Contact name</label>
						<input
						value={this.props.form.deliveryName}
							onChange={event => this.props.onChange('deliveryName', event.target.value)}
							type="text"
							className="form-control"
							id="pickup-name"
							placeholder="Enter contact name"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="deliveryCompanyName">Company name</label>
						<input
							value={this.props.form.deliveryCompanyName}
							onChange={event => this.props.onChange('deliveryCompanyName', event.target.value)}
							type="text"
							className="form-control"
							id="deliveryCompanyName"
							placeholder="Enter company name"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="address">Delivery address</label>
						<PlacesAutocomplete classNames={this._cssClasses} inputProps={{
							...this._deliveryAddressInputProps,
							value: this.props.form.deliveryAddress
						}} />
					</div>
					<div className="form-group">
						<label htmlFor="deliveryPhoneNumber">Contact number</label>
						<input
							value={this.props.form.deliveryPhoneNumber}
							onChange={event => this.props.onChange('deliveryPhoneNumber', event.target.value)}
							type="tel"
							className="form-control"
							id="delivery-PhoneNumber"
							placeholder="Your contact phone number"
						/>
					</div>
					<button type="submit" className="btn btn-primary">{!this.props.isSubmitting ? "Add this job +" : "Adding job..."}</button>
				</form>
			</div>
		)
	}
}