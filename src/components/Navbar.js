import React from "react";

function Navbar(props) {
	return (
		<nav className='navbar navbar-expand-md navbar-dark bg-dark justify-content-lg-between'>
			<h2 className='navbar-brand' style={{ marginLeft: "20px" }}>
				{props.balance}
			</h2>

			<h6 className='navbar-text' style={{ marginRight: "20px" }}>
				{props.account}
			</h6>
		</nav>
	);
}

export default Navbar;
