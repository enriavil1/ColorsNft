const getRandomInt = (x, y = 0) => {
	return Math.random() * x + y;
};

export const generateHexColor = () => {
	const letters = ["A", "B", "C", "D", "E", "F"];
	const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	let hexColor = "#";

	while (hexColor.length < 7) {
		if (getRandomInt(1) > 0.5) {
			let randomLetter = letters[Math.floor(getRandomInt(6))];
			hexColor += randomLetter;
		} else {
			let randomNumber = numbers[Math.floor(getRandomInt(10))];
			hexColor += randomNumber;
		}
	}

	return hexColor;
};
