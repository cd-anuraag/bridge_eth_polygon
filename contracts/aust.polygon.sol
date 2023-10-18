/**
 *Submitted for verification at PolygonScan.com on 2023-10-18
*/

/**
 *Submitted for verification at Etherscan.io on 2023-10-13
*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract ERC20Token {
    address public owner = 0x88bD0CBFA93a5c34A3Ac23F005C269935Cfdd904;
    string public name = "AnuraagUSDT";
    string public symbol = "AUSDT";
    uint8 public decimals = 18;
    uint public totalSupply;

    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
    event Burn(address indexed from, uint value);
    event Mint(address indexed to, uint value);


    function transfer(address to, uint value) public returns (bool) {
        require(to != address(0), "Invalid address");
        require(balanceOf[msg.sender] >= value, "Insufficient balance");

        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);

        return true;
    }

    function approve(address spender, uint value) public returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transferFrom(address from, address to, uint value) public returns (bool) {
        require(from != address(0), "Invalid address");
        require(to != address(0), "Invalid address");
        require(balanceOf[from] >= value, "Insufficient balance");
        require(allowance[from][msg.sender] >= value, "Allowance exceeded");

        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[from][msg.sender] -= value;

        emit Transfer(from, to, value);

        return true;
    }

    function mint(address to, uint value) public {
        require(msg.sender == owner, "Only owner can mint");
        require(to != address(0), "Invalid address");

        balanceOf[to] += value;
        totalSupply += value;

        emit Mint(to, value);
    }

    function burn(address from, uint value) public {
        require(msg.sender == owner, "Only owner can burn");
        require(from != address(0), "Invalid address");
        require(balanceOf[from] >= value, "Insufficient balance");
        balanceOf[from] -= value;
        totalSupply -= value;
        emit Burn(from, value);
    }
}