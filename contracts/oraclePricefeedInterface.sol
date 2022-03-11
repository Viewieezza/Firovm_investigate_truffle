pragma solidity ^0.6.0;

interface oraclePricefeedInterface{
    
    function getPrice() external view returns(uint256);
    
}