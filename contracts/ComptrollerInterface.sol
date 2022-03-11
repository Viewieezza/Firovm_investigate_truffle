pragma solidity ^0.6.0;

interface ComptrollerInterface{
    
    function liquidityOf(address account) external view returns (uint256);
    function borrowOf(address account) external view returns (uint256);
    function AllowAmountBorrow(address account)external view returns(uint256);
    function AllowRedeem(address account, uint256 valueAmountRedeem) external view returns(bool);
    
    event LiquidityOf (address indexed);
}