import React from "react";

function ConnectButton(props) {
	return (
		<button
			type='button'
			className='btn btn-danger btn-lg mt-3'
			onClick={() => props.connectToWeb3()}
			style={{ maxWidth: "500px" }}
			onSubmit={(event) => {
				event.preventDefault();
			}}
		>
			Please connect to account
		</button>
	);
}

export default ConnectButton;
