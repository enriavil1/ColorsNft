const Color = artifacts.require("../contracts/Color.sol");
const assert = require("assert");
const { default: Web3 } = require("web3");

contract("Color", () => {
	let contract;
	let accounts;
	let account;
	beforeEach(async () => {
		contract = await Color.deployed();
		accounts = await web3.eth.getAccounts();
		account = accounts[0];
	});

	describe("contructor", () => {
		it("should construct the contract", () => {
			console.log(contract.address);
			assert(contract.address !== "");
			assert(contract.address !== "0x0");
		});
	});

	describe("minting", () => {
		it("should mint a color", async () => {
			await contract.mintToken("#ffffff");

			let address = await contract.colors("#ffffff");

			console.log(account);
			assert(address !== "");
			assert(typeof address !== undefined);
			assert(address !== null);
			assert(address === account);
		});
	});
});
