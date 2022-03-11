pragma solidity ^0.6.0;

import "./cTokenInterface.sol";
import "./SafeMath.sol";
import "./IERC20.sol";
import "./ComptrollerInterface.sol";


contract myComptroller is ComptrollerInterface{
    address [] MarketList;
    address public admin_;
    address public CompAddress_;
    
    IERC20 CompContract_;
    
    constructor() public {
        admin_ = msg.sender;
    }
    
    mapping(address => address []) userMarket;
    
    //add & remove CTokenAddressList to MarketList
    
    function addToMarket(address CTokenAddress) external returns(bool){
        require(msg.sender == admin_);
        MarketList.push(CTokenAddress);
        //approve(CTokenAddress,1e18);
        return true;
        
    }
    
    
    function removeFromMarket(address CTokenAddress) external returns(bool){
        require(msg.sender == admin_);
        uint index = getAddressIndex(CTokenAddress);
        require(index != 101);
        MarketList[index] = MarketList[MarketList.length -1];
        MarketList.pop();
        return true;
    }
    
    function EnterMarket(address CTokenAddress) external {
        require(checkUserMarket(CTokenAddress));
        userMarket[msg.sender].push(CTokenAddress);
      
    }
    
    function ExitMarket(address CTokenAddress) external {
        require(checkEnterMarket(msg.sender,CTokenAddress));
        uint index = getAddressUserMarketIndex(msg.sender, CTokenAddress);
        require(index != 101);
        userMarket[msg.sender][index] = userMarket[msg.sender][userMarket[msg.sender].length -1];
        userMarket[msg.sender].pop();
        
        
    }
    
    
    function checkUserMarket(address CTokenAddress) internal view returns(bool) {
        if (MarketList.length <= 0){
            return false;
        }
        for  (uint i = 0;i<MarketList.length;i++){
            if (MarketList[i] == CTokenAddress){
                return true;
            }
        }
        return false;
    }
    
    // check that CTokenAddress are already in userMarket or not
    //use this for check that able to borrow or not
    function checkEnterMarket(address account, address CTokenAddress) public view returns(bool){
        if (userMarket[account].length <= 0){
            return false;
        }
        else{
            for (uint i = 0;i<userMarket[account].length;i++){
                if (userMarket[account][i] == CTokenAddress){
                    return true;
                }
                }
                return false;
            }
        }
        
       
    
   function getAddressUserMarketIndex(address account, address CTokenAddress) internal view returns(uint){
        
        for (uint i = 0;i < userMarket[account].length;i++){
            if (userMarket[account][i] == CTokenAddress){
                return i;
            }
        }
        return 101;
    }
    
    function getAddressIndex(address CTokenAddress) internal view returns(uint){
        
        for (uint i = 0;i < MarketList.length;i++){
            if (MarketList[i] == CTokenAddress){
                return i;
            }
        }
        return 101;
    }
    
    function readMarket() external view returns(address [] memory){
        return MarketList;
    }
    
    using SafeMath for uint256;
    // checkLiquidity from AllCTokenContract
    
    function getAllLiquidity(address account) internal view returns(uint256){
        ComptrollerInterface CTokenContract;
        uint256 TotalLiquidity;
        
       
        for (uint i = 0;i < MarketList.length;i++){
            
            CTokenContract = ComptrollerInterface(MarketList[i]);
            TotalLiquidity = TotalLiquidity.add(CTokenContract.liquidityOf(account)); // This line have to fix to port FVM
            
           }
       
        
        return TotalLiquidity;
    }
    
    function liquidityOf(address account) public override view returns(uint256){
       return getAllLiquidity(account);
       //return 1000000;
    }
    
    function getAllBorrowBalance(address account) internal view returns(uint256){
        ComptrollerInterface CTokenContract;
        uint256 TotalBorrow;
        
        for (uint i = 0;i < MarketList.length;i++){
            CTokenContract = ComptrollerInterface(MarketList[i]);
            TotalBorrow = TotalBorrow.add(CTokenContract.borrowOf(account));
        }
        
        return TotalBorrow;
    }
    //----------------This part is for compound distribution----------------
    function setNewCompAddress(address CompAddress) external {
        require(msg.sender == admin_);
        CompAddress_ = CompAddress;
        CompContract_ = IERC20(CompAddress_);
    }
    
    
    
    
    
    function borrowOf(address account) public override view returns(uint256){
        return getAllBorrowBalance(account);
    }
    
    function AllowAmountBorrow(address account) public override view returns(uint256){
       
        return liquidityOf(account).sub(borrowOf(account));
    }
    
    function AllowRedeem(address account, uint256 valueAmountRedeem) public override view returns(bool){
        if (liquidityOf(account).sub(valueAmountRedeem) < borrowOf(account)){
            return false;
        }
        else{
            return true;
        }
    }
    
    
    
    
    
    
     mapping(address => uint256) liquidity;
     mapping(address => uint256) borrowBalance;
    
    
}