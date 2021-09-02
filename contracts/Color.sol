pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract Color is ERC721{
    uint256 public tokenId;
    mapping(uint256 => string) public tokenIdToColors;
    mapping(string => address) public colors;
    mapping(address => string[]) public ownersOfColors;

    constructor() ERC721("Color", "COLOR"){
    }

    modifier newColor(string memory _color){
        require(colors[_color] == address(0));
        _;
    }

    function mintToken(string memory _color) external newColor(_color) returns(uint256){

        tokenId = tokenId + 1;

        _mint(msg.sender, tokenId);

        colors[_color] = msg.sender;
        tokenIdToColors[tokenId] = _color;
        ownersOfColors[msg.sender].push(_color);
        return tokenId;
    }

    function getOwnersOfAColor() view external returns(string[] memory){
        return ownersOfColors[msg.sender];
    }
}