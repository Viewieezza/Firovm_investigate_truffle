

const cUSDT = artifacts.require("cUSDT");
const cWBTC = artifacts.require("cWBTC");
const cWETH = artifacts.require("cWETH");


const USDTToken = artifacts.require("USDTToken");
const WBTCToken = artifacts.require("WBTCToken");
const WETHToken = artifacts.require("WETHToken");

const CompToken = artifacts.require("CompToken");
const myComptroller = artifacts.require("myComptroller");

contract('cUSDT & cWBTC Contract', (accounts) => {
  

  it('liquidity should be 1000 ', async () => {
    const USDTInstance = await USDTToken.deployed();
    const cUSDTInstance = await cUSDT.deployed();

    const WBTCInstance = await WBTCToken.deployed();
    const cWBTCInstance = await cWBTC.deployed();    

    const myComptrollerInstance = await myComptroller.deployed();



 
    // Setup 2 accounts.
    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    
    await USDTInstance.transfer(accountTwo,100000000000, {from: accountOne});
    await USDTInstance.approve(cUSDTInstance.address,1000000000000000, {from: accountTwo});

    await cUSDTInstance.mint(1000, {from: accountTwo}); // After deposited 1000 USDT, liquidity should be 1000

    const liquidity = (await myComptrollerInstance.liquidityOf.call(accountTwo)).toNumber(); // call data from myComptroller contract 

   
    assert.equal(liquidity, 1000, 'CToken Contract', "liquidity is not equal 1000");
  });

  it('liquidity should be 2000 ', async () => {

    const USDTInstance = await USDTToken.deployed();
    const cUSDTInstance = await cUSDT.deployed();

    const WBTCInstance = await WBTCToken.deployed();
    const cWBTCInstance = await cWBTC.deployed();    

    const myComptrollerInstance = await myComptroller.deployed();

      // Setup 2 accounts.
      const accountOne = accounts[0];
      const accountTwo = accounts[1];
  
      
      await WBTCInstance.transfer(accountTwo,100000000000, {from: accountOne});
      await WBTCInstance.approve(cWBTCInstance.address,1000000000000000, {from: accountTwo});
  
      await cWBTCInstance.mint(1000, {from: accountTwo}); // After deposted 1000 Token, liquidity should be 1000 from depositing USDT + 1000 WBTC
  
      const liquidity = (await myComptrollerInstance.liquidityOf.call(accountTwo)).toNumber(); // call data from myComptroller contract 
      
  
     
      assert.equal(liquidity, 2000, 'CToken', "luquidity is not equal 2000");

  });

});
