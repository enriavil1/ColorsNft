import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Color from "./components/Color";
import Mint from "./components/Mint";

import "./App.css";
import { loadWeb3 } from "./functions/checkWeb3";
import { generateHexColor } from "./functions/generateHex.js";
import "bootstrap/dist/css/bootstrap.min.css";
import ConnectButton from "./components/ConnectButton";

export function App() {
	const [colors, setColors] = useState([]);
	const [account, setAccount] = useState("");
	const [contract, setContract] = useState();
	const [currentBalance, setCurrentBalance] = useState(0);

	useEffect(async () => {
		if (account?.length > 0) {
			const userColors = await contract?.methods
				.getOwnersOfAColor()
				.call({ from: account });
			setColors(userColors);
			setCurrentBalance(userColors?.length);
		} else {
			setAccount("");
			setColors([]);
			setCurrentBalance(0);
		}
	}, [account]);

	const connectToContract = async () => {
		const colorJson = require("./build/contracts/Color.json");
		const networkId = await window.web3.eth.net.getId();
		const networkData = colorJson.networks[networkId];

		if (networkData) {
			const address = networkData.address;
			const abi = colorJson.abi;
			const colorContract = new window.web3.eth.Contract(abi, address);
			setContract(colorContract);
			const userColors = await colorContract.methods
				.getOwnersOfAColor()
				.call({ from: account });
			setColors(userColors);
			setCurrentBalance(userColors.length);
		}
	};

	const handleMinting = () => {
		const color = generateHexColor();
		contract?.methods
			.mintToken(color)
			.send({ from: account })
			.then((res) => {
				setColors([...colors, color]);
				updateBalance();
			})
			.catch((err) => console.log("error"));

		console.log(`Minted color: ${color}`);
	};

	const updateBalance = async () => {
		let userColors = await contract?.methods
			.getOwnersOfAColor()
			.call({ from: account });
		setCurrentBalance(userColors?.length);
	};

	const connectToWeb3 = async () => {
		await loadWeb3();
		if (window.ethereum) {
			try {
				await connectToContract();
			} catch {
				alert("Contract has not yet been deployed");
			}
		} else return;

		let accounts = await window.web3.eth.getAccounts();
		setAccount(accounts[0]);
	};

	if (window.ethereum) {
		window.ethereum.on("accountsChanged", async () => {
			if (account?.length > 0) {
				let accounts = await window.web3.eth.getAccounts();
				setAccount(accounts[0]);
			}
		});
	}

	return (
		<div className='App '>
			<Navbar
				balance={currentBalance}
				account={account}
				connectToWeb3={connectToWeb3}
				handleMinting={handleMinting}
			/>
			<div className='container'>
				<div key={account} className='row justify-content-center'>
					{account?.length === 0 ? (
						<ConnectButton connectToWeb3={connectToWeb3} />
					) : (
						<Mint handleMinting={handleMinting} />
					)}
				</div>
				<div className='row justify-content-center'>
					{colors ? (
						colors.map((color) => <Color color={color} />)
					) : (
						<div className='container'>
							<h1>No colors Minted</h1>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
