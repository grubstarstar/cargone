import React from 'react';
import {
	NavLink
} from 'react-router-dom';

export default ({children}) => (
	<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
		<a className="navbar-brand" href="#">Cargone Couriers</a>
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>
		<div className="collapse navbar-collapse" id="navbarNav">
			<ul className="navbar-nav">
				{children}
			</ul>
		</div>
	</nav>
)

export const NavItem = ({children, to}) => (
	<li className="nav-item">
		<NavLink className="nav-link" activeClassName="active" to={to}>
			{children}
		</NavLink>
	</li>
)