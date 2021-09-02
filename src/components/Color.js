import React from "react";

function Color(props) {
	return (
		<div className='card col-md-3' style={{ margin: "6px", maxWidth: "330px" }}>
			<div
				className='color rounded-circle mt-5'
				style={{ backgroundColor: `${props.color}` }}
			></div>
			<div className='card-body'></div>
			<p className='card-title mx-auto mb-5'>{props.color}</p>
		</div>
	);
}

export default Color;
