import React from "react";

function Mint(props) {
	const handleClick = () => props.handleMinting();
	return (
		<button
			type='button'
			className='btn btn-primary btn-lg mt-3 mb-2'
			onClick={handleClick}
			style={{ maxWidth: "500px" }}
		>
			MINT
		</button>
	);
}

export default Mint;
