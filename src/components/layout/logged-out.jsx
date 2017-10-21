import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from '../../images/logo-black.png';

export default ({children}) => (
	<div className="container">
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
		</header>
		
		<div className="row">
			<div className="col-md-12">
				{children}
			</div>
		</div>

		<div className="row">
			<div className="col-md-12">
				<p>Footer</p>
			</div>
		</div>        
	</div>
)