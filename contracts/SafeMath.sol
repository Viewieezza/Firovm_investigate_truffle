pragma solidity ^0.6.0;

library SafeMath {
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
      assert(b <= a);
      return a - b;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
      uint256 c = a + b;
      assert(c >= a);
      return c;
    }
    
    function mul(uint256 a, uint256 b) internal pure returns (uint256){
        uint256 c = a * b;
        assert(c >= a);
        return c;
    }
    
    function div(uint256 a, uint256 b) internal pure returns (uint256){
        assert(b>0);
        return a / b;
    }
}