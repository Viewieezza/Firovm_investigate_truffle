
const cUSDT = artifacts.require("cUSDT");
const cWBTC = artifacts.require("cWBTC");
const cWETH = artifacts.require("cWETH");


const USDTToken = artifacts.require("USDTToken");
const WBTCToken = artifacts.require("WBTCToken");
const WETHToken = artifacts.require("WETHToken");

const CompToken = artifacts.require("CompToken");
const myComptroller = artifacts.require("myComptroller");


module.exports = function(deployer) {

  // Deploy USDT contract
  deployer
    .deploy(USDTToken, {gas: 5000000, as: "USDT"})
   

  // Deploy WBTC contract
  deployer
    .deploy(WBTCToken, {gas: 5000000, as: "WBTC"})
    

  // Deploy WETH contract
  deployer
    .deploy(WETHToken, {gas: 5000000, as: "WETH"})
    

  // Deploy myComptroller contract
  deployer
    .deploy(myComptroller, {gas: 5000000, as: "myComptroller"})
    .then(async () => {
      const myComptrollerContract = await myComptroller.deployed();

      const USDTInstance = await USDTToken.deployed();
      const WBTCInstance = await WBTCToken.deployed();
      const WETHInstance = await WETHToken.deployed();
      // Deploy CompToken contract 
      return deployer.deploy(CompToken,myComptrollerContract.address, { gas: 5000000, as: "CompToken" });
  })

  deployer
    .then(async () =>{
      const USDTInstance = await USDTToken.deployed();
      const WBTCInstance = await WBTCToken.deployed();
      const WETHInstance = await WETHToken.deployed();

      const myComptrollerInstance = await myComptroller.deployed()
      const CompTokenInstance = await CompToken.deployed()

      return deployer.deploy(cUSDT, "cUSDT", "cUSDT", 8, USDTInstance.address, myComptrollerInstance.address, CompTokenInstance.address, 50, {gas: 5000000, as: "cUSDT"});
    })

    deployer
    .then(async () =>{
      const USDTInstance = await USDTToken.deployed();
      const WBTCInstance = await WBTCToken.deployed();
      const WETHInstance = await WETHToken.deployed();

      const myComptrollerInstance = await myComptroller.deployed()
      const CompTokenInstance = await CompToken.deployed()

      return deployer.deploy(cWBTC, "cWBTC", "cWBTC", 8, WBTCInstance.address, myComptrollerInstance.address, CompTokenInstance.address, 50, {gas: 5000000, as: "cWBTC"});
    })

    deployer
    .then(async () =>{
      const USDTInstance = await USDTToken.deployed();
      const WBTCInstance = await WBTCToken.deployed();
      const WETHInstance = await WETHToken.deployed();

      const myComptrollerInstance = await myComptroller.deployed()
      const CompTokenInstance = await CompToken.deployed()

      return deployer.deploy(cWETH, "cWETH", "cWETH", 8, WETHInstance.address, myComptrollerInstance.address, CompTokenInstance.address, 50, {gas: 5000000, as: "cWETH"});
    })
  

  
  deployer
    .then(async () => {
      const USDTInstance = await USDTToken.deployed();
      const WBTCInstance = await WBTCToken.deployed();
      const WETHInstance = await WETHToken.deployed();

      const cUSDTInstance = await cUSDT.deployed();
      const cWBTCInstance = await cWBTC.deployed();
      const cWETHInstance = await cWETH.deployed();

      const myComptrollerInstance = await myComptroller.deployed()
      const CompTokenInstance = await CompToken.deployed()


      // Setup reward to NXC Token
      await myComptrollerInstance.addToMarket(cUSDTInstance.address);
      await myComptrollerInstance.addToMarket(cWBTCInstance.address);
      await myComptrollerInstance.addToMarket(cWETHInstance.address);

      await USDTInstance.approve(cUSDTInstance.address, 10000000000000);
      await WBTCInstance.approve(cWBTCInstance.address, 10000000000000);
      await WETHInstance.approve(cWETHInstance.address, 10000000000000);

      
     
      
    })

    
  };
