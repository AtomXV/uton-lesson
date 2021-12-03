pragma solidity ^0.8.0;

contract Storage {
    string data;
    function store (string memory _data) public {
        data = _data;
    }
    function get () public view returns (string) {
        return data;
    }

}